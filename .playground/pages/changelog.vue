<script setup lang="ts">
useHead({ title: 'Changelog' });
</script>

<template>
  <div class="demo-page changelog-page">
    <h1>Changelog</h1>
    <p class="mbe-2">Release notes for new features and bug fixes.</p>

    <ChangelogEntry v="2.1.0" date="2026-10-15">
      <ul>
        <li>
          Fix: Input without <code>v-model</code> no longer loses its value when
          one of its props changes
        </li>
        <li>
          Use the <code>--color-&lt;color&gt;-text</code> tokens for text on
          tinted surfaces in Chip, Callout and Select, and remove the
          <code>--color-&lt;color&gt;-on-bg</code> design tokens
        </li>
        <li>
          Remove the <code>--color-on-secondary</code> design token: the
          secondary Button uses <code>--color-text</code>
        </li>
        <li>
          New font size scale from <code>xxs</code> (10px) to
          <code>xxxxl</code> (64px): <code>lg</code> is 18px, the 11px and 40px
          sizes and the <code>xxxs</code> and <code>xxxxxl</code> names are
          removed
        </li>
        <li>
          Use the 12px <code>xs</code> size for the small text in form fields,
          chips, small buttons and popovers that used the 11px size
        </li>
        <li>
          Feature: add RequiredChip component, used by all form components and
          now also shown in the legend of a required RadioGroup
        </li>
        <li>
          Rename the <code>black</code> variant of Button component to
          <code>3d</code>
        </li>
        <li>
          Feature: add a basic <code>black</code> variant to Button component,
          without shadow and with the default radius
        </li>
        <li>
          Feature: add <code>solid</code> variant to Chip component, using the
          <code>--color-&lt;color&gt;-text</code> tokens as background
        </li>
        <li>Feature: add <code>textTransform</code> prop to Chip component</li>
        <li>
          Remove the <code>capitalize</code> prop of Chip component, use
          <code>textTransform="capitalize"</code> instead
        </li>
        <li>
          Make <code>solid</code> the default variant of Callout component and
          rename the <code>default</code> variant to <code>outline</code>
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="2.0.0" date="2026-10-13">
      <p>
        Projects need to add new design tokens, see <code>MIGRATION.md</code> in
        the repository.
      </p>
      <ul>
        <li>Rename the library to Cardan UI (<code>@cardan/ui</code>)</li>
        <li>
          Add the Cardan brand identity to the <code>main.css</code> template:
          colors for light and dark mode, Hanken Grotesk, type scale and motion
        </li>
        <li>
          Feature: add CardanLogo component with full, symbol and tile forms and
          sub-brand lockups
        </li>
        <li>Feature: add <code>solid</code> variant to Callout component</li>
        <li>
          Add design tokens for button colors, button and form field sizes, text
          on tinted surfaces, tracks and the backdrop
        </li>
        <li>Load fonts with <code>@nuxt/fonts</code> in the layer</li>
        <li>
          Improve contrast of placeholders, MultiSelect options and tags,
          RangeInput labels and DatePicker in dark mode
        </li>
        <li>Announce disabled link buttons to assistive technology</li>
        <li>Replace the bouncing Toast animation with slide and fade</li>
        <li>Fix the transition of the Tabs component</li>
      </ul>
    </ChangelogEntry>
  </div>
</template>

<style>
.changelog-page {
  ul {
    > li {
      margin-block-end: 0.125rem;

      &::marker {
        color: var(--color-accent);
      }
    }

    ul {
      font-size: var(--font-size-sm);
      margin-block-end: 0.25rem;
    }
  }
}
</style>
