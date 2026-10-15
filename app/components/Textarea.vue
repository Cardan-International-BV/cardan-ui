<script setup lang="ts">
const model = defineModel<string | number>();

const {
  label = undefined,
  placeholder = undefined,
  pattern = undefined,
  ariaDescribedby = undefined,
  name = undefined,
  instruction = undefined,
  errorMessage = undefined,
  variant = 'default',
  required,
  autoresize,
  id = useId(),
} = defineProps<{
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  pattern?: string;
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  showInvalid?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autoresize?: boolean;
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

const textareaInput = ref('');
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea');

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  textareaInput.value = target.value;
  model.value = target.value;
}

function focusElement() {
  textareaRef.value?.focus();
}

function resizeTextarea() {
  if (autoresize && textareaRef.value) {
    textareaRef.value.style.height = 'auto';

    const height = textareaRef.value.scrollHeight;
    textareaRef.value.style.height = `${height + 2}px`;
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeTextarea);
  resizeTextarea();
});

watch(textareaInput, () => {
  resizeTextarea();
});

onUnmounted(() => window.removeEventListener('resize', resizeTextarea));

defineExpose({
  focusElement,
});

const emit = defineEmits<{
  blur: [value: Event];
  paste: [value: Event];
}>();
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      'textarea-wrapper',
      `textarea-variant--${variant}`,
      showInvalid && 'show-invalid',
    ]"
  >
    <label
      v-if="label"
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }}</span>

      <RequiredChip v-if="required" />
    </label>

    <slot name="label" />

    <textarea
      :id="id"
      ref="textarea"
      v-model="model"
      :class="['textarea', autoresize && 'autoresize']"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :pattern="pattern"
      :autofocus="autofocus"
      :name="name"
      :aria-describedby="computedAriaDescribedby"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @paste="emit('paste', $event)"
    />

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

:where(textarea) {
  padding: 0.5rem;
  resize: vertical;
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
    font-size: var(--font-size-sm);
    margin-block-end: 0.125rem;
    color: var(--color-text);
  }

  .instruction {
    margin-block-start: 0.25rem;
    margin-block-end: 0;
    font-size: var(--font-size-xs);
    color: var(--color-grey-text);
  }

  &:has(.textarea:disabled) {
    opacity: 35%;
  }

  .textarea {
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

.textarea-wrapper {
  .textarea {
    background-color: var(--color-input-bg);
    min-height: 7.5rem;
    padding-inline-end: 1.5rem;

    &[readonly] {
      background-color: var(--color-grey-bg);
      border-color: transparent;
      caret-color: transparent;
    }

    &.autoresize {
      height: auto;
      overflow: auto;
      min-height: 2.5rem;
    }
  }
}

.textarea-variant--minimal {
  label {
    font-size: var(--font-size-sm);
  }

  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .textarea {
    padding-inline: 0;
    padding-block-end: 0.5em;
    line-height: var(--line-height);
    border-radius: 0;
    background-color: transparent;
    border-color: transparent;
    border-block-end-color: var(--color-grey-graphic);
    min-height: 2.5rem;
    resize: none;

    &:focus {
      border-block-end-color: var(--color-accent);
      outline-color: transparent;
    }
  }
}

.textarea-variant--3d {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-semibold);
  }

  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .textarea {
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
