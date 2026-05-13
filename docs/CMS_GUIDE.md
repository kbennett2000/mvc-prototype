# Editing the website — a guide for everyone

This site uses **Decap CMS** — a free, web-based editor. You don't need to know HTML, GitHub, or any code. You just need a GitHub account (free) and a browser.

If something here is unclear, ask one of our tech-savvy volunteers — they can walk you through it. This guide assumes you've never used GitHub or any developer tool.

---

## What you can do here

You can:
- Add a new sermon every Sunday
- Update a staff member's bio or photo
- Change service times if they shift
- Add or edit a ministry page
- Update the church's address, phone, or social links
- Edit "Our Story" or "What We Believe"
- Add a new staff member or elder
- Mark an upcoming event for RSVP

You **cannot** (and don't need to):
- Touch the design, fonts, or colors
- Change how the menu is organized
- Edit any code

If you need one of those, ask a volunteer.

---

## Logging in

> Screenshot: ![Login screen](cms-screenshots/01-login.png)

1. Go to `https://[your-site]/admin/` in your browser.
2. Click **Login with GitHub**.
3. Sign in with your GitHub account. (Don't have one? Go to [github.com/signup](https://github.com/signup) — it takes two minutes and is free.)
4. The first time you log in, GitHub will ask you to authorize the church's site to use your account. Click **Authorize**.
5. You'll arrive at the editor dashboard.

> **One-time setup:** Before anyone can log in, a tech volunteer must add you as a collaborator on the church's GitHub repository. Email a volunteer with your GitHub username (e.g. "@yourname") and they'll handle it.

---

## The editor dashboard

> Screenshot: ![Dashboard with collections on the left](cms-screenshots/02-dashboard.png)

On the left you'll see **collections** — categories of things you can edit:

- **Sermons** — every Sunday's message
- **Ministries** — Kids, Youth, Women's, etc.
- **Staff** — pastors and paid staff
- **Elders** — the elder board
- **Site Settings** — church name, address, phone, service times
- **What We Believe** — doctrinal statements
- **Recurring Events** — calendar
- **Pages** — Our Story

Click any collection to see what's in it.

At the very top right is **Workflow** — that's where you'll see drafts you're still working on, items waiting for review, and items ready to publish.

---

## How to add a sermon (the most common task)

> Screenshot: ![New sermon form](cms-screenshots/03-new-sermon.png)

1. Click **Sermons** in the left sidebar.
2. Click the **New Sermon** button (top right).
3. Fill in the fields:
   - **Sermon Title** — what the pastor called it. e.g. "The Weight of a Quiet Faithfulness"
   - **Date Preached** — the Sunday it was preached. Use the date picker; don't type.
   - **Speaker** — who preached. Usually "Pastor John Smith"; sometimes a guest.
   - **Series** — what series this is part of. Type "Standalone Messages" for one-offs.
   - **Scripture Reference** — e.g. "Ruth 2:1-23"
   - **Book of the Bible** — just the book name. Used to let visitors filter by book. e.g. "Ruth", "Matthew", "Psalms".
   - **YouTube Video ID** — paste the ID from the URL. If the YouTube URL is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`. Just that part.
   - **Audio File URL** — link to the MP3. Leave as `#` if there isn't one yet.
   - **Sermon Notes (PDF)** — optional. Upload the PDF using the upload button. Pastor's outline.
   - **Thumbnail Image** — optional. A picture for the sermon card. If you skip this, the site uses a default sanctuary photo.
   - **Description** — one or two sentences. What the sermon was about.
4. Click **Save** at the top — your work is saved as a draft. You can come back later if you need to.
5. When you're done, click **Status: Draft** at the top and choose **Ready for Review**.
6. Click **Publish** → **Publish now**.

That's it. See "What happens after you click Publish" below.

---

## How to edit a ministry page (e.g. MVC Kids)

> Screenshot: ![Editing a ministry](cms-screenshots/04-edit-ministry.png)

1. Click **Ministries** in the left sidebar.
2. Click the ministry you want to edit (e.g. **MVC Kids**).
3. Edit any field. Everything has a hint underneath telling you what it's for.
4. To change the **leader's photo**, click the photo and select a new file from your computer. Square photos look best.
5. To add a new **meeting time**, scroll to "Meeting Times" and click **Add Meeting Times**.
6. To add a new **photo to the gallery**, scroll to "Photo Gallery" and click **Add Photos**.
7. Click **Save**, then **Status: Draft → Ready for Review → Publish**.

---

## How to update service times (or any church-wide setting)

> Screenshot: ![Site Settings](cms-screenshots/05-site-settings.png)

1. Click **Site Settings** in the left sidebar.
2. Click **Church Info & Site Copy**.
3. Scroll to **Sunday Service** and change the time, day, or after-service note.
4. Click **Save** → **Status: Ready for Review** → **Publish**.

The new service time will appear on the homepage hero, in the footer, on the Plan a Visit page, and everywhere else the time is shown — all automatically.

The same applies to phone number, address, email, social links, office hours, and the homepage headline.

---

## How to add a new staff member with a photo

> Screenshot: ![New staff member](cms-screenshots/06-new-staff.png)

1. Click **Staff** in the left sidebar.
2. Click **New Staff Member**.
3. Fill in:
   - **Full Name** — how they want their name shown. Include "Pastor" if applicable.
   - **Role / Title** — e.g. "Worship Director", "Office Manager"
   - **Email** — public email. Leave blank if they prefer to be contacted through the church office.
   - **Photo** — click the photo field, then **Upload**. Square photos work best — the site crops to a circle.
   - **Display Order** — `1` is first. The Senior Pastor is usually 1, the Associate Pastor 2, etc. Pick a number that puts them where they should appear.
   - **Bio** — 2-3 sentences. What someone meeting them on a Sunday would want to know.
4. Click **Save** → **Status: Ready for Review** → **Publish**.

To **remove** a staff member: open their entry and click **Delete entry** at the top right.

---

## What happens after you click "Publish"

This part is important — and it's good news. Nothing you do can break the website immediately.

Here's the exact sequence:

1. **You click Publish.**
2. **Decap creates a "pull request"** on the church's GitHub repository. (Don't worry about what a pull request is — think of it as a "change ticket" with a clear before-and-after of your edit.)
3. **A tech volunteer gets an email notification.** They open the change ticket, look at what you edited, and click **Merge** (an "approve" button).
4. **The site automatically rebuilds.** This takes 1-2 minutes.
5. **Your changes are live.** Refresh the website to see them.

If something looks wrong, the volunteer can decline the change and ask you to fix it — your edits are still in the editor, you can adjust and re-publish.

If you need something live faster (e.g. correcting a typo in the service time before Sunday), text the volunteer directly so they prioritize the review.

**Why the review step?** Two reasons. First: a typo in the service time, or a broken sermon link, would be embarrassing if it went live unnoticed. Second: it gives one technical person a single place to keep an eye on what's changing. The point isn't that you might break something — it's that two pairs of eyes are better than one.

---

## A few rules of thumb

- **Always click Save before you walk away.** Your work is preserved as a draft until you're ready to publish.
- **Optional fields are optional.** If you don't have a YouTube ID for a sermon yet, leave it blank — the sermon will still show up, just without the video player.
- **Don't change URL slugs after the fact.** The "URL Slug" field on ministries (e.g. `kids`) becomes part of the web address. Changing it after publishing breaks links people may have shared. Pick it once, leave it alone.
- **Photos look better square or 4:5.** Wide photos get cropped in unpredictable ways for staff portraits. For ministry hero images, use a wide shot.
- **If you're unsure, save as draft and ask.** Drafts don't show up on the public site. Saving them costs nothing.

---

## When something breaks

- **"I can't log in"** — Ask a volunteer to confirm your GitHub username is added as a collaborator.
- **"I uploaded a photo but it looks weird"** — Photos under 500 KB might be low-resolution. Try a higher-quality version.
- **"I clicked Publish but nothing changed on the site"** — The change is waiting for a volunteer to review. If it's urgent, text them.
- **"I made a mistake — can I undo?"** — If it hasn't been published, just edit again. If it has been published, edit the same item again to fix it, then publish the fix.
- **"I don't see a Publish button"** — You may have unsaved changes. Click Save first.

---

## For the tech volunteer setting this up

One-time setup (you only do this once, when first deploying the CMS):

1. **Create a GitHub OAuth App** for the church.
   - Go to [github.com/settings/applications/new](https://github.com/settings/applications/new)
   - Application name: "MVC Site Editor"
   - Homepage URL: your production site URL
   - Authorization callback URL: see the [Decap CMS OAuth docs](https://decapcms.org/docs/external-oauth-clients/) — you'll either use Netlify's hosted OAuth, a Cloudflare Worker, or another auth proxy.
2. **Update `/public/admin/config.yml`** — replace `your-org/your-repo` with the real GitHub repo path.
3. **Add the church's editors as collaborators** on the repo (Settings → Collaborators in GitHub).
4. **Test the editorial workflow** — log in as a test user, make a tiny edit, confirm a PR is created, merge it, confirm the site rebuilds.
5. **Set up notifications** — at minimum, watch the repo so you get email when a PR is opened.

Reading list:
- [Decap CMS GitHub backend setup](https://decapcms.org/docs/github-backend/)
- [Decap CMS editorial workflow](https://decapcms.org/docs/editorial-workflows/)
- [/docs/REFACTOR_FOR_TEMPLATE.md](REFACTOR_FOR_TEMPLATE.md) — what's still hardcoded in components vs. CMS-editable
