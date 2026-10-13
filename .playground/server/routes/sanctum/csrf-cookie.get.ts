// Demo backend: mocks the Laravel Fortify endpoints the auth layer calls, so
// the forms and dialogs can be checked without a Laravel app.
export default defineEventHandler((event) => {
  setCookie(event, 'XSRF-TOKEN', 'demo');
  setResponseStatus(event, 204);
});
