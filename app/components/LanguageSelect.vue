<script setup lang="ts">
import type { Locale } from '#i18n';

const { locale, setLocale } = useI18n();

const userLang = computed({
  get: () => locale.value,
  set: (value: Locale) => {
    setLocale(value);
    emit('change', value);
  },
});

const emit = defineEmits<{
  change: [string];
}>();
</script>

<template>
  <div class="language-select-wrapper">
    <fieldset class="language-fieldset">
      <legend>{{ $t('general.language') }}</legend>

      <ul role="list" class="language-options-list">
        <li class="language-option">
          <input
            id="language-option-english"
            v-model="userLang"
            name="i18n"
            value="en"
            type="radio"
          />
          <label for="language-option-english" lang="en">English</label>
        </li>

        <li class="language-option">
          <input
            id="language-option-dutch"
            v-model="userLang"
            name="i18n"
            value="nl"
            type="radio"
          />
          <label for="language-option-dutch" lang="nl">Nederlands</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style>
:where(label) {
  font-weight: var(--font-weight-medium);
  -webkit-user-select: none;
  user-select: none;
}

:where(fieldset) {
  border: none;
  padding: 0;
  margin-inline: 0;
}

:where(legend) {
  padding: 0;
  -webkit-user-select: none;
  user-select: none;
}

.language-fieldset {
  legend {
    width: 100%;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-text);
    margin-block-end: 0.5rem;
  }
}

.language-options-list {
  display: inline-flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.language-option {
  flex-grow: 1;

  input[type='radio'] {
    position: absolute;
    z-index: -1;
    opacity: 0;

    + label {
      font-size: var(--font-size-xs);
      display: flex;
      align-items: center;
      padding-block: 0.35rem;
      padding-inline: 0.5rem 0.65rem;
      min-width: 75px;
      justify-content: center;
      border: 1px solid var(--color-accent-bg);
      border-radius: var(--radius-md);
      color: var(--color-grey-text);

      &:hover {
        color: var(--color-text);
        border-color: var(--color-grey-graphic);
      }
    }

    &:focus-visible {
      + label {
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
      }
    }

    &:checked {
      + label {
        color: var(--color-white);
        border-color: var(--color-accent-graphic);
        background-color: var(--color-accent-text);

        .iconify {
          color: var(--color-accent-graphic);
        }
      }
    }
  }
}
</style>
