---
type: explanation
audience: developer
time: 15 minutes
---

# Decision log

**Who this is for:** Developers wanting to understand why each piece of the stack was chosen, and what tradeoffs were considered.
**What you'll accomplish:** Have enough context to challenge an existing decision (or accept it) without having to re-litigate the original discussion.
**You'll need first:** Familiarity with the stack. See [architecture.md](./architecture.md).

Each entry below is an Architecture Decision Record (ADR) in lightweight form: context, decision, alternatives, consequences.

---

## ADR-001: Next.js (App Router) as the framework

**Status:** Accepted

**Context:**
We need a framework that supports static-site generation (free hosting), modern React patterns, and good DX. The target user is a small church with little to no developer time — long-term simplicity matters more than cutting-edge features.

**Decision:**
Use **Next.js 16 with the App Router**, defaulting every page to static export.

**Alternatives considered:**
- **Astro** — excellent for content-heavy sites; partial-hydration "islands" model. Rejected because the React ecosystem familiarity matters more than Astro's edge over a small page count. Fewer prebuilt UI primitives for shadcn-style design systems.
- **Remix** — server-first React framework. Rejected because it assumes a long-running server; static export is less of a first-class concern. Hosting is more involved.
- **Eleventy / Hugo / Jekyll** — pure static generators. Rejected because they trade away React entirely — limits component reuse and forces template languages we don't want to teach.
- **Gatsby** — first popular React static generator. Rejected because it's effectively in maintenance mode now and feels stagnant compared to Next.

**Consequences:**
- Pro: Big ecosystem; lots of tutorials, easy hiring/finding contributors.
- Pro: Vercel (the makers of Next.js) is the primary host — first-class integration.
- Pro: RSC + static export = zero JS by default, great for performance.
- Con: Tied somewhat to Vercel's release pace; major version upgrades require care.
- Con: App Router is newer than Pages Router; some libraries still assume Pages.

---

## ADR-002: Decap CMS (over Strapi, Sanity, Contentful, others)

**Status:** Superseded by ADR-009

**Context:**
Initial CMS choice — see ADR-009 for the switch to TinaCMS and the reasons.

**Original decision:** Use Decap CMS (formerly Netlify CMS), git-based, with editorial workflow.

**Why it was superseded:** Netlify Identity (the free OAuth proxy Decap relied on) was deprecated, making auth setup significantly harder. TinaCMS had matured to the point where Tina Cloud handles auth cleanly without a self-hosted proxy, and its TypeScript-native config is a better fit for this codebase.

---

## ADR-009: TinaCMS (replacing Decap CMS)

**Status:** Accepted

**Context:**
Decap CMS was replaced in the first major overhaul of the CMS layer. The trigger was the deprecation of Netlify Identity, which had been the simplest auth option for Decap. Without it, setting up Decap's OAuth required deploying and maintaining a Cloudflare Worker or similar proxy — too much friction for a volunteer-maintained church site.

At the same time, TinaCMS had matured significantly: it is also git-based (content stays in the repo as plain files), its schema is defined in TypeScript (`tina/config.ts` — no separate YAML config), and Tina Cloud provides auth without requiring a self-hosted proxy.

**Decision:**
Replace Decap CMS with **TinaCMS**, configured via `tina/config.ts`, with Tina Cloud for authentication.

**Alternatives reconsidered:**
- **Decap without Netlify Identity** — requires a self-hosted OAuth proxy (Cloudflare Worker or similar). Viable but adds setup burden we wanted to avoid.
- **Sanity / Contentful** — hosted content, vendor lock-in. Disqualified on the same grounds as before.
- **Hand-edit Markdown via GitHub.com** — unfriendly for non-technical editors.

**Consequences:**
- Pro: Auth is handled by Tina Cloud — tech volunteer runs `tinacms build`, sets two env vars in Vercel, and invites editors from the Tina Cloud dashboard. No self-hosted proxy.
- Pro: CMS schema is TypeScript (`tina/config.ts`) — type-checked, co-located with the rest of the codebase, no YAML.
- Pro: Content remains plain Markdown/JSON files in the repo. Same git-native portability as Decap.
- Pro: `tinacms dev -c "next dev"` runs CMS + Next.js together in one command — simpler local dev.
- Con: Editors need a Tina Cloud account (free), not just a GitHub account. Slight onboarding difference.
- Con: Tina Cloud free tier has limits (check [tina.io/pricing](https://tina.io/pricing) — currently generous for small churches).
- Con: TinaCMS does not have a built-in PR-based editorial review step. Saves commit directly to the configured branch. If review is required, use branch protection on GitHub and set `GITHUB_BRANCH` to a non-main branch.

---

## ADR-003: Tailwind CSS (over CSS Modules, styled-components, vanilla CSS)

**Status:** Accepted

**Context:**
We need a styling approach that is fast to write, easy to read in components, theme-able by editing a single file, and produces minimal CSS.

**Decision:**
Use **Tailwind CSS 3.4** with a **semantic-token system**: components reference `bg-primary`, `text-foreground`, etc. — never `bg-amber-600`.

**Alternatives considered:**
- **CSS Modules** — one stylesheet per component. Rejected because the file proliferation and lack of co-location with JSX hurts iteration speed.
- **styled-components / Emotion** — CSS-in-JS. Rejected because of runtime cost (parser in production), incompatibility with RSC, and Vercel's recommendation to avoid runtime CSS-in-JS.
- **Vanilla CSS** — one global stylesheet. Rejected because scaling is painful with no scoping.
- **UnoCSS / Panda CSS** — newer atomic-CSS competitors. Promising but smaller communities. Tailwind's familiarity wins.

**Consequences:**
- Pro: Theme tokens defined once in `globals.css` cascade everywhere.
- Pro: No runtime CSS-in-JS overhead.
- Pro: Atomic classes mean very small CSS bundles after purge.
- Pro: Massive community, lots of recipes.
- Con: HTML/JSX gets verbose with long class strings. Use `cn()` helper to manage.
- Con: Discipline required — banning `bg-amber-600` etc. takes review attention. See [styling-and-theming.md](./styling-and-theming.md).

---

## ADR-004: TypeScript strict mode

**Status:** Accepted

**Context:**
We want type safety to prevent runtime errors in code that volunteers maintain. We also want low friction for new contributors.

**Decision:**
Enable **TypeScript strict mode** (`"strict": true` in `tsconfig.json`). No `any` without a comment explaining why.

**Alternatives considered:**
- **No TypeScript / plain JS** — rejected because content-loader functions are exactly the place type safety pays off.
- **TypeScript without strict mode** — rejected because half-typed code is worse than no types: false sense of security.
- **JSDoc types in JS files** — middle ground. Rejected because the toolchain (`.tsx` files for React) makes full TS lower-friction.

**Consequences:**
- Pro: Refactor confidence — changing a content type breaks compile, not runtime.
- Pro: Editor autocomplete is excellent.
- Con: Slightly steeper learning curve for contributors not fluent in TS.
- Con: Some libraries have weak or missing types — occasional `as` casts.

---

## ADR-005: JSON + Markdown for content (over MDX)

**Status:** Accepted

**Context:**
Content is mostly:
- Structured data (sermons, events, staff) — best as JSON or YAML.
- Long-form prose (our story, beliefs) — best as Markdown.

We considered MDX (Markdown with JSX) for richer content authoring.

**Decision:**
Use **plain Markdown with frontmatter** (via `gray-matter`) for narrative content and **JSON** for highly structured content.

**Alternatives considered:**
- **MDX** — allows JSX inside Markdown (e.g., embedding a `<CalloutCard>` component in a sermon description). Powerful, but:
  - Requires editors to know JSX or expect it to render correctly.
  - Neither Decap nor TinaCMS has first-class MDX support in the editing UI.
  - Increases build complexity (MDX compiler integration).
- **YAML for everything** — rejected because YAML's indentation rules are unforgiving for non-technical editors.
- **JSON-only** — rejected because long-form prose in JSON strings is unreadable in diffs.

**Consequences:**
- Pro: Editors writing prose use the WYSIWYG editor; output is clean Markdown anyone can read.
- Pro: Frontmatter + body is exactly what `gray-matter` handles efficiently.
- Pro: Content files are diffable in PRs.
- Con: No inline JSX in editorial content. If a callout is needed, it's a fixed component referenced by an editor's signal field (e.g., `callout: true`).
- Con: Some Markdown features (footnotes, callouts) require a markdown renderer with the right plugins.

---

## ADR-006: `gray-matter` for frontmatter parsing

**Status:** Accepted

**Context:**
We need to parse Markdown files with YAML frontmatter at build time.

**Decision:**
Use **`gray-matter`** — small, battle-tested, widely used.

**Alternatives considered:**
- **`@parcel/markdown-extract`** — bundled feature, not a standalone library. Doesn't fit a build-time loader pattern.
- **Custom parser** — too much code for a solved problem.
- **`front-matter`** — alternative but less popular and feature-rich.

**Consequences:**
- Pro: One small dep that does one thing well.
- Pro: Returns `{ data, content }` — easy mental model.
- Con: gray-matter parses YAML strictly. Editors who write malformed YAML get cryptic errors. Mitigated by TinaCMS shielding editors from raw YAML entirely.

---

## ADR-007: Editorial workflow (direct commit, not PR-based)

**Status:** Updated (originally PR-based with Decap; now direct-commit with TinaCMS)

**Context:**
Editors are non-technical. They may publish typos or wrong dates by accident. With Decap the editorial workflow was built in: every save became a PR. TinaCMS does not have this mode — saves commit directly to the configured branch.

**Decision:**
Accept TinaCMS's direct-commit model. The default branch is `main` (via `GITHUB_BRANCH` env var). Saves are live after the Vercel build completes (1–3 minutes).

**If a review step is needed:**
Set `GITHUB_BRANCH` (Vercel env var) to a non-main branch (e.g. `cms-drafts`). Configure a branch protection rule on GitHub that requires a PR to merge into `main`. Editors commit to `cms-drafts`; the tech volunteer opens and merges the PR. This is opt-in, not the default.

**Alternatives considered:**
- **Tina Cloud branching feature** — TinaCMS has an experimental branching UI. Not enabled here; adds complexity.
- **CI-only checks** — automated checks can catch broken Markdown but not "wrong service time."

**Consequences:**
- Pro: No review latency — changes go live as soon as Vercel builds.
- Pro: Simpler for editors — no Status dropdown, no Workflow tab, no waiting on a volunteer.
- Con: No built-in safety net. Mitigate by instructing editors to double-check before saving, and monitoring the live site after Sunday updates.
- Con: Tech volunteer no longer sees a consolidated view of what changed. Mitigate by watching the repo's commit feed on GitHub.

---

## ADR-008: Vercel hosting (over Netlify, Cloudflare Pages)

**Status:** Accepted

**Context:**
Static-site hosts compatible with Next.js:
- **Vercel** — built by Next.js team.
- **Netlify** — built by Decap CMS team (originally Netlify CMS).
- **Cloudflare Pages** — generous free tier, great CDN.
- **Self-host on a VPS** — most control but most operational burden.

**Decision:**
Use **Vercel** as the default host.

**Alternatives considered:**
- **Netlify** — free tier is solid. Decap CMS (formerly Netlify CMS) was once a draw here, but we've since moved to TinaCMS — the Netlify hosting advantage is no longer a deciding factor.
- **Cloudflare Pages** — slightly more limited Next.js feature support, especially around RSC and image optimization. Better as a "level up" choice for high traffic.
- **Self-host** — too much for a church without dedicated dev time.

**Consequences:**
- Pro: Best-in-class Next.js integration. New Next features work day one.
- Pro: Vercel's free tier ("Hobby") is enough for any small church.
- Pro: PR previews automatically deployed — tech volunteer can see exactly what an editor's PR looks like before merging.
- Con: Vercel is a venture-backed company; pricing/limits could change. Mitigation: the site is plain Next.js + static export, portable to any host.
- Con: Vercel is a venture-backed company; pricing/limits could change. Mitigation: the site is plain Next.js + static export, portable to any host.

---

## How to propose a new decision

If you want to challenge an existing ADR or add a new one:

1. **Open an issue** describing the context and your proposed decision.
2. **Discuss** with maintainers and other contributors.
3. **If accepted**, append a new ADR to this file (or amend an existing one with a "Superseded by ADR-XXX" note).

Status values used here: `Accepted`, `Superseded by ADR-XXX`, `Deprecated`, `Proposed`.

---

## What's next?

- [Architecture](./architecture.md) — how these decisions are realized in code.
- [Contributing](./contributing.md) — how to propose changes.

## Stuck?

- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Decision%20Log).*
