<script setup lang="ts">
/**
 * Asks for a reset link (`POST /api/v1/auth/forgot-password`). The API answers the
 * same whether or not the address has an account, so this form does too.
 */
const { client } = useAuth();

const email = useLoginEmail();

const loading = ref(false);
const sent = ref(false);
const error = ref<AuthErrorData | null>(null);

async function requestResetLink() {
  sent.value = false;
  error.value = null;
  loading.value = true;

  try {
    await client('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    });
    sent.value = true;
  } catch (e) {
    error.value = extractAuthError(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Form class="password-forgot-form" @submit="requestResetLink">
    <Input
      v-model="email"
      :label="$t('general.email')"
      name="email"
      type="email"
      autocomplete="username"
      size="lg"
      required
    />

    <Button
      variant="black"
      type="submit"
      :label="$t('password.request-reset')"
      icon="material-symbols:arrow-right-alt"
      icon-pos="end"
      :loading="loading"
      :disabled="sent"
    />

    <AuthError :data="error" />

    <div aria-live="polite">
      <p v-if="sent" class="password-forgot-sent">
        {{ $t('password.email-sent') }}
      </p>
    </div>
  </Form>
</template>

<style>
.password-forgot-form {
  .password-forgot-sent {
    margin-block: 0;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
    color: var(--color-grey-text);
  }
}
</style>
