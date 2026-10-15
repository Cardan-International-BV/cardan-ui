/**
 * A JSON:API error object, as the Cardan APIs send under `/api/v1`.
 */
type JsonApiError = {
  detail?: string;
  title?: string;
  source?: { parameter?: string; pointer?: string };
};

type ErrorBody = {
  message?: string;
  errors?: Record<string, string[]> | JsonApiError[];
};

/**
 * Pulls the renderable payload out of whatever the fetch layer threw, as
 * Laravel's `{ message, errors: { field: [...] } }`. A JSON:API envelope
 * (`errors: [{ detail, source }]`) is folded into that shape: each `detail`
 * under its `source.parameter`. Details that name no field become the message,
 * or, next to field errors, the first entry of `errors` so neither is lost.
 *
 * `ofetch` errors carry the body on `response._data`; a plain rejected
 * response or an already-unwrapped error carries it on `_data` / `data`.
 * The `Content-Language` the API answered in is kept, so the messages are
 * announced in their own language (WCAG 3.1.2).
 *
 * Always returns an object, since it is only called for a failed request:
 * without a usable message (a network failure, an HTML error page, an empty
 * body) it is empty, and `AuthError` shows a generic message instead.
 */
export function extractAuthError(error: unknown): AuthErrorData {
  const candidate = error as {
    response?: { _data?: ErrorBody; headers?: Headers };
    _data?: ErrorBody;
    data?: ErrorBody;
  } | null;

  const body =
    candidate?.response?._data ?? candidate?._data ?? candidate?.data ?? null;
  if (!body || typeof body !== 'object') return {};

  const language =
    candidate?.response?.headers?.get('Content-Language') || undefined;

  if (!Array.isArray(body.errors)) {
    const errors =
      body.errors && Object.keys(body.errors).length ? body.errors : undefined;
    if (!body.message && !errors) return {};

    return { message: body.message, errors, language };
  }

  const general: string[] = [];
  const fields: Record<string, string[]> = {};

  for (const item of body.errors) {
    const detail = item.detail ?? item.title;
    if (!detail) continue;

    const field = item.source?.parameter;
    if (field) (fields[field] ??= []).push(detail);
    else general.push(detail);
  }

  if (!Object.keys(fields).length) {
    const message = general.join(' ') || body.message;
    return message ? { message, language } : {};
  }

  // `AuthError` lists `errors` instead of the message, so a general detail
  // goes first in the list. No field is named by the empty key.
  const errors = general.length ? { '': general, ...fields } : fields;
  return { errors, language };
}

/**
 * Whether a request was refused for want of a fresh password confirmation:
 * Laravel's `password.confirm` middleware answers 423 to a JSON request.
 */
export function isPasswordConfirmationRequired(error: unknown): boolean {
  const candidate = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
  } | null;

  return (
    (candidate?.response?.status ??
      candidate?.statusCode ??
      candidate?.status) === 423
  );
}
