<script setup lang="ts">
const model = defineModel<string | number | boolean>();

const {
  valueKey = 'value',
  labelKey = 'label',
  variant = 'default',
  id = useId(),
  name = undefined,
  tooltip = undefined,
  tabindex = undefined,
  titleKey = undefined,
  disabled,
} = defineProps<{
  options: any[];
  label: string;
  name?: string;
  tooltip?: string;
  tabindex?: string;
  valueKey?: string;
  labelKey?: string;
  titleKey?: string;
  id?: string;
  hideLegend?: boolean;
  required?: boolean;
  disabled?: boolean;
  inline?: boolean;
  variant?: 'default' | '3d' | 'outline';
}>();
</script>

<template>
  <div class="radios-wrapper">
    <fieldset v-if="options?.length">
      <legend
        v-if="label || tooltip"
        :class="[hideLegend && 'visuallyhidden', disabled && 'disabled']"
      >
        <Tooltip
          v-if="tooltip"
          :label="label"
          :hide-label="false"
          icon-color="accent-text"
        >
          {{ tooltip }}
        </Tooltip>
        <span v-else>{{ label }}</span>

        <RequiredChip v-if="required" />
      </legend>

      <ul role="list" :class="['radio-list', inline && 'inline']">
        <li v-for="option in options" :key="'radio-' + option.value">
          <Radio
            v-model="model"
            :value="option[valueKey]"
            :label="option[labelKey]"
            :disabled="disabled || option.disabled"
            :title="titleKey ? option[titleKey] : undefined"
            :lang="option.lang"
            :name="name"
            :tabindex="tabindex"
            :required="required"
            :variant="variant"
            type="radio"
          />
        </li>
      </ul>
    </fieldset>

    <InputError
      :id="id"
      :error-text="$t('form.missing-value', { item: label })"
    />
  </div>
</template>

<style>
:where(legend) {
  padding: 0;
  font-weight: var(--font-weight-semibold);
  -webkit-user-select: none;
  user-select: none;
  transition-property: opacity;
  transition-duration: var(--duration-sm);

  &.disabled {
    opacity: 25%;
  }
}

:where(fieldset) {
  border: none;
  padding: 0;
  margin-inline: 0;
}

.radios-wrapper {
  legend {
    margin-block-end: 0.5rem;
  }

  legend {
    display: inline-flex;
    gap: 0.35rem;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-md);

    .tooltip-content {
      font-weight: 400;
    }
  }

  .radio-list {
    display: grid;
    gap: 0.5rem;

    &.inline {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
    }
  }

  &:has(input[type='radio']:invalid) {
    legend {
      color: var(--color-red-text);
    }

    .error-wrapper .error {
      display: flex;
    }
  }
}
</style>
