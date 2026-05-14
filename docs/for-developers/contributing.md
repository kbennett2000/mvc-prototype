---
type: explanation
audience: developer
time: 10 minutes
---

# Contributing

**Who this is for:** Developers who want to send a pull request to improve the template.
**What you'll accomplish:** Understand the PR workflow, code style expectations, and what changes are welcome (and what isn't).
**You'll need first:** A GitHub account and the project forked. See [for-tech-volunteers/03-fork-and-clone.md](../for-tech-volunteers/03-fork-and-clone.md).

---

## What this project is

This is an **open-source starter template** for small-church websites. It's built on Next.js + TinaCMS and designed so:

- A non-technical editor can update content through a browser.
- A semi-technical volunteer can deploy and maintain it.
- A developer can fork it and customize it deeply.

The default seed content reflects Majestic View Church (the prototype). The template is generalized so any small church can replace the content and ship.

---

## What changes are welcome

### Yes, please

- **Bug fixes.** Anything broken on a clean install, in a fresh deploy, or in a documented usage flow.
- **Accessibility improvements.** Better keyboard nav, screen-reader support, color contrast.
- **Performance improvements.** Smaller bundles, faster loads, fewer layout shifts.
- **Documentation fixes.** Typos, broken links, outdated steps, missing screenshots.
- **Generic features.** Things any small church would want — better calendar rendering, better sermon search, dark mode toggle, etc.
- **Better defaults.** A more accessible color palette, a clearer setup script prompt, better error messages.
- **New optional integrations.** Newsletter providers (Mailchimp, Buttondown), giving platforms (Tithe.ly, Pushpay), as opt-in feature flags.
- **i18n.** Localization to languages other than English, gated behind a config flag.

### Maybe — discuss first

- **Major dependency changes.** Switching CSS frameworks, swapping the CMS, etc. Open an issue first so the direction can be agreed.
- **New routes or sections.** Discuss whether they belong in the core template or as a documented extension.
- **Architectural changes.** ADRs welcome — see [decision-log.md](./decision-log.md) for examples.

### No, thanks

- **Church-specific features.** A scholarship program calculator, a denomination-specific liturgy renderer, etc. Fork it — these belong in a custom branch, not the upstream template.
- **Opinionated UX changes** that override existing design without discussion. The template tries to feel reverent, warm, and competent. Sweeping aesthetic rewrites should come through a design proposal first.
- **Vendor lock-in.** Tying the template to a specific paid SaaS provider as a requirement (rather than an optional integration).
- **Changes that hurt template-readiness.** Hardcoding church-specific data into components, bypassing the content layer, etc. See [REFACTOR_FOR_TEMPLATE.md](../REFACTOR_FOR_TEMPLATE.md) for the principles.

---

## PR workflow

### 1. Open an issue first (for non-trivial changes)

For anything bigger than a typo, **open an issue** describing what you want to change and why. This avoids you investing hours in a PR that gets rejected.

For typos and obvious bug fixes, skip straight to the PR.

### 2. Fork and branch

Fork the repo. In your fork:

```
git checkout -b fix/calendar-modal-keyboard
```

Branch naming convention:
- `fix/<short-description>` for bug fixes.
- `feat/<short-description>` for new features.
- `docs/<short-description>` for doc-only changes.
- `chore/<short-description>` for tooling, deps, refactors.

### 3. Make the change

- Keep PRs focused. One concern per PR.
- If you're touching multiple files, group related changes into commits.
- Run `npm run build` locally before pushing — make sure it passes.

### 4. Commit conventions

Conventional Commits:

```
fix(calendar): close modal on Escape key
feat(blog): add new blog collection
docs(editors): clarify YouTube ID extraction
chore(deps): update next to 16.2.6
```

Not strict — clarity matters more than the prefix.

### 5. Open the PR

PR title: short, descriptive. PR description should answer:

- **What changed** — what does the PR do?
- **Why** — what problem or improvement does it address?
- **How tested** — what did you verify works?
- **Screenshots** — if the change is visual.

### 6. Review

Maintainers will review within a week or two. Expect:

- Questions about why a change was made.
- Suggestions for naming, structure, or coverage.
- Sometimes a request to split into smaller PRs.

Be patient and responsive. The reviewer's job is to keep the template coherent.

---

## Code style

### TypeScript

- **Strict mode is on.** `tsconfig.json` has `"strict": true`. No `any` without a comment explaining why.
- **No unused variables.** ESLint catches them.
- **Prefer interfaces for object types.** `interface Foo {}` over `type Foo = {}` for plain object shapes.
- **Default to `const`.** Use `let` only when the variable is reassigned.
- **No `enum`.** Use string literal unions or `as const` arrays.
- **Async/await over `.then()`.** Cleaner stack traces.

### React

- **Server components by default.** Add `"use client"` only when needed.
- **Props typed inline or as interface.** Don't use `React.FC` (deprecated convention).
- **No prop drilling more than 2 levels.** Compose at the parent or use context.
- **Boolean props named affirmatively.** `isVisible`, not `notHidden`.

### Naming

- Files: kebab-case (`event-modal.tsx`).
- Components: PascalCase (`EventModal`).
- Functions and variables: camelCase.
- Constants: SCREAMING_SNAKE_CASE for module-level, camelCase otherwise.
- TypeScript types and interfaces: PascalCase.

### Tailwind

- Use the cn() helper from `lib/utils.ts` for conditional classes:
  ```tsx
  className={cn("p-4", isActive && "bg-primary")}
  ```
- Don't construct class strings dynamically (`bg-${color}`) — Tailwind can't see them.
- Order classes loosely: layout → spacing → typography → color → state. Not a hard rule, but consistency helps reviewers.

### Imports

- Absolute imports via `@/` alias for project files.
- Group: builtins, then npm packages, then `@/`, then relative.
- Type-only imports use `import type` when possible.

```ts
import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { getSermons } from "@/lib/sermons";

import type { Sermon } from "@/lib/sermons";
```

---

## Testing

Currently the project relies on **manual testing**. There's no automated test suite. This is a known gap.

Until tests exist:

- Run `npm run build` and verify it passes with no warnings.
- Run `npm run start` and click through the affected pages.
- For CMS changes, run TinaCMS locally with `npm run cms` and test against local content files.
- For setup script changes, run `npm run setup` end-to-end on a clean checkout.

Contributions adding a test framework (Vitest + Playwright likely) are welcome — open an issue first to align on approach.

---

## Adding a new dependency

Before adding a new npm package:

- **Is this needed?** Could a small helper function solve the problem?
- **Is it actively maintained?** Check the last release date on npmjs.com.
- **Is it widely used?** Weekly downloads matter — niche packages become maintenance burdens.
- **What's the bundle impact?** Check on [bundlephobia.com](https://bundlephobia.com/).
- **Is the license compatible?** MIT, Apache 2.0, BSD are fine. GPL and AGPL aren't (they restrict downstream use).

If yes to all of the above, add it. Mention the package in the PR description with a justification.

---

## Documentation expectations

- New features need docs in the right track (editors, tech volunteers, or developers).
- Bug fixes that change behavior should update existing docs.
- Use the Diátaxis frontmatter pattern. See existing docs for the format.
- Screenshots are aspirational paths — don't worry about creating images; they'll be captured later.

---

## Releases

The template is versioned with semantic versioning:

- **Major (1.0 → 2.0):** breaking changes that require existing churches to migrate.
- **Minor (1.0 → 1.1):** new features, backward-compatible.
- **Patch (1.0 → 1.0.1):** bug fixes and docs.

A changelog lives in `CHANGELOG.md` (to be added).

---

## What's next?

- [Architecture](./architecture.md) — orientation to the codebase.
- [Decision log](./decision-log.md) — why each piece of the stack was chosen.

## Stuck?

- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Contributing).*
