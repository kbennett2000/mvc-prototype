---
type: explanation
audience: tech-volunteer
time: 5 minutes
---

# Overview: what you're about to do

**Who this is for:** The semi-technical person at the church who's setting up this website for the first time.
**What you'll accomplish:** Understand the whole process from start to finish so you know what's coming.
**You'll need first:** Nothing — this is a good starting point.

---

## What this template is

This is a complete website starter for small churches. It includes:

- A modern, fast website (powered by Next.js).
- A built-in editor (Decap CMS) so the church secretary, pastor's spouse, or other non-technical people can update sermons, staff, service times, and so on — all in their browser, no code.
- A free hosting setup (Vercel) that costs nothing for most small-church traffic.

You'll set it up once. After that, the church editors do everything themselves through the browser editor. You'll only get involved monthly to approve their changes and apply software updates.

---

## The whole journey, in order

Here's what you'll do, in roughly this order. Total time: **30-60 minutes** the first time through.

| Step | What you do | Time | Doc |
| --- | --- | --- | --- |
| 1 | Install Node.js and Git (or use Codespaces, no install) | 5-15 min | [Prerequisites](./02-prerequisites.md) |
| 2 | Fork the template repository to your GitHub account | 2 min | [Fork and clone](./03-fork-and-clone.md) |
| 3 | Run the first-time setup script (church name, address, colors) | 5 min | [First-time setup](./04-first-time-setup.md) |
| 4 | Customize branding — logo, colors, fonts | 10-20 min | [Customize branding](./05-customize-branding.md) |
| 5 | Deploy to Vercel | 10 min | [Deploy to Vercel](./06-deploy-to-vercel.md) |
| 6 | Connect your custom domain (optional) | 10 min | [Connect domain](./07-connect-domain.md) |
| 7 | Invite editors and set up CMS authentication | 10 min | [Grant editor access](./08-grant-editor-access.md) |
| 8 | Routine maintenance (monthly) | 10 min/month | [Maintenance](./09-maintenance.md) |

> **Tip:** If anything goes wrong along the way, [troubleshooting](./troubleshooting.md) has fixes for the common issues.

---

## What you're actually building

When you're done, you'll have:

- **A live website** at a `*.vercel.app` URL (free) — and at your own domain like `yourchurch.org` if you set that up.
- **A CMS editor** at `https://yourchurch.org/admin/` where editors log in with GitHub.
- **A GitHub repository** that stores all the website's content. Every change is tracked in history.
- **Automatic rebuilds** — every time an editor publishes a change (and you approve it), the site rebuilds and goes live within a couple of minutes.

The church owns all of it. No vendor lock-in. If you ever want to move hosts, you can.

---

## Why each step exists (in plain English)

If you're the kind of person who wants to understand before you start clicking — here's the "why" for each step.

**Install Node.js and Git** — Node.js is the engine that builds and previews the site on your computer. Git is the version-control tool that talks to GitHub. **Or** you can skip both by using GitHub Codespaces, which runs everything in your browser.

**Fork the repository** — You copy the template to your own GitHub account so you can customize it. Forking is GitHub's word for "make my own copy."

**Run the setup script** — A friendly prompt that asks for the church's name, address, service time, and color scheme. It writes those into the right files so you don't have to.

**Customize branding** — Upload the church's logo, fine-tune colors, pick fonts. The setup script gives you four palettes; this step lets you go beyond those.

**Deploy to Vercel** — Vercel reads your GitHub repository, builds the site, and makes it accessible on the internet. Free for small-church traffic. The site rebuilds automatically every time content changes.

**Connect your domain** — Point `yourchurch.org` at Vercel by adding two DNS records at your domain registrar (the place you bought the domain).

**Grant editor access** — Invite the editors to the GitHub repository as collaborators, and set up the Decap authentication so they can log in with their GitHub account.

**Maintenance** — Every month or so, you'll review pending changes from editors, accept routine dependency updates, and check that nothing's broken.

---

## What you need at your church

Before you start, make sure you have:

- **A computer** (Mac, Windows, or Linux). Or just a browser if you use Codespaces.
- **A GitHub account** (free — sign up at [github.com](https://github.com)).
- **The church's branding** — logo file, preferred colors, fonts (optional).
- **The basic church info** — name, address, phone, email, Sunday service time, social links.
- **A way to access the church's domain** — username and password at GoDaddy, Namecheap, Cloudflare, or wherever the domain is registered. (Optional — you can launch on a `*.vercel.app` URL first and add the domain later.)

---

## What you don't need

- **A credit card** — everything in this guide is free.
- **A database** — there isn't one. All content is stored as files in GitHub.
- **A server** — Vercel runs it for you.
- **Programming experience** — you'll be running a few commands and clicking buttons. The tutorials walk through each one.

---

## What happens after launch

Once everything's set up, here's the routine:

- **Editors** log into the CMS at `/admin/` and edit content in their browser.
- **You** get an email every time an editor publishes a change. You click a button to approve it. The site rebuilds automatically.
- **Once a month or so**, you'll check for software updates and apply them.

Total time per month, after launch: **about 10-15 minutes** of clicking through change approvals, plus 10 minutes of running updates.

---

## What's next?

- [Prerequisites](./02-prerequisites.md) — install Node.js and Git, or skip to Codespaces.

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Overview).*
