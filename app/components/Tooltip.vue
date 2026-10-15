<script setup lang="ts">
const {
  label = undefined,
  fontSize = undefined,
  iconSize = undefined,
  iconColor = undefined,
  tabindex = undefined,
  title = undefined,
  maxWidth = 400,
  placement = 'top',
  span = undefined,
  hideLabel = true,
  icon = 'material-symbols:help-outline-rounded',
  id = useId(),
} = defineProps<{
  label?: string;
  fontSize?: string;
  iconSize?: string;
  iconColor?: string;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  span?: 'bottom' | 'top' | 'left' | 'right';
  icon?: string;
  hideLabel?: boolean;
  tabindex?: string;
  title?: string;
  maxWidth?: number | 'none';
  id?: string;
}>();

const computedStyle = computed(() => ({
  '--font-size': fontSize && `var(--font-size-${fontSize})`,
  '--icon-size': iconSize && `var(--font-size-${iconSize})`,
  '--icon-color': iconColor && `var(--color-${iconColor})`,
}));

const contentStyle = computed(() => ({
  '--max-width':
    maxWidth === undefined
      ? undefined
      : maxWidth === 'none'
        ? 'none'
        : `${maxWidth}px`,
}));

const tooltipContentRef = useTemplateRef<HTMLDivElement | null>(
  'tooltipContent',
);

// Mirror the native popover's open state into a reactive ref. `@toggle` fires
// *after* the popover is shown, so gating the content with `v-if="isOpen"` adds
// the text into the (already visible) aria-live region on open — which is what
// makes a screen reader announce the toggletip. Focus stays on the trigger.
const isOpen = ref(false);

function onToggle(event: Event) {
  isOpen.value = (event as ToggleEvent).newState === 'open';
}

// Native `popover=auto` dismisses on Escape / outside-click but not on focus
// leaving the trigger, so close it on blur to avoid a lingering bubble.
function onTriggerBlur() {
  if (isOpen.value) tooltipContentRef.value?.hidePopover();
}
</script>

<template>
  <div class="tooltip-wrapper" aria-live="polite">
    <button
      type="button"
      class="tooltip-trigger-button"
      :popovertarget="id"
      :style="computedStyle"
      :tabindex="tabindex"
      :title="title"
      @blur="onTriggerBlur"
    >
      <span
        v-if="label && hideLabel"
        :id="'tooltip-label-' + id"
        class="icon-only visuallyhidden"
      >
        {{ $t('aria.more-info-about', { label }) }}
      </span>

      <span v-else-if="label && !hideLabel" :id="'tooltip-label-' + id">
        {{ label }}
        <span class="visuallyhidden">({{ $t('aria.more-info') }})</span>
      </span>

      <span v-else class="visuallyhidden">{{ $t('aria.more-info') }}</span>

      <Icon :name="icon" />
    </button>

    <div
      :id="id"
      ref="tooltipContent"
      popover
      class="tooltip-content-wrapper"
      :data-placement="placement"
      :data-span="span"
      :style="contentStyle"
      @toggle="onToggle"
    >
      <div v-if="isOpen" class="tooltip-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.tooltip-content-wrapper {
  --gap: 1rem;

  position-area: var(--placement, block-start);
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
  position-try-order: most-block-size;
  margin: 0;
  inset: auto;
  max-inline-size: var(--max-width, none);
  border: 1px solid var(--popover-border-color);
  border-radius: var(--radius-md);
  color: var(--color-text);
  background-color: var(--color-card-bg);
  transition-property: display, overlay, opacity, translate;
  transition-duration: 0s;
  transition-behavior: allow-discrete;

  &:popover-open {
    opacity: 1;
    translate: 0 0;
    transition-duration: var(--duration-sm);

    @starting-style {
      opacity: 0;
    }
  }
}

.tooltip-content {
  font-size: var(--font-size-sm);
  padding-block: 1rem;
  padding-inline: 1.35rem;

  p {
    &:first-child {
      margin-block-start: 0;
    }
    &:last-child {
      margin-block-end: 0;
    }
  }
}

.tooltip-content-wrapper[data-placement='top'] {
  --placement: block-start;
  margin-block-end: var(--gap);

  &:popover-open {
    @starting-style {
      translate: 0 0.5rem;
    }
  }

  &[data-span='left'] {
    position-area: var(--placement) span-inline-start;
  }
  &[data-span='right'] {
    position-area: var(--placement) span-inline-end;
  }
}

.tooltip-content-wrapper[data-placement='bottom'] {
  --placement: block-end;
  margin-block-start: var(--gap);

  &:popover-open {
    @starting-style {
      translate: 0 -0.5rem;
    }
  }

  &[data-span='left'] {
    position-area: var(--placement) span-inline-start;
  }
  &[data-span='right'] {
    position-area: var(--placement) span-inline-end;
  }
}

.tooltip-content-wrapper[data-placement='left'] {
  --placement: inline-start;
  margin-inline-end: var(--gap);

  &:popover-open {
    @starting-style {
      translate: 0.5rem 0;
    }
  }

  &[data-span='top'] {
    position-area: var(--placement) span-block-start;
  }
  &[data-span='bottom'] {
    position-area: var(--placement) span-block-end;
  }
}

.tooltip-content-wrapper[data-placement='right'] {
  --placement: inline-end;
  margin-inline-start: var(--gap);

  &:popover-open {
    @starting-style {
      translate: -0.5rem 0;
    }
  }

  &[data-span='top'] {
    position-area: var(--placement) span-block-start;
  }
  &[data-span='bottom'] {
    position-area: var(--placement) span-block-end;
  }
}

.tooltip-trigger-button {
  position: relative;
  display: flex;
  gap: 0.35em;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: var(--font-size, inherit);
  transition: color var(--duration-sm);

  &::after {
    /* increase click target */
    content: '';
    position: absolute;
    inset: -50%;
    margin: auto;
    min-width: 1.5rem;
    min-height: 1.5rem;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
  }

  &:focus-visible {
    border-radius: var(--radius-sm);

    &:has(.icon-only.visuallyhidden) {
      border-radius: var(--radius-full);
    }
    outline-offset: 2px;
  }

  .iconify {
    flex-shrink: 0;
    color: var(--icon-color, var(--color-grey-text));
    font-size: var(--icon-size, inherit);
    transition: color var(--duration-sm);
  }

  &:hover {
    cursor: help;

    .iconify {
      color: var(--color-text);
    }
  }
}
</style>
