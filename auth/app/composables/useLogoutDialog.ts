/**
 * Opens the sign-out confirmation. Mount `<LogoutDialog />` once, in your
 * layout, and open it with `logoutDialogRef.value?.openDialog()`.
 */
export function useLogoutDialog() {
  const { logout } = useAuth();

  const logoutDialogRef = useState<DialogComponent | null>(
    'logoutDialog',
    () => null,
  );

  function handleLogout() {
    logout();
    logoutDialogRef.value?.closeDialog();
  }

  return {
    logoutDialogRef,
    handleLogout,
  };
}
