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
 * under its `source.parameter`, or as the message when it names no field.
 *
 * `ofetch` errors carry the body on `response._data`; a plain rejected
 * response or an already-unwrapped error carries it on `_data` / `data`.
 * The `Content-Language` the API answered in is kept, so the messages are
 * announced in their own language (WCAG 3.1.2). Returns `null` when there is
 * nothing worth showing, so callers can assign the result straight to their
 * error state.
 */
export function extractAuthError(error: unknown): AuthErrorData | null {
  const candidate = error as {
    response?: { _data?: ErrorBody; headers?: Headers };
    _data?: ErrorBody;
    data?: ErrorBody;
  } | null;

  const body =
    candidate?.response?._data ?? candidate?._data ?? candidate?.data ?? null;
  if (!body || typeof body !== 'object') return null;

  const language =
    candidate?.response?.headers?.get('Content-Language') || undefined;

  if (!Array.isArray(body.errors)) {
    return { message: body.message, errors: body.errors, language };
  }

  const errors: Record<string, string[]> = {};
  const messages: string[] = [];

  for (const item of body.errors) {
    const detail = item.detail ?? item.title;
    if (!detail) continue;

    const field = item.source?.parameter;
    if (field) (errors[field] ??= []).push(detail);
    else messages.push(detail);
  }

  return {
    message: messages.join(' ') || body.message,
    errors: Object.keys(errors).length ? errors : undefined,
    language,
  };
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
