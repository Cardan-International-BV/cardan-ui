<script setup lang="ts">
defineProps<{
  data?: AuthErrorData | null;
}>();
</script>

<template>
  <div role="alert">
    <div v-if="data" class="auth-error" :lang="data.language">
      <ul v-if="data?.errors" role="list">
        <template v-for="(array, key) in data.errors" :key="key">
          <li v-for="message in array" :key="message">{{ message }}</li>
        </template>
      </ul>

      <p v-else-if="data?.message">{{ data.message }}</p>
    </div>
  </div>
</template>

<style>
/*
 * Styled by the layer rather than reusing the host app's `.error-message`:
 * that class is defined by each app's own error component, whose CSS chunk is
 * not necessarily loaded on the page a login form sits on, and two global
 * definitions of one class would resolve by source order. Written entirely in
 * Cardan UI tokens, so it still picks up the app's palette and dark mode.
 * Override it from the app with `.auth-error`.
 */
.auth-error {
  margin-inline: auto;
  overflow-wrap: anywhere;
  max-width: fit-content;
  margin-block-start: 1.5rem;
  padding-inline: 1rem;
  padding-block: 0.75rem;
  border-radius: var(--radius-md);
  color: var(--color-red-text);
  border: 1px solid var(--color-orange-bg);
  background-color: var(--color-card-bg);
  text-align: start;

  p,
  ul {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    margin-block: 0;
  }
}
</style>
