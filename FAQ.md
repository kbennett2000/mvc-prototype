# Frequently asked questions

Twenty questions a church staff member is most likely to ask, with short answers.

If you don't see your question here, check the [Glossary](GLOSSARY.md) or the audience-specific [troubleshooting docs](docs/README.md).

---

### 1. Is this really free?

Yes, with a small footnote.

- **The website code:** free (MIT license — keep it forever).
- **Hosting:** free on Vercel's hobby tier, which is plenty for a typical small church (thousands of visitors a day before you'd hit limits).
- **GitHub:** free for unlimited private repositories and collaborators.
- **The CMS (Decap):** free, open source.

You'll pay for: a domain name if you want `yourchurch.org` (typically $10–$15/year), and optionally Vercel's paid tier (~$20/mo per editor) if you want fancier analytics. Neither is required.

### 2. Do I need to know how to code?

If you're **editing** the site (sermons, events, etc.): no. You use the CMS in your browser. See [the editor guide](docs/for-editors/01-getting-started.md).

If you're **setting it up** for the first time: no, but you'll follow some technical steps. The [tech-volunteer guide](docs/for-tech-volunteers/01-overview.md) walks through every click.

If you're **customizing the design** beyond the built-in color palettes or adding new features: yes, you'll need someone comfortable with TypeScript and React. See the [developer guide](docs/for-developers/architecture.md).

### 3. Can I use my own domain (like `myrchurch.org`)?

Yes. After deploying to Vercel, you point your domain at Vercel using DNS records. [Step-by-step here](docs/for-tech-volunteers/07-connect-domain.md). Allow up to 48 hours for DNS to propagate, though it's usually faster.

### 4. How do I add a sermon?

In the CMS, click **Sermons** → **New Sermon**, fill in the form, click **Publish**. Full walkthrough: [Add a sermon](docs/for-editors/02-add-a-sermon.md).

### 5. Can I add a new ministry myself, or do I need a developer?

You can add one in the CMS. Click **Ministries** → **New Ministry** and fill in the form. The new ministry gets its own page automatically. You can also reorder, edit, or delete ministries the same way.

### 6. What happens when I click "Publish"?

Your edit doesn't go live immediately. Instead, it becomes a "change ticket" (technically: a pull request) that a tech volunteer reviews. They click **Merge** and the change goes live within 2-3 minutes. This safety step keeps typos out of the service time.

Detailed flow: [Publishing changes](docs/for-editors/08-publishing-changes.md).

### 7. How fast does my change appear on the live site?

Two parts:

- **Time until a volunteer can review:** depends on the volunteer. Usually within a few hours; longer on weekends.
- **Time from approval to live:** ~2 minutes (the site rebuilds itself automatically).

If you need something urgent (a Sunday service time correction), text the volunteer directly.

### 8. Who can edit the site?

Anyone the tech volunteer has invited to the GitHub repository as a collaborator. To add an editor, see [Grant editor access](docs/for-tech-volunteers/08-grant-editor-access.md).

There's no built-in role system — every collaborator can edit everything. For most small churches that's fine. If you need finer-grained roles, talk to a developer about extending the workflow.

### 9. Can I undo a change?

Yes. Two ways:

- **If you haven't published yet:** just edit again. Drafts don't show on the public site.
- **If you've already published:** open the same entry in the CMS, edit it back, and publish again. Every change has a full history (in GitHub) that a developer can roll back to if needed.

### 10. What if I break something?

Take a breath — the safety net catches most things:

- Editor mistakes: the volunteer review step catches typos and broken images before they go live.
- Bigger mistakes: every change has a complete history. A developer can roll back to any prior version.

In practice, the worst-case scenario is "the change goes live with a typo and we fix it 10 minutes later."

### 11. How do I add a new staff member?

In the CMS: **Staff** → **New Staff Member** → fill in name, role, email, photo, display order, and bio → publish. [Walkthrough](docs/for-editors/04-add-a-staff-member.md).

### 12. Can we change the colors? The fonts?

**Colors:** yes. The first-time setup includes 4 palette options. After that, your tech volunteer can edit the HSL values in `app/globals.css` to match your brand exactly. See [Customize branding](docs/for-tech-volunteers/05-customize-branding.md).

**Fonts:** yes, but it requires a developer. Fonts are loaded in `app/layout.tsx` via Google Fonts.

### 13. Is the site mobile-friendly?

Yes, designed mobile-first. ~70% of visitors to typical church sites are on phones, so this template is built to look great on a small screen first, then adapts up for desktops.

### 14. Do we need to back the site up?

GitHub IS the backup. Every change to your site is stored as a permanent snapshot on GitHub's servers. You can roll back to any prior state. Even if Vercel disappeared overnight, your site would still exist on GitHub and could be redeployed elsewhere in an hour.

If you want a paranoid-level backup, a developer can run `git clone` to download a full copy.

### 15. Can people contact us through the site? What about email?

The **Contact** page has a form for visitors to send messages. In the prototype, the form just logs to the browser console — no email is sent yet. To wire it up to send real emails, a developer can connect it to a service like Resend, SendGrid, or Formspree. (See [Adding a page](docs/for-developers/adding-a-page.md) for the form pattern.)

For now, the form is UI-only. Visitors needing to reach you should use the phone number and email shown at the top of the Contact page — both of which come from your CMS Site Settings.

### 16. How do I add a newsletter signup?

The homepage already has a newsletter signup section. Currently it logs submissions to the browser console (UI-only). To send real welcome emails and store subscribers, a developer can connect it to Mailchimp, Brevo, Buttondown, or similar.

### 17. What if our church changes its name? Service time? Address?

Editors update these in the **Site Settings** collection in the CMS. The new value appears everywhere on the site (homepage, footer, plan-a-visit page, etc.) without anyone touching code.

### 18. Can multiple people edit at the same time?

Yes. Each editor's draft lives on its own branch. The CMS handles the coordination. Conflicts are rare for small churches because people usually edit different things.

### 19. The prayer request wall on `/connect/prayer` shows real requests — that's a privacy issue, right?

Yes — and it's an important one. The current prayer wall shows anonymized example requests. In production, you have three options:

1. **Don't show the wall.** A developer can hide the section with a feature flag.
2. **Show only requests where the submitter explicitly opted into public sharing.** Add this to the form and filter.
3. **Curate manually.** Pastor team picks which requests to share, manually edits the wall content.

This is one of the most important decisions to make before launching. Talk to your pastoral team.

### 20. What if Vercel or GitHub goes away one day?

Your site is portable. GitHub stores your source code; Vercel runs the site. If either service shut down:

- Your **content** is safe — Markdown and JSON files in your GitHub repository, easy to move anywhere.
- Your **hosting** can move — Netlify, Cloudflare Pages, or any Next.js host could pick this up with minor configuration changes.

The architecture deliberately avoids lock-in: no proprietary database, no service-specific APIs. A developer could migrate your whole site in a couple of hours.

---

## Still didn't find your question?

- **Editors:** [editor troubleshooting](docs/for-editors/troubleshooting.md)
- **Tech volunteers:** [setup troubleshooting](docs/for-tech-volunteers/troubleshooting.md)
- **Developers:** open a [GitHub issue](https://github.com/your-org/your-repo/issues)

---

*Question we should add? [Suggest it here](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=FAQ:%20add%20question).*
