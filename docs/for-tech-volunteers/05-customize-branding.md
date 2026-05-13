---
type: how-to
audience: tech-volunteer
time: 20 minutes
---

# Customize branding

**Who this is for:** Tech volunteers ready to replace the placeholder logo and fine-tune colors and fonts.
**What you'll accomplish:** Have the church's actual logo, exact brand colors, and chosen typography on the site.
**You'll need first:**
- Setup complete. See [First-time setup](./04-first-time-setup.md).
- The church's logo as an image file (PNG or SVG, ideally with a transparent background).
- (Optional) Hex codes or names for the church's official brand colors.

---

## Steps

### 1. Replace the placeholder logo

The setup script generated a basic logo using the church's initials and dropped it at `public/logo.svg`. To replace it with the real one:

#### 1a. Prepare the logo file

You need a square logo, ideally:

- **PNG** with a transparent background, OR
- **SVG** (better — scales perfectly to any size).
- At least 400 × 400 pixels.

If your logo is a different shape (wide rectangle, etc.), make a square version by adding transparent padding around it. Any image editor will do — [Photopea](https://www.photopea.com/) is a free browser-based option.

#### 1b. Drop the file in `public/`

Save the new logo as `public/logo.svg` (or `public/logo.png`) — replacing the file the setup script generated.

In Codespaces or VS Code, you can drag-and-drop the file from your desktop into the `public/` folder in the file tree.

#### 1c. If you used a different filename, update the reference

If you named the file something other than `logo.svg`, **open** `components/site-header.tsx` (or wherever the logo is referenced) and update the `src=` path.

> **Tip:** The simplest path is to use the same filename (`logo.svg`) so you don't need to edit any code.

#### 1d. Verify

Run `npm run start` and **open** [http://localhost:3000](http://localhost:3000). The header should now show your real logo.

---

### 2. Fine-tune colors beyond the four setup palettes

The four palettes are starting points. To match your church's exact brand colors, edit the CSS variables in `app/globals.css`.

#### 2a. Understand the color system

The site uses **semantic color tokens** — names like `primary`, `accent`, and `background` instead of specific hex codes. This means a color change in one place flows automatically to every component that uses it.

The variables are HSL values (Hue, Saturation, Lightness). Each line in `globals.css` looks like:

```css
--primary: 120 14% 32%;
--accent: 15 55% 47%;
--background: 38 30% 96%;
```

The three numbers are:
- **Hue** (0-360): the color on the rainbow. 0 = red, 60 = yellow, 120 = green, 180 = cyan, 240 = blue, 300 = magenta.
- **Saturation** (0-100%): how vivid. 0% = grey, 100% = pure.
- **Lightness** (0-100%): how light. 0% = black, 50% = pure, 100% = white.

#### 2b. Pick your HSL values

Use a color picker that gives HSL output:

- [hslpicker.com](https://hslpicker.com/) — drag, get HSL.
- [coolors.co](https://coolors.co/) — generate a full palette.
- Most design tools (Figma, Photoshop) can switch between RGB and HSL.

For each color you want to change, write down the three HSL values.

#### 2c. Open `app/globals.css`

The file looks like this (excerpt):

```css
@layer base {
  :root {
    --background: 38 30% 96%;     /* page background */
    --foreground: 30 12% 15%;     /* main text color */

    --primary: 120 14% 32%;       /* main brand color — buttons, links */
    --primary-foreground: 38 30% 96%;  /* text on primary backgrounds */

    --accent: 15 55% 47%;         /* highlight color — CTAs, badges */
    --accent-foreground: 38 30% 96%;   /* text on accent backgrounds */

    --secondary: 36 24% 90%;      /* subtle background — cards, sections */
    --muted: 36 24% 90%;          /* even subtler background */
    --border: 35 20% 84%;         /* thin lines and borders */

    --ring: 120 14% 32%;          /* focus outline — usually matches primary */

    --radius: 0.625rem;           /* corner roundness */
  }
}
```

#### 2d. Edit the values you want to change

For example, to change the primary color to a deep navy:

```css
--primary: 215 60% 25%;       /* deep navy */
--primary-foreground: 0 0% 100%;  /* white text on navy */
--ring: 215 60% 25%;          /* match primary */
```

**Save** the file.

#### 2e. Preview

Run `npm run start` (or refresh the dev server if it's running). Buttons, links, and accent areas immediately reflect the new color.

> **Tip:** Always update both the color AND its `-foreground` partner. The `-foreground` is the text color shown on top of that color — it needs enough contrast to read.

> **Warning:** Don't put hex codes (`#ff0000`) directly into `globals.css`. Stick with HSL triplets — that's what the rest of the site expects. If you've only got a hex code, convert it to HSL at [hslpicker.com](https://hslpicker.com/).

---

### 3. Change fonts

By default, the site uses:

- **Inter** — modern sans-serif, used for body text and UI.
- **Fraunces** — friendly serif, used for headings (h1, h2, h3, h4).

Both load from [Google Fonts](https://fonts.google.com/) via Next.js.

#### 3a. Pick new fonts

Browse [fonts.google.com](https://fonts.google.com/) and pick:
- One **sans-serif** for body (recommended: Inter, Source Sans, Roboto, DM Sans, Nunito).
- One **serif** for headings (recommended: Fraunces, Lora, Merriweather, Source Serif, EB Garamond).

Or use the same font for both — that's fine too.

#### 3b. Open `app/layout.tsx`

Near the top of the file, you'll find the font imports. They look like this:

```ts
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});
```

#### 3c. Replace with the new font names

For example, swapping Fraunces for Lora:

```ts
import { Inter, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});
```

You also need to update where the font is applied (in the `<html>` className further down the file):

```tsx
<html lang="en" className={`${inter.variable} ${lora.variable}`}>
```

**Save** the file.

#### 3d. Preview

Run `npm run start` and refresh — the new font should appear on headings.

---

### 4. Update favicon (the little icon in browser tabs)

The favicon lives at `app/favicon.ico`. To replace it:

#### 4a. Convert your logo to an ICO file

Use a free converter like [favicon.io](https://favicon.io/) — upload your logo, download the ICO file.

#### 4b. Replace `app/favicon.ico`

Drag the new file into `app/`, overwriting the existing favicon.

#### 4c. Hard-refresh to see the change

Browsers cache favicons aggressively. **Press** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) to see the new icon.

---

## What you've changed

After all this, you'll have edited:

- `public/logo.svg` (or `.png`) — the church's real logo.
- `app/globals.css` — color tokens for the church's brand.
- `app/layout.tsx` — font imports if you changed fonts.
- `app/favicon.ico` — the browser-tab icon.

These are the only files that drive site-wide branding. Everything else is content (editable through the CMS) or layout (which you generally shouldn't need to touch).

---

## Common Mistakes

- **Colors look right in code but didn't change on the site.** The dev server may need to restart. Stop it with Ctrl+C and run `npm run start` again. Then hard-refresh the browser (Ctrl+Shift+R).
- **The new logo looks pixelated.** Use a higher-resolution PNG (400×400+) or, ideally, an SVG. SVG scales to any size without losing quality.
- **Text is unreadable on the primary color (white on light-yellow, etc.).** Your `-foreground` value doesn't have enough contrast against the background color. Use [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) to verify a 4.5:1 contrast ratio.
- **Hex codes in CSS don't work.** The site uses HSL triplets without `hsl()` wrappers — Tailwind composes them automatically. Convert hex to HSL.

---

## What's next?

- [Deploy to Vercel](./06-deploy-to-vercel.md) — put the site on the internet.

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Customize%20Branding).*
