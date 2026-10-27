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
  >
    <p>{{ $t('auth.confirm-logout') }}</p>

    <div class="button-group">
      <Button
        variant="outline"
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
  min-width: 320px;
  width: 100%;
  max-width: 360px;

  .button-group {
    margin-block-start: 2.5rem;
    justify-content: space-between;

    > .button {
      flex-grow: 1;
    }
  }
}
</style>
