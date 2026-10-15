# Migrating to Cardan UI 2.0

Cardan UI 2.0 is an accessible UI component library. This guide is for developers of projects that extend the layer.

The components stay brand-agnostic: they read design tokens from your project's own `main.css`. A project keeps its current look until it adopts the Cardan tokens, but it does need the new tokens listed below.

## 1. Point your project at the new repository

```ts
defineNuxtConfig({
  extends: ['github:cardan-a11y/cardan-ui'],
  // or, for local development:
  // extends: ['../cardan-ui'],
});
```

## 2. Install `@nuxt/fonts`

The layer now registers `@nuxt/fonts`. Projects that do not have it yet (CAT-nuxt, CAT-dashboard, chart) need to install it:

```bash
pnpm add -D @nuxt/fonts
```

It only downloads fonts that your CSS uses. A project that keeps `system-ui` (or does not set `--font-family`) loads no fonts.

## 3. Add the new design tokens

Components use these tokens without fallbacks. Add them to `:where(:root)` in your project's `main.css`. The values below keep your current look:

```css
:where(:root) {
  --font-weight-semibold: 600;

  /* Buttons */
  --color-on-accent: var(--color-white);
  --color-accent-hover: color-mix(
    in srgb,
    var(--color-accent) 90%,
    var(--color-white)
  );
  --color-secondary: var(--color-grey-bg);
  --color-secondary-hover: color-mix(
    in srgb,
    var(--color-grey-bg) 95%,
    var(--color-black)
  );
  --color-on-secondary: var(--color-text);
  --shadow-offset: 4px 4px 0 0 var(--color-accent);
  --shadow-offset-hover: 6px 6px 0 0 var(--color-accent);

  /* Sizes of buttons and form fields */
  --control-height: 2.25rem;
  --control-height-lg: 2.5rem;
  --button-padding-inline: 0.75rem;
  --button-font-size: var(--font-size-sm);
  --button-font-size-sm: var(--font-size-xs);
  --button-font-size-xs: var(--font-size-xxs);

  /* Text and icons on tinted (-bg) surfaces: Chip, colored Select, Callout solid */
  --color-accent-on-bg: var(--color-accent-text);
  --color-grey-on-bg: var(--color-grey-text);
  --color-red-on-bg: var(--color-red-text);
  --color-orange-on-bg: var(--color-orange-text);
  --color-yellow-on-bg: var(--color-yellow-text);
  --color-green-on-bg: var(--color-green-text);
  --color-blue-on-bg: var(--color-blue-text);
  --color-purple-on-bg: var(--color-purple-text);
  --color-pink-on-bg: var(--color-pink-text);

  /* Track of ProgressMeter, ProgressCircle and RangeInput */
  --color-track: var(--color-grey-bg);

  /* Backdrop behind Dialog and MobileMenu */
  --color-backdrop: rgb(0 0 0 / 75%);
}
```

cardan-lms-nuxt already defines `--font-weight-semibold`; skip that line there. CAT-nuxt already has all of these tokens.

### Tokens that were already missing before 2.0

Some projects did not define every token the components use, also before this release. Copy these from the layer's [`app/assets/main.css`](app/assets/main.css) when you migrate:

| Project         | Missing tokens                                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAT-dashboard   | `--line-height`, `--line-height-heading`                                                                                                                                                                                  |
| cardan-lms-nuxt | `--card-border-color`, `--popover-border-color`, `--shadow-2`, `--shadow-3`, `--color-blue*`, `--color-orange*`, `--color-pink-bg/-text/-graphic`, `--color-purple-bg/-text/-graphic`, `--color-yellow-bg/-text/-graphic` |
| chart           | Nearly all color, font, radius, duration and shadow tokens: it defines 10 of them                                                                                                                                         |

## 4. Changes you will see despite the tokens

These changes are not driven by tokens, so they apply to every project:

- **Placeholders** in Input, Select and Textarea use `--color-grey-text` instead of `--color-grey-graphic`, for 4.5:1 contrast.
- **MultiSelect**: the highlighted (hovered or keyboard) option uses the accent color with `--color-on-accent` text; a highlighted selected option is green. Tags use `--color-accent-text`.
- **Progress and range tracks** are one neutral color (`--color-track`) instead of a tint per color, and their fills use the `-graphic` colors.
- **Colored Select** arrows use the `-on-bg` color instead of the `-graphic` color.
- **MobileMenu** shares `--color-backdrop` with Dialog, so its backdrop goes from 50% to 75% with the value above.
- **Motion**: Toast slides and fades instead of bouncing; Accordion, ProgressMeter and ProgressCircle animate with `--duration-md` and `--cubic-bezier`; Tabs now animate their color change (a typo disabled this).
- **Disabled link buttons** get `role="link"` and `aria-disabled="true"`.
- **Inputs, Select, Textarea and DatePicker** use `--font-family-input` and fall back to `system-ui` when it is not set, as before.
- **Class names**: style `.cardan-multiselect`, `.cardan-datepicker(-container)` and `.cardan-markdown-preview`; the `krafters-*` classes are no longer rendered. CAT-nuxt (`FindingForm`, `CrawlerTestDialog`, `ActivityMapper`, `ProjectDetails`) and cardan-lms-nuxt (`main.css`) use them.
- **MarkdownEditor** no longer loads anything from unpkg or cdnjs: highlight.js and its code theme are bundled, and prettier and ECharts are disabled (neither was in the toolbar). You can remove the unpkg and cdnjs exceptions for md-editor-v3 from your Content Security Policy.
- **`useCookiesDialog`** stores the consent cookie with Nuxt's `useCookie` instead of `js-cookie`. Existing consent cookies stay valid. Projects can remove `js-cookie` unless their own code imports it: cardan-nuxt's `CookiesDialog.vue` does, so keep it there or switch that component to `useCookie` too.
- **DatePicker**'s visible label is now linked to its input. Before, the input had no id, so the label pointed to nothing.

## 5. Adopting the Cardan brand identity

When a project moves to the new identity, copy the tokens from the layer's [`app/assets/main.css`](app/assets/main.css) into its own `main.css`, replacing the values from step 3. That template contains:

- the brand palette as `--cardan-*` primitives, mapped to the semantic `--color-*` tokens for light and dark mode
- Hanken Grotesk (`--font-family`), the type scale and line heights
- 40px buttons and fields (`--control-height`), 44px for `lg`, with 16px button text
- Body text on tinted surfaces, a neutral track, the Cardan backdrop and 12px card radius

Then use the new components and options where they fit:

- `<CardanLogo />` for the logo: full logo, symbol or tile, with automatic color-negative version in dark mode, and sub-brand lockups like `<CardanLogo product="academy" />`
- `<Callout />` now has a tinted surface by default; `<Callout variant="outline" />` keeps the white surface with a tinted border

The playground at [localhost:3003](http://localhost:3003) shows the Cardan template in light and dark mode.

## 6. Projects that use Cardan Auth UI

Cardan Auth UI (sign-in and the MFA flow) now lives in the `auth/` directory of this repository. Extend it next to Cardan UI, as a peer:

```ts
defineNuxtConfig({
  extends: [
    'github:cardan-a11y/cardan-ui/auth',
    'github:cardan-a11y/cardan-ui',
  ],
  // or, for local development:
  // extends: ['../cardan-ui/auth', '../cardan-ui'],

  modules: ['nuxt-auth-sanctum'],
});
```

The layer now uses its `--auth-*` tokens without fallbacks, so define all of them in your `main.css`. These values keep the sizes the layer used before; the Cardan template in `app/assets/main.css` raises the error text to `--font-size-sm` (14px):

```css
:where(:root) {
  --auth-color-divider: var(--color-grey-light);
  --auth-font-size-heading: var(--font-size-xxl);
  --auth-font-size-intro: var(--font-size-lg);
  --auth-font-size-step-heading: var(--font-size-lg);
  --auth-font-size-label: var(--font-size-md);
  --auth-font-size-small: var(--font-size-sm);
  --auth-font-size-error: var(--font-size-xs);
  --auth-font-size-otp-input: var(--font-size-xxxl);
  --auth-font-size-recovery-code-input: var(--font-size-lg);
  --auth-font-size-recovery-code-list: var(--font-size-sm);
  --auth-font-size-button: var(--font-size-md);
  --auth-font-size-dialog-button: var(--font-size-sm);
}
```

cardan-lms-nuxt already defines the font size roles; it only needs `--auth-color-divider`.

Remove any MFA composables or components your app still has from before the layer, such as CAT-nuxt's own `useMfa`. An app composable with the same name replaces the layer's auto-import, and the layer keeps its MFA state under the same `useState` keys (`mfaStep`, `qrCode`, `recoveryCodes`, `mfaError`, …), so the two would break each other.

The role tokens are now resolved where your `main.css` defines them: redefining `--font-size-*` on part of a page no longer changes them. Set the `--auth-*` tokens on a container instead to change the sizes on one page.

## 7. Upgrading to 2.1

2.1 adds two options to Chip, and changes the default look of Callout.

- **Callout is `solid` by default**: a tinted surface with the `--color-<color>-on-bg` text. The old default look is now `variant="outline"`, and `variant="default"` no longer exists. To keep the white surface with a tinted border, add `variant="outline"` to your callouts, and replace `variant="default"` with `variant="outline"`. Callouts with `variant="solid"` can drop the prop.

The Chip options change nothing for projects that don't use them:

- **`variant="solid"`**: light text (`--color-on-accent`) on a filled background, for every color. It needs a `--color-<color>-solid` token per color, which each reach 4.5:1 with white text. Copy them from the template in [`app/assets/main.css`](app/assets/main.css): `--color-red-solid` and `--color-green-solid` per mode, the others in `:where(:root)`.
- **`textTransform`**: `uppercase`, `lowercase` or `capitalize`, the CSS `text-transform` keywords. `uppercase` also adds `letter-spacing: 0.025em` to keep the label legible. The new global `TextTransform` type can be used by other components too.
- **`capitalize` is deprecated** and will be removed in 3.0. It only capitalized the first letter of the label, which is not what `text-transform="capitalize"` does (that capitalizes every word). CAT-nuxt's `FindingChips.vue` uses it on a criterion number, where it has no visible effect: remove it there.
