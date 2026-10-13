// Any password confirms. The dialog does not submit an empty one, but an empty
// password still gets the validation error Laravel sends
export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password?: string }>(event);

  if (!password) {
    // The body Laravel sends for a failed validation, not H3's error format
    setResponseStatus(event, 422);
    return {
      message: 'The password field is required.',
      errors: { password: ['The password field is required.'] },
    };
  }

  setResponseStatus(event, 201);
  return {};
});
