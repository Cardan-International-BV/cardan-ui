// `mfa_enabled: false` takes part in the MFA setup reminder, so the setup page
// stays reachable after signing in instead of sending the user on
export default defineEventHandler(() => ({
  data: { name: 'Demo User', email: 'demo@example.com', mfa_enabled: false },
}));
