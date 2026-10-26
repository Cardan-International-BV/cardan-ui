<script setup lang="ts">
const {
  id = useId(),
  minHeight = 0,
  arrow = true,
  icon = 'material-symbols:chevron-right-rounded',
  iconPos = 'end',
  ariaLabel = undefined,
  tabindex = undefined,
  open = undefined,
} = defineProps<{
  minHeight?: number;
  id?: string;
  icon?: string;
  iconPos?: 'start' | 'end';
  ariaLabel?: string;
  tabindex?: string;
  arrow?: boolean;
  open?: boolean;
}>();

const isExpanded = ref(open);
const panelRef = useTemplateRef<HTMLElement>('accordionPanel');

watch(
  () => open,
  (newVal) => {
    isExpanded.value = newVal;
  },
);

function toggleAccordion() {
  isExpanded.value = !isExpanded.value;
}

function handleTransitionRun(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && !isExpanded.value) {
    panelRef.value?.style.setProperty('--overflow', 'hidden');
  }
}

function handleTransitionEnd(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && isExpanded.value) {
    if (isExpanded.value) {
      panelRef.value?.style.setProperty('--overflow', 'visible');
    } else {
      panelRef.value?.style.setProperty('--overflow', 'hidden');
    }
  }
}

onMounted(() => {
  if (!isExpanded.value) {
    panelRef.value?.style.setProperty('--overflow', 'hidden');
  } else {
    panelRef.value?.style.setProperty('--overflow', 'visible');
  }
});

defineExpose({ toggleAccordion });
</script>

<template>
  <div class="accordion-wrapper">
    <button
      :id="`accordion-trigger-${id}`"
      :aria-controls="`accordion-panel-${id}`"
      :aria-expanded="isExpanded"
      :aria-label="ariaLabel"
      :tabindex="tabindex"
      type="button"
      :class="['accordion-trigger', `accordion-icon-position--${iconPos}`]"
      @click.stop="toggleAccordion"
    >
      <Icon
        v-if="arrow && iconPos === 'start'"
        :name="icon"
        class="accordion-arrow"
      />

      <slot v-if="$slots.trigger" name="trigger" mdc-unwrap="p" />

      <span v-else class="visuallyhidden">{{ $t('general.expand') }}</span>

      <Icon
        v-if="arrow && iconPos === 'end'"
        :name="icon"
        class="accordion-arrow"
      />
    </button>

    <slot />

    <section
      :id="`accordion-panel-${id}`"
      :aria-labelledby="`accordion-trigger-${id}`"
      :inert="!isExpanded"
      class="accordion-panel-wrapper"
      @transitionrun="handleTransitionRun"
      @transitionend="handleTransitionEnd"
    >
      <div
        ref="accordionPanel"
        class="accordion-panel"
        :style="`--min-height: ${minHeight}px`"
      >
        <slot name="content" />
      </div>
    </section>
  </div>
</template>

<style>
.accordion-panel-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-md) var(--cubic-bezier);
}

.accordion-panel {
  overflow: var(--overflow, hidden);
  min-height: var(--min-height);
}

.accordion-trigger[aria-expanded='true'] {
  .accordion-arrow {
    rotate: 0.25turn;
  }
  ~ .accordion-panel-wrapper {
    grid-template-rows: 1fr;
  }
}

.accordion-trigger {
  position: relative;
  padding-inline: 0;
  background: transparent;
  border: none;
  text-align: left;
  border-radius: var(--radius-xs);
  width: 100%;
  display: flex;
  align-items: center;
  outline-offset: 2px;

  transition-property: color, border-color, outline-offset, outline-color;
  transition-duration: var(--duration-sm);

  &:hover {
    .accordion-arrow {
      color: var(--color-accent-graphic);
    }
  }

  &:focus-visible {
    outline: 2px dotted var(--focus-color);
    border-color: transparent;
  }

  .accordion-arrow {
    transition:
      rotate var(--duration-md),
      color var(--duration-sm);
  }
}

.accordion-icon-position--start .accordion-arrow {
  margin-inline-end: 0.25em;
}

.accordion-icon-position--end .accordion-arrow {
  margin-inline-start: 0.25em;
}
</style>
