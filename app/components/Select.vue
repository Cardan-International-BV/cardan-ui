<script setup lang="ts">
const model = defineModel<string | number | boolean>();

const {
  label = undefined,
  name = undefined,
  errorMessage = undefined,
  placeholder = undefined,
  options = undefined,
  noOptionsLabel = undefined,
  ariaDescribedby = undefined,
  instruction = undefined,
  tabindex = undefined,
  color = undefined,
  required,
  variant = 'default',
  placeholderValue = '',
  size = 'md',
  valueKey = 'value',
  labelKey = 'label',
  disabledKey = 'disabled',
  id = useId(),
} = defineProps<{
  label?: string;
  name?: string;
  options?: any[];
  placeholder?: string;
  placeholderValue?: string | number;
  size?: InputSize;
  valueKey?: string;
  labelKey?: string;
  disabledKey?: string;
  hideLabel?: boolean;
  showInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  multiple?: boolean;
  noOptionsLabel?: string;
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  tabindex?: string;
  color?: BaseColor;
  id?: string;
  /** The 'krafters' variant is deprecated: it was designed for the Krafters website and will be removed in a future major version. */
  variant?: InputVariant;
}>();

const computedErrorMessage = computed(() => {
  if (errorMessage) return errorMessage;
  if (required && !model.value) {
    return $t('form.missing-value', { item: label });
  }
  return $t('form.invalid-value');
});

const computedAriaDescribedby = computed(() =>
  [
    ariaDescribedby,
    instruction && `instruction-${id}`,
    id && required && `error-${id}`,
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      `select-size--${size}`,
      `select-variant--${variant}`,
      color && `select-color--${color}`,
      showInvalid && 'show-invalid',
    ]"
  >
    <label
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }}</span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <div class="select-wrapper">
      <select
        :id="id"
        ref="elementRef"
        v-model="model"
        class="select"
        :name="name"
        :required="required"
        :disabled="disabled"
        :autofocus="autofocus"
        :multiple="multiple"
        :tabindex="tabindex"
        :aria-describedby="computedAriaDescribedby"
        size="1"
      >
        <template v-if="!options?.length">
          <option selected disabled :value="placeholderValue">
            {{ noOptionsLabel || $t('select.no-options') }}
          </option>
        </template>
        <option v-else-if="placeholder" hidden :value="placeholderValue">
          {{ placeholder }}
        </option>

        <slot v-if="$slots.default" />

        <template v-else>
          <option
            v-for="option in options"
            :key="option[valueKey] + '-' + id"
            :value="option[valueKey]"
            :disabled="option[disabledKey]"
            :lang="option.lang"
          >
            {{ option[labelKey] }}
          </option>
        </template>
      </select>

      <Icon
        name="material-symbols:keyboard-arrow-down-rounded"
        class="select-arrow"
      />
    </div>

    <p v-if="instruction" :id="`instruction-${id}`" class="instruction">
      {{ instruction }}
    </p>

    <InputError v-if="required" :id="id" :error-text="computedErrorMessage" />
  </div>
</template>

<style>
:where(label) {
  font-weight: var(--font-weight-medium);
  -webkit-user-select: none;
  user-select: none;
  transition-property: opacity;
  transition-duration: var(--duration-sm);

  &.disabled {
    opacity: 25%;
  }
}

:where(.form-field-wrapper) {
  position: relative;
  display: inline-grid;
  align-items: center;
  align-content: start;
  transition-property: opacity;
  transition-duration: var(--duration-sm);

  label,
  .label {
    display: inline-flex;
    gap: 0.35rem;
    min-height: 1.25rem;
    align-items: center;
    font-size: var(--font-size-xs);
    margin-block-end: 0.125rem;
    color: var(--color-grey-text);
  }

  .instruction {
    margin-block-start: 0.25rem;
    margin-block-end: 0;
    font-size: var(--font-size-xxs);
    color: var(--color-grey-text);
  }

  &:has(.select:disabled) {
    opacity: 35%;
  }

  .select {
    font-family: var(--font-family-input, system-ui, sans-serif);
    font-size: 16px;
    width: 100%;
    border: 1px solid var(--color-grey-graphic);
    border-radius: var(--radius-md);
    color: var(--color-text);

    &::placeholder {
      color: var(--color-grey-text);
    }

    &:focus-visible {
      outline: 1px solid var(--focus-color);
      border-color: var(--focus-color);
    }
  }
}

.form-field-wrapper {
  .select-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .select {
    -webkit-appearance: none;
    appearance: none;
    margin-inline-end: 1em;
    grid-row: 1;
    grid-column: 1 / -1;
    accent-color: var(--color-text);
    background-color: var(--color-input-bg);
  }

  .select-arrow {
    color: inherit;
    pointer-events: none;
    height: 100%;
    margin-inline-end: 0.5em;
    grid-row: 1;
    grid-column: 2;
  }
}

.select-size--sm .select {
  height: 2rem;
  padding-inline: 0.5em;
}

.select-size--md .select {
  height: var(--control-height);
  padding-inline: 0.5em;
}

.select-size--lg .select {
  height: var(--control-height-lg);
  padding-inline: 0.65em;
}

.select-color--blue {
  .select {
    color: var(--color-blue-on-bg);
    accent-color: var(--color-blue-text);
    border-color: var(--color-blue-graphic);
    background-color: var(--color-blue-bg);
  }

  .select-arrow {
    color: var(--color-blue-on-bg);
  }
}

.select-color--green {
  .select {
    color: var(--color-green-on-bg);
    accent-color: var(--color-green-text);
    border-color: var(--color-green-graphic);
    background-color: var(--color-green-bg);
  }

  .select-arrow {
    color: var(--color-green-on-bg);
  }
}

.select-color--orange {
  .select {
    color: var(--color-orange-on-bg);
    accent-color: var(--color-orange-text);
    border-color: var(--color-orange-graphic);
    background-color: var(--color-orange-bg);
  }

  .select-arrow {
    color: var(--color-orange-on-bg);
  }
}

.select-color--red {
  .select {
    color: var(--color-red-on-bg);
    accent-color: var(--color-red-text);
    border-color: var(--color-red-graphic);
    background-color: var(--color-red-bg);
  }

  .select-arrow {
    color: var(--color-red-on-bg);
  }
}

.select-variant--minimal {
  label {
    font-size: var(--font-size-sm);
  }

  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .select {
    padding-inline: 0;
    border-radius: 0;
    background-color: transparent;
    border-color: transparent;
    border-block-end-color: var(--color-grey-graphic);

    &:focus {
      border-block-end-color: var(--color-accent);
      outline-color: transparent;
    }
  }
}

.select-variant--krafters {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-semibold);
  }
  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .select {
    border-radius: var(--radius-sm);
    border-width: 1.5px;
    border-color: var(--color-grey-text);
    box-shadow: 0 1.5px 0 0 var(--color-grey-text);

    &:focus {
      outline-color: transparent;
      border-color: var(--color-accent);
      box-shadow: 0 1.5px 0 0 var(--color-accent);
    }
  }
}
</style>
