<script setup lang="ts">
/**
 * Asks before signing out. Mount it once, in your layout, and open it from
 * anywhere with `useLogoutDialog().logoutDialogRef.value?.openDialog()`.
 */

const { logoutDialogRef, handleLogout } = useLogoutDialog();
</script>

<template>
  <Dialog
    ref="logoutDialogRef"
    class="logout-dialog"
    :label="$t('general.sign-out')"
    close-button-variant="ghost"
    close-button-radius="sm"
    close-button-size="sm"
    close-button-icon-size="md"
  >
    <p>{{ $t('auth.confirm-logout') }}</p>

    <div class="button-group">
      <Button
        variant="ghost"
        :label="$t('general.cancel')"
        @click="logoutDialogRef?.closeDialog"
      />

      <Button
        variant="black"
        icon="material-symbols:logout"
        :label="$t('general.sign-out')"
        @click="handleLogout"
      />
    </div>
  </Dialog>
</template>

<style>
.logout-dialog {
  max-width: 410px;

  .close-button {
    top: 1.25rem;
    right: 1.25rem;
    background-color: var(--color-bg);
  }

  .dialog-content p {
    margin-block: 0 2rem;
  }

  .button-group {
    justify-content: space-between;
  }
}
</style>
