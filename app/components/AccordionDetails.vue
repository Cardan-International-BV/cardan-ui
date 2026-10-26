<script setup lang="ts">
const {
  name = undefined,
  arrow = true,
  icon = 'material-symbols:chevron-right-rounded',
  iconPos = 'end',
} = defineProps<{
  open?: boolean;
  name?: string;
  icon?: string;
  iconPos?: 'start' | 'end';
  arrow?: boolean;
}>();
</script>

<template>
  <details :open="open" class="details-wrapper" :name="name">
    <summary
      :class="['details-summary', `details-icon-position--${iconPos}`]"
    >
      <Icon
        v-if="arrow && iconPos === 'start'"
        :name="icon"
        class="details-arrow"
      />

      <slot name="trigger" mdc-unwrap="p" />

      <Icon
        v-if="arrow && iconPos === 'end'"
        :name="icon"
        class="details-arrow"
      />
    </summary>

    <div class="details-panel">
      <slot name="content" mdc-unwrap="p" />
    </div>
  </details>
</template>

<style>
.details-summary {
  cursor: default;
  position: relative;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  [role='heading'] {
    display: inline-block;
  }

  &:focus-visible {
    outline-offset: 2px;
    border-radius: var(--radius-xs);
    outline: 2px dotted var(--focus-color);
  }

  &:hover {
    color: var(--color-accent-graphic);

    .details-arrow {
      color: var(--color-accent-graphic);
    }
  }

  .details-arrow {
    vertical-align: middle;
    transition:
      rotate var(--duration-md),
      color var(--duration-sm);
  }
}

.details-wrapper[open] > .details-summary > .details-arrow {
  rotate: 0.25turn;
}

.details-icon-position--start .details-arrow {
  margin-inline-end: 0.25em;
}

.details-icon-position--end .details-arrow {
  margin-inline-start: 0.25em;
}
</style>
