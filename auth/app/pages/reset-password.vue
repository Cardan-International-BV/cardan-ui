<script setup lang="ts">
/** The page the reset email links to, with `?token=…&email=…`. */
definePageMeta({
  sanctum: { excluded: true },
});

const { t } = useI18n();

useHead({ title: computed(() => t('password.reset')) });
</script>

<template>
  <AuthPage
    class="reset-password-page"
    :title="$t('password.reset')"
    :description="$t('password.reset-description')"
  >
    <PasswordResetForm />

    <template #footer>
      {{ $t('password.back-to-login') }}

      <NuxtLink to="/login">{{ $t('password.back-to-login-cta') }}</NuxtLink>
    </template>
  </AuthPage>
</template>
