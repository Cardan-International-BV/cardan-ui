// Never confirmed, so every MFA flow starts with the password dialog
export default defineEventHandler(() => ({ confirmed: false }));
