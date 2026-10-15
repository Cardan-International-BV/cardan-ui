<script setup lang="ts">
definePageMeta({
  sanctum: { excluded: true },
});

const { t } = useI18n();

useHead({ title: computed(() => t('password.forgot')) });
</script>

<template>
  <AuthPage
    class="forgot-password-page"
    :title="$t('password.forgot')"
    :description="$t('password.forgot-instructions')"
  >
    <PasswordForgotForm />

    <template #footer>
      {{ $t('password.back-to-login') }}

      <NuxtLink to="/login">{{ $t('password.back-to-login-cta') }}</NuxtLink>
    </template>
  </AuthPage>
</template>
