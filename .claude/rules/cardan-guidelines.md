<!--
  Shared guidelines of the Cardan Nuxt projects. The original lives in
  cardan-ui at .claude/rules/cardan-guidelines.md; the other projects hold an
  exact copy, as of the cardan-reviewer agent, the review hook and
  .claude/settings.json. Edit them in cardan-ui only, then run
  `scripts/sync-claude-guidelines.sh` there to update the copies.
-->

# Cardan frontend guidelines

## Frontend architecture

- **Framework**: Nuxt.js with Vue Composition API
- **Language**: TypeScript strict mode
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Styling**: CSS with custom design system
- **Features**: i18n (EN/NL), dark mode, responsive design, MCP server
- **Focus**: Accessibility-first modern UI design for evergreen browsers

## Development Commands

```bash
pnpm dev          # Start development server
pnpm run lint     # Run ESLint
pnpm run build    # Build the application for production
```

---

## Review Before Commit, Push and PR

### 🚨 MANDATORY: a fresh reviewer checks every change before it leaves the machine

Run a review **before every `git commit`, `git push` and `gh pr create`** in this repository. The Claude review in GitHub Actions is disabled for its cost, so this local review is the only one.

A hook enforces it (`.claude/hooks/cardan-review.mjs`): it blocks those commands until the `cardan-reviewer` agent has reviewed the files exactly as they are now. When that agent finishes, the hook records the state of the working tree; any change after that, a fix included, needs a new review. Never record that state yourself. Reviews are recorded only for the repository the session started in, so commit, push and open PRs in another repository from a session started there. Skip the review only when the user explicitly says to skip it for this change, by putting `SKIP_REVIEW=1` in front of the command; "commit this" or "push" is not a skip.

1. **Run the checks first**: `pnpm run lint`, and `pnpm test` where the project has a test script. REVIEW.md leaves out what ESLint enforces, so lint must pass on its own.
2. **Start the reviewer**: launch the `cardan-reviewer` agent with the Agent tool (`subagent_type: "cardan-reviewer"`). Never review your own changes in your own context, and never use a `fork` (it inherits your context).
3. **Brief it** with only the diff command and the target branch, never your own reasoning or what you think is fine:
   - Before a commit: every uncommitted change (`git diff HEAD`, plus untracked files). The hook records the whole working tree as reviewed, so review all of it, not only what is staged.
   - Before a push or PR: the whole branch against the branch it will merge into (`git diff origin/<base>`, which includes uncommitted changes). That is `main`, or `develop` in cardan-auditor-nuxt and cardan-lms-nuxt when the PR targets `develop`. If every commit on the branch was already reviewed this way and nothing changed since, the commit review covers it and the hook lets the push through.
4. **Act on the findings**:
   - 🔴 Important: fix it. If after checking the code you think the finding is wrong, tell the user why instead of fixing it. After fixes, run the reviewer again on the changes since, saying in the brief that it is a re-review (Important findings only). Never commit or push with an open Important finding unless the user decides to.
   - 🟡 Nit: fix the clear ones before the re-review and list the rest for the user.
5. **Report**: show the user the tally, the findings and what you did with each before you commit, push or open the PR. Put a one-line summary of the local review in the PR description.

The shared Claude files (this file, the `cardan-reviewer` agent, the hook and `.claude/settings.json`) are exact copies of the originals in cardan-ui; never edit them in another project. When a session starts with a note that they differ from cardan-ui, tell the user.

---

## Core Development Principles

### Custom CSS Design System

- Write custom CSS for the project, avoid using Tailwind classes
- Use CSS nested classes for styling, avoid adding classes to the root element
- Write mobile-first CSS, ensure the design is responsive and works on all devices
- Use logical properties and values
- Use CSS variables from Cardan UI for colors, spacing, typography, etc.
- Think through class placement, order, priority, and defaults - remove redundant classes, add classes to parent or child carefully to limit repetition, group elements logically
- Offer to extract repeated patterns into utility classes or Vue components, depending on the project's conventions

### Code Quality Standards
- Use TypeScript strict mode
- Follow Vue 3 Composition API patterns
- Implement comprehensive TypeScript types
- Write intuitive component APIs
- Implement proper error handling
- Use semantic naming conventions
- Organize code in logical file structures
- Prefer composition over inheritance

### Testing & Quality
- Use ESLint for code quality
- Test keyboard navigation
- Verify screen reader compatibility

### Performance
- Implement tree-shaking for components
- Use lazy loading where appropriate
- Optimize bundle size
- Monitor performance metrics

### Dependencies
- **Preference**: Avoid adding new external dependencies unless absolutely necessary
- **Reuse**: A dependency that Cardan UI already lists is not a new dependency. Reusing it in a project is fine, especially a Nuxt module: prefer it over writing your own version
- **Version Control**: Keep dependencies up to date and secure

### Project Planning

When working on new features or components:
1. **Outline a plan** before making code changes
2. Consider accessibility requirements from the start
3. Follow established patterns and conventions
4. Test thoroughly before implementation
5. Document any new patterns or utilities

---

## Web Content Accessibility Guidelines

### 🚨 ACCESSIBILITY FIRST - MANDATORY REQUIREMENT

**CRITICAL**: Since we are an accessibility first company, every frontend change MUST comply with all 55 WCAG 2.2 level A and AA success criteria. This is non-negotiable.

### Accessibility Requirements for ALL Changes:

- **WCAG 2.2 Compliance**: Must meet all Level A and AA success criteria
- **Semantic HTML**: Use proper HTML elements and structure
- **Keyboard Navigation**: Ensure full keyboard accessibility
- **Screen Reader Support**: Provide proper labels, roles, and descriptions
- **Color Contrast**: Meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text and graphical UI elements)
- **Focus Management**: Visible focus indicators and logical focus order
- **Alternative Text**: Empty alt text for decorative images and descriptive alt text for all other images
- **Form Labels**: Proper labeling and error handling for forms
- **Responsive Design**: Accessible across all device sizes and orientations, support viewport width from 320px and up

### Testing Accessibility Changes:

- Test with keyboard navigation only
- Verify with screen readers (built-in or extensions)
- Check color contrast ratios
- Validate HTML semantics
- Run automated accessibility tests (if available, with `vitest-axe` for example)
