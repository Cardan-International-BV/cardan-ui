<script setup lang="ts">
useHead({ title: 'MFA setup' });
</script>

<template>
  <div class="demo-page">
    <h1>{{ $t('mfa.setup-title') }}</h1>

    <p>{{ $t('mfa.setup-description') }}</p>

    <MfaSetup @skip="navigateTo('/auth')" @done="navigateTo('/auth')" />
  </div>
</template>
