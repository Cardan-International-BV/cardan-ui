<script setup lang="ts">
const {
  color = 'accent',
  fontSize = 'xs',
  iconSize = 'md',
  icon = undefined,
  content = undefined,
  ariaLabel = undefined,
  radius = undefined,
  variant = 'solid',
} = defineProps<{
  color?: 'accent' | 'blue' | 'green' | 'red' | 'orange';
  fontSize?: FontSize;
  iconSize?: FontSize;
  icon?: string;
  content?: string;
  ariaLabel?: string;
  radius?: BorderRadius;
  variant?: CalloutVariant;
}>();

const computedStyle = computed(() => ({
  '--font-size': `var(--font-size-${fontSize})`,
  '--icon-size': `var(--font-size-${iconSize})`,
  '--callout-radius': radius && `var(--radius-${radius})`,
}));

const computedIcon = computed(() => {
  if (icon) return icon;

  if (color === 'blue') return 'material-symbols:info-outline-rounded';
  if (color === 'green') return 'material-symbols:check-circle-outline-rounded';
  if (color === 'red') return 'material-symbols:cancel-outline-rounded';
  if (color === 'orange') return 'material-symbols:warning-outline-rounded';

  return icon;
});

const computedIconLabel = computed(() => {
  if (color === 'blue') return $t('aria.callout-info');
  if (color === 'green') return $t('aria.callout-success');
  if (color === 'red') return $t('aria.callout-error');
  if (color === 'orange') return $t('aria.callout-warning');

  return undefined;
});
</script>

<template>
  <section
    :aria-label="ariaLabel"
    :class="[
      'callout-wrapper',
      `callout-color--${color}`,
      `callout-variant--${variant}`,
    ]"
    :style="computedStyle"
  >
    <div class="callout-content">
      <Icon v-if="computedIcon" :name="computedIcon" />
      <strong v-if="computedIconLabel" class="visuallyhidden">
        {{ computedIconLabel }}
      </strong>

      <div v-if="content">{{ content }}</div>

      <div v-if="$slots.default" class="default-slot">
        <slot mdc-unwrap="p" />
      </div>
    </div>
  </section>
</template>

<style>
.callout-wrapper {
  display: inline-block;
  padding-inline: 0.75rem;
  padding-block: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--callout-radius, var(--radius-sm));
  font-size: var(--font-size);

  .callout-content {
    display: flex;
    align-items: center;
    gap: 0.75em;

    .iconify {
      flex-shrink: 0;
      font-size: var(--icon-size);
    }
  }

  .default-slot {
    flex-grow: 1;
  }
}

.callout-color--accent {
  color: var(--color-accent-on-bg);
  background-color: var(--color-accent-bg);
}

.callout-color--red {
  color: var(--color-red-on-bg);
  background-color: var(--color-red-bg);
}

.callout-color--orange {
  color: var(--color-orange-on-bg);
  background-color: var(--color-orange-bg);
}

.callout-color--green {
  color: var(--color-green-on-bg);
  background-color: var(--color-green-bg);
}

/* Info callouts use the neutral surface */
.callout-color--blue {
  color: var(--color-text);
  background-color: var(--color-grey-bg);
}

/* Outline variant: white surface with a tinted border, text and icon in the color */
.callout-variant--outline {
  background-color: var(--color-white);

  &.callout-color--accent {
    border-color: var(--color-accent-bg);
    color: var(--color-accent-text);

    .iconify {
      color: var(--color-accent-graphic);
    }
  }

  &.callout-color--red {
    border-color: var(--color-red-bg);
    color: var(--color-red-text);

    .iconify {
      color: var(--color-red-graphic);
    }
  }

  &.callout-color--orange {
    border-color: var(--color-orange-bg);
    color: var(--color-orange-text);

    .iconify {
      color: var(--color-orange-graphic);
    }
  }

  &.callout-color--green {
    border-color: var(--color-green-bg);
    color: var(--color-green-text);

    .iconify {
      color: var(--color-green-graphic);
    }
  }

  &.callout-color--blue {
    border-color: var(--color-blue-bg);
    color: var(--color-blue-text);

    .iconify {
      color: var(--color-blue-graphic);
    }
  }
}
</style>
