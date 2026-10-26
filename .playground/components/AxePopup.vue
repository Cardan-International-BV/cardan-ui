<script setup lang="ts">
import { VueAxePopup } from 'vue-axe';
</script>

<template>
  <ClientOnly>
    <VueAxePopup />
  </ClientOnly>
</template>

<style>
.va-popup-btn {
  box-shadow: var(--shadow-1) !important;
}
</style>
