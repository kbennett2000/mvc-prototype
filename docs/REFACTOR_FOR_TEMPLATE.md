# Refactor for template readiness

This codebase is being built as a working prototype for Majestic View Church, with the long-term intent of being open-sourced as a starter for other churches. This document tracks where the code complies with the six template-readiness principles and where it doesn't — so the cleanup can be done in deliberate passes rather than one big overhaul.

The six principles:

1. **Single source of truth** for church-specific data
2. **Content as data**, not as JSX
3. **Imagery referenced by path**, not bundler-imported
4. **Tailwind theme tokens**, not hex codes
5. **Feature flags** for optional sections
6. **No church-specific copy** in component files

---

## Done in this pass

**TinaCMS integration** (migrated from Decap CMS) — major reshape of `/content/`:

- All church data moved from TypeScript constants to CMS-editable formats:
  - **JSON files** (static-imported, bundleable for client): [content/site.json](../content/site.json) (church facts + hero copy), [content/beliefs.json](../content/beliefs.json), [content/events.json](../content/events.json)
  - **Markdown folders** (parsed via gray-matter at build): [content/staff/](../content/staff), [content/elders/](../content/elders), [content/ministries/](../content/ministries), [content/sermons/](../content/sermons)
- `/lib/*.ts` files reduced to type-only definitions (data lives in `/content/`).
- `/lib/church-info.ts` now loads church data from `content/site.json`, keeping only the `nav` structure and derived fields (mapsUrl, phoneHref) in code.
- TinaCMS configured at [tina/config.ts](../tina/config.ts) with collections for sermons, announcements, ministries, staff, elders, small groups, serve roles, pages, prayer requests, site settings, beliefs, events, navigation, and our story.
- Editor-facing guide at [docs/CMS_GUIDE.md](CMS_GUIDE.md).

**Earlier pass:**
- Created [content/site.ts](../content/site.ts) (now a thin loader over `site.json`).
- Audited the codebase for hex codes and non-theme Tailwind color utilities. **None found.** Principle 4 is fully satisfied.

---

## Principle 1 — Single source of truth

✓ **Compliant.** Every piece of church-specific data is now in `/content/`. `lib/church-info.ts` contains only the loader (reading `content/site.json` + computing derived fields like `mapsUrl`, `phoneHref`) and the `nav` structure (site IA, not church data). All data is editable via TinaCMS (`tina/config.ts`) or by editing files in `/content/` directly.

---

## Principle 2 / Principle 6 — Content as data, no church-specific copy in components

This is the largest remaining surface. Headlines, intros, FAQs, and prose are still embedded as JSX. None of it is incorrect for MVC — but another church adopting this template would have to edit `.tsx` files to change any of it.

### Component-level (homepage sections)

- [ ] [components/sections/new-here.tsx](../components/sections/new-here.tsx) — three card titles and descriptions; the eyebrow "New here?" and the lead paragraph
- [ ] [components/sections/newsletter.tsx](../components/sections/newsletter.tsx) — heading, subhead, success message
- [ ] [components/sections/beliefs-teaser.tsx](../components/sections/beliefs-teaser.tsx) — body copy, including the "lived out in a small town" framing (explicitly church-identity)
- [ ] [components/sections/this-week.tsx](../components/sections/this-week.tsx) — section heading and link label
- [ ] [components/sections/latest-sermon.tsx](../components/sections/latest-sermon.tsx) — "Featured · This past Sunday" eyebrow, the "Start here." heading
- [ ] [components/sections/ministries-grid.tsx](../components/sections/ministries-grid.tsx) — section heading and intro
- [ ] [components/sections/hero.tsx](../components/sections/hero.tsx) — CTA button labels ("Plan Your Visit", "Get Directions") and the "coffee & fellowship after" sub-text

### Page-level

- [ ] [app/about/page.tsx](../app/about/page.tsx) — the "Our Story" prose is JSX paragraphs. It's a duplicate of [content/story.md](../content/story.md). Should read from the markdown source (requires a markdown loader — see "Suggested architecture" below).
- [ ] [app/visit/page.tsx](../app/visit/page.tsx) — timeline, basics cards, kids section, finding-us copy, form intro
- [ ] [app/give/page.tsx](../app/give/page.tsx) — methods cards, all 6 FAQ Q&A pairs, the financial-accountability footer
- [ ] [app/connect/page.tsx](../app/connect/page.tsx) — hub card descriptions
- [ ] [app/connect/prayer/page.tsx](../app/connect/prayer/page.tsx) — hero, sidebar, "How requests are handled" copy
- [ ] [app/connect/groups/page.tsx](../app/connect/groups/page.tsx) — hero, three value-prop cards
- [ ] [app/connect/serve/page.tsx](../app/connect/serve/page.tsx) — hero, three reassurance cards
- [ ] [app/connect/contact/page.tsx](../app/connect/contact/page.tsx) — hero, sidebar
- [ ] [app/beliefs/page.tsx](../app/beliefs/page.tsx) — intro paragraph
- [ ] [app/ministries/page.tsx](../app/ministries/page.tsx) — hero and intro
- [ ] [app/calendar/page.tsx](../app/calendar/page.tsx) — hero and intro

### Suggested approach

Introduce `content/pages/<route>.ts` per page, each exporting a typed object with the page's editorial copy. Pages import from those.

For the about-page story specifically, add a markdown loader (e.g. `gray-matter` + `remark` or `next-mdx-remote`) so [content/story.md](../content/story.md) becomes the actual source — that's the strongest version of principle #2.

---

## Principle 3 — Imagery referenced by path

✓ **Audited, clean.** Every image reference is a string path (`/images/imported/...` or remote URL passed to `next/image`). Nothing is bundler-imported. Another church can drop replacement files into `/public/images/imported/` with the same filenames and the site swaps automatically.

---

## Principle 4 — Tailwind theme tokens, not hex codes

✓ **Audited, clean.** Components use semantic tokens (`bg-primary`, `text-accent`, `bg-muted`, `border-border`, `text-foreground`, etc.). Hex codes appear only in:

- [app/globals.css](../app/globals.css) — the token *definitions* themselves, which is the correct location.
- [docs/design.md](design.md) — documentation describing the palette options.
- [tailwind.config.ts](../tailwind.config.ts) — token mappings to CSS variables.

A church changes their brand by editing [app/globals.css](../app/globals.css) (CSS variables) — no component changes required.

---

## Principle 5 — Feature flags

Not yet built. Several pages and sections should be toggleable per-church.

- [ ] Create `config/features.ts`:

  ```ts
  export const features = {
    onlineGiving: true,    // app/give online widget + CTA
    textToGive: true,      // app/give text-to-give card
    liveStream: true,      // /watch livestream callout
    prayerWall: true,      // app/connect/prayer public wall
    newsletter: true,      // homepage newsletter section + connect dropdown
    smallGroups: true,     // app/connect/groups + nav
    serve: true,           // app/connect/serve + nav
    calendar: true,        // app/calendar + nav
    sermonsArchive: true,  // app/watch archive (always show featured)
    rsvps: true,           // event RSVP form inside calendar modal
  };
  ```

- [ ] Gate the following at the page/component level:
  - [app/give/page.tsx](../app/give/page.tsx) — wrap online-giving and text-to-give cards
  - [app/connect/prayer/page.tsx](../app/connect/prayer/page.tsx) — wrap the prayer wall section (form always available)
  - [app/connect/page.tsx](../app/connect/page.tsx) — filter hub cards by feature
  - [components/sections/newsletter.tsx](../components/sections/newsletter.tsx) — render only if `features.newsletter`
  - [app/watch/page.tsx](../app/watch/page.tsx) — livestream / podcast subscribe section
  - [components/sections/event-modal.tsx](../components/sections/event-modal.tsx) — wrap RSVP form
  - [lib/church-info.ts](../lib/church-info.ts) — filter `nav` children to drop disabled features
  - [components/site-footer.tsx](../components/site-footer.tsx) — filter `secondaryLinks` accordingly

---

## Suggested target architecture (when ready to open-source)

```
/config
  site.ts          identity facts (name, address, phone, social, hours) — moved from lib/
  features.ts      feature toggles
  theme.ts         optional: palette tokens (or keep in tailwind.config.ts)

/content
  site.ts          cross-cutting editorial copy (footer line, taglines)
  pages/
    home.ts        homepage section copy
    about.ts       about page copy
    visit.ts       visit page copy
    give.ts        give page copy + FAQ
    connect.ts     connect hub + sub-page copy
    calendar.ts    calendar page copy
    watch.ts       watch page copy
    beliefs.ts     beliefs page intro

  beliefs.ts       doctrinal statements (exists)
  staff.ts         staff directory (exists)
  elders.ts        elders directory (exists)
  events.ts        recurring events (exists)
  ministries.ts    ministry data (exists)
  ministries/      per-ministry markdown (exists)
  story.md         our-story prose (exists)
  sermons.ts       sermon data (placeholder for now)
  prayer-wall.ts   prayer wall samples (exists)
  groups.ts        small groups (exists)
  serve-roles.ts   volunteer roles (exists)
```

The promise of the template: a church adopting it edits `/config/*` once, iterates on `/content/*` over time, and never touches `.tsx` files to change words, photos, or feature toggles.
