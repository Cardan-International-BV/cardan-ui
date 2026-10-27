# Review instructions

This is cardan-ui, the accessible Vue component library of Cardan, shipped as
a Nuxt layer. cardan-auditor-nuxt (Cardan Auditor), cardan-lms-nuxt (Cardan Academy),
cardan-nuxt (the website) and other projects extend it, so a change here
reaches all of them at once. Cardan is an accessibility-first company: an
accessibility regression in this library is a production bug in every
project, not polish. CLAUDE.md (and the parent guidelines it refers to) holds
the conventions; MIGRATION.md tells projects how to upgrade.

## What Important means here

Reserve 🔴 Important for findings that would break behavior or accessibility
in the projects that extend the layer:

- Accessibility regressions against WCAG 2.2 A/AA: removed or wrong ARIA,
  missing accessible names, broken keyboard or focus behavior, lost
  label/error associations, color-only meaning, status changes that are no
  longer announced, targets smaller than 24×24px, or motion that ignores
  `prefers-reduced-motion`.
- Contrast: text below 4.5:1 or graphics and UI boundaries below 3:1, in
  light **or** dark mode. Check both: the tokens in `app/assets/main.css`
  have separate values under `.light-mode` and `.dark-mode`, and some are
  `color-mix()` values that need to be worked out.
- Reflow: a component that scrolls horizontally or loses content at 320px
  wide.
- A component that starts using a design token that is not defined in
  `app/assets/main.css`, or that is not listed in MIGRATION.md with a value
  that keeps the current look of existing projects. Projects own their copy
  of `main.css`, so an undefined token silently breaks their styling.
- Breaking changes for projects without a note in MIGRATION.md: a renamed or
  removed prop, variant, slot, emit, class name or exported type, or a
  changed default value.
- Incorrect logic or state: a `useState` key that collides, reactive state
  that goes stale, listeners or observers that are not cleaned up.

Style, naming and refactoring suggestions are 🟡 Nit at most.

## Always check

- Components use design tokens, never hard-coded colors, sizes, radii or
  durations. Exceptions: the fixed artwork colors in `CardanLogo`, the black
  video area in `VideoPlayer`/`YouTube` and the hue slider in `RangeInput`.
- Tokens are used without fallbacks: `var(--token)`, not
  `var(--token, var(--other))`.
- Components never use the `--cardan-*` primitives; only the semantic
  `--color-*` tokens in `main.css` do.
- Text and icons on tinted (`-bg`) surfaces use the `--color-*-on-bg`
  tokens.
- Custom CSS only: no Tailwind classes, logical properties
  (`margin-inline`, `padding-block`, …), mobile-first.
- User-facing strings go through `$t()` and the key exists in **both**
  `i18n/locales/nl.json` and `i18n/locales/en.json`.
- Props are typed; shared types live in `app/types/index.ts` as
  `declare global`.
- No new external dependencies unless clearly necessary, and nothing loaded
  from a CDN at runtime (projects run a strict Content Security Policy).
- New Nuxt-only APIs in components (`NuxtLink`, `useState`, `useNuxtApp`,
  `ClientOnly`, …) are a 🟡 Nit: the components will also be imported in
  Inertia.js apps, so prefer plain Vue where it is just as simple.
- Icons are Material Symbols (`material-symbols:*-outline-rounded` first)
  and decorative unless a text label is missing.

## Do not report

- Type errors that pre-exist on the base branch. There is a known baseline
  (`app/components/Markdown/extensions.ts`,
  `app/composables/useCookiesDialog.ts`, `app/utils/sort.ts` and others);
  only report type issues the PR introduces.
- Anything `pnpm run lint` (ESLint) already enforces, or formatting.
- `pnpm-lock.yaml`, `.playground/public/**`, and generated or vendored code.
- Code style in the playground pages under `.playground/`; they are
  documentation. Accessibility problems in them still count.
- Missing tests: there is no test suite yet.

## Cap the nits

Report at most five 🟡 Nits per review; summarize the rest as "plus N
similar items." If everything found is a Nit, lead the summary with
"No blocking issues."

## Verification bar

Behavior claims need a `file:line` citation from this repository, not an
inference from naming. Contrast claims need the two colors and the ratio,
for the mode they apply to. For claims about how a consuming project is
affected, state the assumption explicitly: those projects are not in this
repository.

## Re-review convergence

After the first review round on a PR, post Important findings only;
suppress new nits unless the pushed changes introduced them.

## Summary shape

Open the review body with a one-line tally, e.g. `1 important, 3 nits`,
followed by one sentence on whether the PR is safe to merge for the projects
that extend the layer, and whether MIGRATION.md covers what they need to do.
