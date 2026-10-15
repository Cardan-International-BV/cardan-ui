<script setup lang="ts">
const {
  is = 'div',
  borderRadius = undefined,
  borderColor = undefined,
  backgroundColor = undefined,
  borderWidth = undefined,
  paddingBlock = '1.25rem',
  paddingInline = '1.5rem',
  shadow = false,
} = defineProps<{
  is?: string;
  borderWidth?: number;
  borderRadius?: BorderRadius;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: false | 1 | 2 | 3;
  paddingBlock?: string;
  paddingInline?: string;
}>();

const computedStyle = computed(() => ({
  '--card-radius': borderRadius && `var(--radius-${borderRadius})`,
  '--card-border-color': borderColor && `var(--color-${borderColor})`,
  '--card-border-width': borderWidth && `${borderWidth}px`,
  '--card-padding-block': paddingBlock,
  '--card-padding-inline': paddingInline,
  '--card-shadow': shadow && `var(--shadow-${shadow})`,
  '--card-background': backgroundColor && `var(--color-${backgroundColor})`,
}));
</script>

<template>
  <component :is="is" class="card" :style="computedStyle">
    <slot />
  </component>
</template>

<style>
:where(.card) {
  position: relative;
  box-shadow: var(--card-shadow, none);
  background-color: var(--card-background, var(--color-card-bg));
  border: var(--card-border-width, 1px) solid var(--card-border-color);
  border-radius: var(--card-radius, var(--radius-lg));
  padding-block: var(--card-padding-block);
  padding-inline: var(--card-padding-inline);

  @media (max-width: 479px) {
    --card-padding-block: 1.25rem !important;
    --card-padding-inline: 1rem !important;
  }

  h1,
  h2,
  h3 {
    margin-block-start: 0;
  }
}
</style>
