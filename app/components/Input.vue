<script setup lang="ts">
const {
  modelValue = undefined,
  label = undefined,
  required = undefined,
  errorMessage = undefined,
  min = undefined,
  max = undefined,
  step = undefined,
  pattern = undefined,
  icon = undefined,
  name = undefined,
  title = undefined,
  autocomplete = undefined,
  placeholder = undefined,
  minlength = undefined,
  maxlength = undefined,
  ariaDescribedby = undefined,
  instruction = undefined,
  tabindex = undefined,
  variant = 'default',
  list = undefined,
  type = 'text',
  size = 'md',
  id = useId(),
} = defineProps<{
  modelValue?: string | number;
  label?: string;
  id?: string;
  name?: string;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  list?: string;
  type?: string;
  autocomplete?: string;
  pattern?: string;
  placeholder?: string;
  icon?: string;
  size?: InputSize;
  minlength?: number;
  maxlength?: number;
  hideLabel?: boolean;
  showInvalid?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  tabindex?: string;
  variant?: InputVariant;
}>();

const computedErrorMessage = computed(() => {
  if (errorMessage) {
    return errorMessage;
  } else if (required && !modelValue) {
    return $t('form.missing-value', { item: label });
  } else if (type === 'email') {
    return $t('form.invalid-email');
  } else if (type === 'url') {
    return $t('form.invalid-url');
  }
  return $t('form.invalid-value');
});

const inputMode = computed(() => {
  if (type === 'email') return 'email';
  if (type === 'tel') return 'tel';
  if (type === 'url') return 'url';
  if (type === 'number') return 'decimal';
  return 'text';
});

const inputPattern = computed(() => {
  if (pattern) return pattern;
  if (type === 'tel') return '^[0-9]+$';
  return undefined;
});

const chipSize = computed(() => {
  if (size === 'lg') return 'sm';
  if (size === 'md') return 'xs';
  if (size === 'sm') return 'xs';
  return 'xs';
});

const computedAriaDescribedby = computed(() =>
  [ariaDescribedby, instruction && `instruction-${id}`, id && `error-${id}`]
    .filter(Boolean)
    .join(' '),
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (type === 'number') {
    if (Number(target.value) < Number(min)) {
      return;
    }
    if (Number(target.value) > Number(max)) {
      return;
    }
  }
  emit('update:model-value', target.value);
}

const inputRef = useTemplateRef<HTMLInputElement>('input');

function focusElement() {
  inputRef.value?.focus();
}

defineExpose({
  inputRef,
  focusElement,
});

const emit = defineEmits<{
  'update:model-value': [value: string | number];
  focus: [value: Event];
  blur: [value: Event];
}>();
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      `input-size--${size}`,
      `input-variant--${variant}`,
      showInvalid && 'show-invalid',
    ]"
  >
    <label
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }}</span>

      <Chip
        v-if="required"
        :size="chipSize"
        radius="sm"
        color="grey"
        :label="$t('form.required')"
      />
    </label>

    <div class="input-wrapper">
      <input
        :id="id"
        ref="input"
        class="input"
        :value="modelValue"
        :name="name"
        :title="title"
        :list="list"
        :type="type || 'text'"
        :autocomplete="autocomplete"
        :inputmode="inputMode"
        :pattern="inputPattern"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :tabindex="tabindex"
        :data-1p-ignore="autocomplete === 'off'"
        :aria-describedby="computedAriaDescribedby"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @input="handleInput"
      />

      <Icon v-if="icon" :name="icon" />
    </div>

    <InputError :id="id" :error-text="computedErrorMessage" />

    <p v-if="instruction" :id="`instruction-${id}`" class="instruction">
      {{ instruction }}
    </p>
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

:where(input) {
  background-color: transparent;
  filter: none;

  &:-webkit-autofill {
    -webkit-text-fill-color: var(--color-accent-text);
    box-shadow: 0 0 0 100px var(--color-accent-bg) inset;
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

  &:has(.input:disabled) {
    opacity: 35%;
  }

  .input {
    font-family: var(--font-family-input, system-ui, sans-serif);
    font-size: 16px;
    width: 100%;
    border: 1px solid var(--color-grey-graphic);
    border-radius: var(--radius-md);

    &::placeholder {
      color: var(--color-grey-text);
    }

    &:focus {
      outline: 1px solid var(--focus-color);
      border-color: var(--focus-color);
    }
  }
}

.form-field-wrapper {
  .input-wrapper {
    position: relative;
  }

  .input {
    background-color: var(--color-input-bg);

    &[readonly] {
      background-color: var(--color-grey-bg);
      border-color: transparent;
      caret-color: transparent;
    }

    &:has(+ .iconify) {
      padding-inline-start: 1.75rem;
    }

    + .iconify {
      position: absolute;
      z-index: 1;
      left: 0.5rem;
      inset-block: 0;
      margin-block: auto;
      color: var(--color-grey-text);
    }
  }
}

.input-size--sm {
  .input {
    height: 2rem;
    padding-inline: 0.5em;
  }
}

.input-size--md {
  .input {
    height: var(--control-height);
    padding-inline: 0.5em;
  }
}

.input-size--lg {
  .input {
    height: var(--control-height-lg);
    padding-inline: 0.65em;
  }
}

.input-size--xl {
  .input {
    height: 3rem;
    padding-inline: 0.75em;
  }
}

.input-variant--minimal {
  label {
    font-size: var(--font-size-sm);
  }

  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .input {
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

.input-variant--3d {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-semibold);
  }

  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .input {
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
