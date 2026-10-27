<script setup lang="ts">
const colorMode = useColorMode();

defineProps<{ fontSize?: FontSize }>();
</script>

<template>
  <ClientOnly>
    <button
      id="theme-toggle"
      type="button"
      class="theme-toggle-button"
      :aria-pressed="colorMode.value === 'dark'"
      :style="[fontSize && `--theme-toggle-font-size: var(--font-size-${fontSize})`]"
      @click.stop="
        colorMode.preference = colorMode.value == 'light' ? 'dark' : 'light'
      "
    >
      <Icon
        :name="
          colorMode.value === 'dark'
            ? 'material-symbols:dark-mode-outline-rounded'
            : 'material-symbols:light-mode-outline-rounded'
        "
      />
      <span class="visuallyhidden">{{ $t('theme.sr.dark') }}</span>
    </button>
  </ClientOnly>
</template>

<style>
.theme-toggle-button {
  --color-shape: var(--color-text);
  background-color: transparent;
  display: grid;
  place-content: center;
  border: 4px solid transparent;
  border-radius: 100vw;
  width: 2rem;
  height: 2rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: color, background-color;
  transition-duration: var(--duration-sm);

  .iconify {
    color: var(--color-shape);
    font-size: var(--theme-toggle-font-size, var(--font-size-md));
  }

  &:hover {
    background-color: var(--color-grey-bg);
  }

  &:focus-visible {
    outline-color: var(--focus-color);
  }
}
</style>
