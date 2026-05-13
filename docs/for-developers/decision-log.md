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

**Status:** Accepted

**Context:**
We need a CMS that:
- Is free for small churches (no per-seat fees).
- Works for non-technical editors.
- Doesn't require a database or running server (operational burden).
- Doesn't lock content into a proprietary platform.

**Decision:**
Use **Decap CMS** (formerly Netlify CMS), git-based, with editorial workflow.

**Alternatives considered:**
- **Sanity** — beautiful editor, but free tier has user limits and hosted content is locked in their cloud. Vendor lock-in.
- **Contentful** — same vendor-lock concerns. Pricier than Sanity at scale.
- **Strapi** — self-hosted, requires running a database and server. Operational burden for a church.
- **TinaCMS** — git-based like Decap. Promising, but requires Tina Cloud for auth in production OR self-hosting a backend. Decap's OAuth proxy options are simpler.
- **Hand-edit Markdown via GitHub.com web UI** — viable but unfriendly. Editors won't tolerate looking at YAML frontmatter.
- **Forestry** — defunct (acquired by Tina).

**Consequences:**
- Pro: All content is plain files in the repo. Editors can see history, revert, etc. via GitHub.
- Pro: No database to backup, no server to keep up.
- Pro: Editorial workflow = automatic PR-based review.
- Con: Authentication setup requires either Netlify Identity (deprecating) or a self-hosted OAuth proxy. Adds tech-volunteer setup friction.
- Con: Decap's preview rendering can lag behind site rendering when content shapes change. Iterate carefully.
- Con: Active maintenance has been spotty since the Netlify → Decap rename. Worth monitoring.

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
  - Decap doesn't have first-class MDX support in its markdown widget.
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
- Con: gray-matter parses YAML strictly. Editors who write malformed YAML get cryptic errors. Mitigated by the Decap UI shielding editors from raw YAML.

---

## ADR-007: Editorial workflow (PR-based publishing, not auto-merge)

**Status:** Accepted

**Context:**
Editors are non-technical. They may publish typos or wrong dates by accident. We want a sanity-check step before live.

**Decision:**
Use Decap's **editorial workflow** mode: every editor change becomes a pull request that a tech volunteer manually reviews and merges.

**Alternatives considered:**
- **Auto-merge with notifications** — faster for editors, but no failure mode for typos.
- **Branch protection without editorial workflow** — Decap doesn't support this cleanly — editors would face Git mechanics directly.
- **CI-only checks (no human review)** — automated checks can catch broken Markdown but not "wrong service time".

**Consequences:**
- Pro: One person (the tech volunteer) sees everything that changes. Cheap insurance against mistakes.
- Pro: Full version history in PR comments and merge messages.
- Con: Latency — changes wait for the volunteer (typically same-day, sometimes longer).
- Con: Volunteer has a recurring task (approving PRs). See [for-tech-volunteers/09-maintenance.md](../for-tech-volunteers/09-maintenance.md).

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
- **Netlify** — strong fit since Decap was originally Netlify CMS. Free tier is solid. The Netlify Identity feature (free OAuth proxy for Decap) was a big plus, but **Netlify Identity is being deprecated** — that key advantage is going away.
- **Cloudflare Pages** — slightly more limited Next.js feature support, especially around RSC and image optimization. Better as a "level up" choice for high traffic.
- **Self-host** — too much for a church without dedicated dev time.

**Consequences:**
- Pro: Best-in-class Next.js integration. New Next features work day one.
- Pro: Vercel's free tier ("Hobby") is enough for any small church.
- Pro: PR previews automatically deployed — tech volunteer can see exactly what an editor's PR looks like before merging.
- Con: Vercel is a venture-backed company; pricing/limits could change. Mitigation: the site is plain Next.js + static export, portable to any host.
- Con: Editors changing OAuth proxy choice (since Netlify Identity is dying) means tech volunteers have to set up their own — added friction in [grant-editor-access.md](../for-tech-volunteers/08-grant-editor-access.md).

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
