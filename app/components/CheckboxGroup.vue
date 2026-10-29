<script setup lang="ts">
const model = defineModel<boolean | (string | number)[]>();

const {
  valueKey = 'value',
  labelKey = 'label',
  disabledKey = 'disabled',
  nameKey = undefined,
  name = undefined,
  variant = 'default',
  titleKey = undefined,
  tabindex = undefined,
  disabled,
} = defineProps<{
  options: any[];
  label: string;
  tabindex?: string;
  valueKey?: string;
  labelKey?: string;
  disabledKey?: string;
  nameKey?: string;
  name?: string;
  titleKey?: string;
  hideLegend?: boolean;
  disabled?: boolean;
  variant?: 'default' | '3d';
}>();
</script>

<template>
  <div class="checkboxes-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend
          v-if="label"
          :class="[hideLegend && 'visuallyhidden', disabled && 'disabled']"
        >
          {{ label }}
        </legend>

        <ul role="list" class="checkbox-list">
          <li v-for="option in options" :key="'checkbox-' + option.value">
            <Checkbox
              v-model="model"
              :value="option[valueKey]"
              :label="option[labelKey]"
              :disabled="disabled || option[disabledKey]"
              :title="titleKey ? option[titleKey] : undefined"
              :name="name || (nameKey ? option[nameKey] : undefined)"
              :hide-label="option.hideLabel"
              :tabindex="tabindex"
              :variant="variant"
            />
          </li>
        </ul>
      </fieldset>
    </template>
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

.checkboxes-wrapper {
  legend {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-md);
    margin-block-end: 0.75rem;
  }

  .checkbox-list {
    display: grid;
    gap: 0.5rem;
  }
}
</style>
