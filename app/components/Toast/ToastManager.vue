<script setup lang="ts">
const { toasts, hideToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="toast-manager" aria-live="polite">
      <TransitionGroup name="toast">
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          v-bind="toast"
          @hide="hideToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
.toast-manager {
  pointer-events: none;
  z-index: 99999;
  position: fixed;
  inset-inline: 0;
  inset-block: auto 0;
  width: 100vw;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  padding-inline: 0.75rem;

  @media (min-width: 768px) {
    inset-inline: auto 0;
    width: auto;
    padding-block-end: 1rem;
    align-items: flex-end;
  }
}
</style>
