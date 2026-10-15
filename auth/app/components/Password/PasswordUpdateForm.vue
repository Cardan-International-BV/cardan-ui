<script setup lang="ts">
/**
 * Changes the signed-in user's password (`PATCH /api/v1/profile/password`), for an
 * account settings page.
 */
const { client } = useAuth();

const { createToast, hideToast } = useToast();
const { minLength, maxLength } = usePasswordPolicy();
const { t } = useI18n();

const currentPassword = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loading = ref(false);
const error = ref<AuthErrorData | null>(null);
const requirementsId = useId();

async function updatePassword() {
  error.value = null;
  loading.value = true;
  hideToast();

  try {
    await client('/api/v1/profile/password', {
      method: 'PATCH',
      body: {
        current_password: currentPassword.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });

    currentPassword.value = '';
    password.value = '';
    passwordConfirmation.value = '';

    createToast({ label: t('password.saved'), color: 'green' });
  } catch (e) {
    error.value = extractAuthError(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Form class="password-update-form" @submit="updatePassword">
    <Input
      v-model="currentPassword"
      :label="$t('password.current')"
      name="current_password"
      type="password"
      autocomplete="current-password"
      size="lg"
      required
    />

    <Input
      v-model="password"
      :label="$t('password.new')"
      name="password"
      type="password"
      autocomplete="new-password"
      size="lg"
      :minlength="minLength"
      :maxlength="maxLength"
      :error-message="
        password ? $t('password.requirements.length', minLength) : undefined
      "
      :aria-describedby="requirementsId"
      required
    />

    <PasswordRequirements :id="requirementsId" :password="password" />

    <Input
      v-model="passwordConfirmation"
      :label="$t('password.confirm')"
      name="password_confirmation"
      type="password"
      autocomplete="new-password"
      size="lg"
      required
    />

    <Button
      variant="black"
      type="submit"
      :label="$t('password.save')"
      icon="material-symbols:check"
      :loading="loading"
    />

    <AuthError :data="error" />
  </Form>
</template>

<style>
.password-update-form {
  button[type='submit'] {
    max-width: max-content;
  }

  .password-requirements {
    @container (min-width: 280px) {
      background-color: var(--color-card-bg);
    }
  }
}
</style>
