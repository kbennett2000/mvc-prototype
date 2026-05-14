---
type: tutorial
audience: developer
time: 25 minutes
---

# Adding a CMS collection

**Who this is for:** Developers adding a new editable content type (e.g. "Blog posts") that editors will manage through TinaCMS.
**What you'll accomplish:** A new collection in the CMS sidebar, backed by Markdown files in `/content/`, with a TypeScript loader that pages can consume.
**You'll need first:**
- Project running locally.
- Familiarity with the content model. See [content-model.md](./content-model.md).

We'll walk through adding a **Blog posts** collection.

---

## The four-step pattern

For every new collection:

1. **Decide the schema** — what fields does each entry have?
2. **Create** the content folder + a seed file.
3. **Define** the TypeScript type in `lib/<type>.ts` and the loader in `content/<type>.ts`.
4. **Add** the collection to `tina/config.ts`.

Then test in the CMS and consume on a page.

> **Important:** Loaders go in `content/`, not `lib/`. `lib/` holds only the type definition. The split exists so dev-mode hot-reload works correctly when editors save in the CMS — see [architecture.md](./architecture.md#loader-pattern) for the rationale. Always export loaders as **functions** (`getBlogPosts()`), never top-level `const`.

---

## Steps

### 1. Decide the schema

Write down the fields and which are required. For a blog post:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| title | string | Yes | Headline |
| date | datetime | Yes | Publish date |
| author | string | Yes | Author's name |
| excerpt | string (textarea) | Yes | Short summary for the index page |
| cover | image | No | Optional hero image |
| body | rich-text | Yes | The post body (Markdown) |

### 2. Create the content folder

```
mkdir content/blog
```

Add a seed file `content/blog/2026-01-20-welcome-to-our-blog.md`:

```markdown
---
title: "Welcome to our blog"
date: "2026-01-20T00:00:00.000Z"
author: "Pastor John Smith"
excerpt: "A new way to share what's happening in the life of the church."
cover: "/images/uploads/blog-welcome.jpg"
---

Welcome to our brand new blog! We'll use this space to share...
```

> **Tip:** A seed file matters. Without one, the loader returns an empty array and the page may render confusingly during development.

> **Date format:** TinaCMS writes `datetime` fields as ISO 8601 strings (`2026-01-20T00:00:00.000Z`). Your TypeScript type should treat the field as `string` and slice the first 10 characters (`date.slice(0, 10)`) when you need just the date.

### 3. Create the TypeScript type and loader

Type in `lib/blog.ts`:

```ts
export type BlogPost = {
  slug: string;
  title: string;
  date: string;      // ISO 8601 from TinaCMS; slice(0,10) for display
  author: string;
  excerpt: string;
  cover?: string;
  body: string;
};
```

Loader in `content/blog.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        excerpt: data.excerpt,
        cover: data.cover,
        body: content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}
```

> **Tip:** This is the same template as `content/sermons.ts`, `content/ministries.ts`, etc. Copy from whichever existing loader most resembles the new content shape, then rename fields. Always export functions (not top-level `const`) so CMS edits hot-reload in dev.

### 4. Add the collection to tina/config.ts

Open `tina/config.ts`. Inside the `defineConfig({ schema: { collections: [...] } })` array, add the new collection at the end:

```ts
      // ── Blog Posts ─────────────────────────────────────────────────
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date
                ? String(values.date).slice(0, 10)
                : "undated";
              const title = slugify(String(values.title || "untitled"));
              return `${date}-${title}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            required: true,
            isTitle: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date Published",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "cover",
            label: "Cover Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Body",
            isBody: true,
          },
        ],
      },
```

**Save** the file. The top-level `slugify` helper is already defined in `tina/config.ts` — use it as shown.

> **Important:** TypeScript will type-check the config. If you mistype a field `type`, the build will fail with a clear error.

### 5. Field type reference

| TinaCMS type | When to use | Notes |
| --- | --- | --- |
| `string` | Single-line text | Add `ui: { component: "textarea" }` for multi-line |
| `datetime` | Dates | Stored as ISO 8601 string |
| `number` | Numeric input | Integer or float |
| `boolean` | Yes/no toggle | Stored as `true`/`false` |
| `image` | Image upload | Returns a path string |
| `rich-text` | Markdown body | Use `isBody: true` to map to the file's Markdown body |
| `object` | Grouped fields | Add `list: true` to make it a repeatable list |
| `string` with `options` | Dropdown / select | `options: ["weekly", "monthly"]` |

Full reference: [tina.io/docs/reference/types](https://tina.io/docs/reference/types/).

### 6. Configure the filename pattern

The `ui.filename.slugify` function controls what the filename looks like. The project uses a shared `slugify` helper defined at the top of `tina/config.ts`. Common patterns:

| Pattern | Result |
| --- | --- |
| `slugify(values.title)` | Title-only slug (`welcome-to-our-blog.md`) |
| `${date}-${title}` | Date-prefixed (`2026-01-20-welcome-to-our-blog.md`) |
| `slugify(values.name)` | Name-based (for people entries like staff, elders) |

For dated content (sermons, blog posts, announcements), prefer the date-prefixed pattern — files sort chronologically on disk.

### 7. Restart and test locally

Stop any running dev server and restart with:

```
npm run cms
```

This starts both TinaCMS and Next.js together. Open [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html) — the new **Blog Posts** collection should appear in the left sidebar.

Click **New Blog Post**, fill in the fields, click **Save**. The file should appear in `content/blog/`. No login required in local mode.

> **Local vs production:** In local dev, TinaCMS writes directly to your filesystem with no authentication. In production (deployed to Vercel), it authenticates via Tina Cloud. See [08-grant-editor-access.md](../for-tech-volunteers/08-grant-editor-access.md).

### 8. Render on a page

Now that the data exists, build a page to render it. See [Adding a page](./adding-a-page.md) for the route side — Flavor B walks through the index + single-entry pattern that fits a blog perfectly.

Quick example for the index:

```tsx
// app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts } from "@/content/blog";

export default function BlogIndex() {
  const posts = getBlogPosts();
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl">Blog</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="font-serif text-2xl">{post.title}</h2>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {post.date.slice(0, 10)} • {post.author}
            </p>
            <p className="mt-3 text-foreground">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 9. Build to validate

```
npm run build
```

The build runs `tinacms build` (regenerates `tina/__generated__/`) then `next build`. If TypeScript complains about a missing field, you forgot to handle an optional field in the loader or type.

---

## Patterns from existing collections

| Pattern | Used by | Notes |
| --- | --- | --- |
| Single document (`match: { include: "..." }`) | `story`, `site`, `beliefs`, `events` | One file, no create/delete |
| Per-entry Markdown files | `sermons`, `ministries`, `staff`, `elders`, `announcements` | Most common |
| Date-prefixed slugs | `sermons`, `announcements` | Files sort chronologically |
| `object` with `list: true` | `ministries.meetings`, `events.events` | Repeatable nested objects |
| `string` with `options` | `events.rule.kind` | Dropdown of fixed choices |
| `isTitle: true` | Every collection | Marks the field TinaCMS uses as the entry title in the list |
| `isBody: true` | `rich-text` body field | Maps to the Markdown body below the frontmatter |

---

## Common mistakes

- **Collection doesn't appear in the CMS.** Most likely a TypeScript error in `tina/config.ts`. Run `npm run cms` and look at the terminal output for a compile error.
- **Editor saves but the file doesn't appear.** Check the `path:` value matches a real folder relative to the project root.
- **TypeScript build fails after adding a collection.** You added the field in `tina/config.ts` but didn't update the loader/type. Update both sides.
- **`isBody: true` is missing on the `rich-text` field.** Without it, TinaCMS writes the body as a frontmatter field (`body: "..."`) instead of the Markdown body below the `---`. The loader (using `gray-matter`) expects the body in `content`, not `data`.
- **Dates display as ISO strings.** TinaCMS stores `datetime` as `2026-01-20T00:00:00.000Z`. Slice the first 10 characters for display: `date.slice(0, 10)`.

---

## What's next?

- [Adding a page](./adding-a-page.md) — render the new collection on a route.
- [Content model](./content-model.md) — reference for the existing types.

## Stuck?

- [TinaCMS docs](https://tina.io/docs/) — canonical reference.
- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Adding%20a%20CMS%20Collection).*
