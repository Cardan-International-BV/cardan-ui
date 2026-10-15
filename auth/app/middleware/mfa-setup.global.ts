/**
 * Sends a user who still has to set up MFA, or who just signed in without it,
 * to the setup page, carrying the original destination along so they continue
 * there once they are done (or skip, when that is allowed). Does nothing for
 * an API whose user payload has no `mfa_enabled`; see `useMfaSetupReminder()`.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/mfa-setup') return;

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated.value) return;

  const { isMfaSetupRequired, isReminderPending } = useMfaSetupReminder();
  if (!isMfaSetupRequired.value && !isReminderPending.value) return;

  return navigateTo({ path: '/mfa-setup', query: { redirect: to.fullPath } });
});
