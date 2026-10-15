/**
 * Codes an API answers (403) to a session that still has to set up MFA: a
 * front end account (`mfa_setup_required`) or a back office one
 * (`backoffice_mfa_required`). Both enrol on `/mfa-setup`.
 *
 * Signing in already lands such a user there; this catches the requirement
 * starting mid-session (an organization switching it on, a role being added,
 * MFA switched off to move to a new app). Re-read the user so `mfa_required`
 * is current, then go to the setup page.
 */
const MFA_SETUP_CODES = ['mfa_setup_required', 'backoffice_mfa_required'];

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('sanctum:error:response', async ({ response }) => {
    if (response?.status !== 403) return;

    // A JSON:API envelope (`errors[0].code`) or a plain body (`code`).
    const data = response._data as
      | { code?: string; errors?: { code?: string }[] }
      | undefined;

    const code = data?.code ?? data?.errors?.[0]?.code;
    if (!code || !MFA_SETUP_CODES.includes(code)) return;

    const route = nuxtApp.$router.currentRoute.value;
    if (route.path === '/mfa-setup') return;

    await nuxtApp.runWithContext(async () => {
      await useAuth().refreshIdentity();
      await navigateTo({
        path: '/mfa-setup',
        query: { redirect: route.fullPath },
      });
    });
  });
});
