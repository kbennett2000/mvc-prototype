# Editing the website — a guide for everyone

This site uses **TinaCMS** — a free, web-based editor. You don't need to know HTML, GitHub, or any code. You just need a free Tina Cloud account and a browser.

If something here is unclear, ask one of our tech-savvy volunteers — they can walk you through it. This guide assumes you've never used a CMS or any developer tool.

> **Tech volunteer testing locally?** Run `npm run cms` to start TinaCMS and Next.js together on your computer. Open [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html). In local mode no login is required — edits write straight to your local `/content/` folder. In production deployments the CMS authenticates via Tina Cloud as described below.

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
- Post a bulletin announcement

You **cannot** (and don't need to):
- Touch the design, fonts, or colors
- Change how the menu is organized
- Edit any code

If you need one of those, ask a volunteer.

---

## Logging in

1. Go to `https://[your-site]/admin/` in your browser.
2. Click **Sign in with Tina Cloud**.
3. Sign in with your Tina Cloud account. (Don't have one? Go to [app.tina.io](https://app.tina.io) — it takes two minutes and is free.)
4. You'll arrive at the editor dashboard.

> **One-time setup:** Before anyone can log in for the first time, a tech volunteer must invite you from the Tina Cloud project dashboard. Email a volunteer with the email address you used to sign up for Tina Cloud, and they'll send you an invitation.

---

## The editor dashboard

On the left you'll see **collections** — categories of things you can edit:

- **Sermons** — every Sunday's message
- **Announcements** — short bulletin-style notices on the homepage
- **Ministries** — Kids, Youth, Women's, etc.
- **Small Groups** — connect-group listings
- **Serve Roles** — volunteer opportunity listings
- **Staff** — pastors and paid staff
- **Elders** — the elder board
- **Pages** — custom pages
- **Prayer Requests** — prayer wall submissions
- **Our Story** — prose on the About page
- **Site Settings** — church name, address, phone, service times, social links
- **Beliefs** — doctrinal statements
- **Recurring Events** — calendar
- **Navigation** — site menu links

Click any collection to see what's in it.

---

## How to add a sermon (the most common task)

1. Click **Sermons** in the left sidebar.
2. Click the **New Sermon** button (top right).
3. Fill in the fields:
   - **Title** — what the pastor called it. e.g. "The Weight of a Quiet Faithfulness"
   - **Date** — the Sunday it was preached. Use the date picker; don't type.
   - **Speaker** — who preached. Usually "Pastor John Smith"; sometimes a guest.
   - **Series** — what series this is part of. Type "Standalone Messages" for one-offs.
   - **Scripture** — e.g. "Ruth 2:1-23"
   - **Book** — just the book name. Used to let visitors filter by book. e.g. "Ruth", "Matthew", "Psalms".
   - **YouTube ID** — paste the ID from the URL. If the YouTube URL is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`. Just that part.
   - **Audio URL** — link to the MP3. Leave blank if there isn't one yet.
   - **Notes URL** — link to a sermon notes PDF. Leave blank if there isn't one.
   - **Thumbnail** — optional photo for the sermon card.
   - **Notes** (body) — one or two sentences. What the sermon was about.
4. Click **Save** at the top. The change commits to GitHub and the site rebuilds (1–3 minutes).

---

## How to edit a ministry page (e.g. MVC Kids)

1. Click **Ministries** in the left sidebar.
2. Click the ministry you want to edit (e.g. **MVC Kids**).
3. Edit any field. Everything has a label telling you what it's for.
4. To change the **banner image**, click the image field and select a new file from your computer.
5. To add a new **meeting time**, scroll to "Meeting Times" and click **Add item**.
6. Click **Save**.

---

## How to update service times (or any church-wide setting)

1. Click **Site Settings** in the left sidebar.
2. Click **site** (the single site settings document).
3. Scroll to **Services** under Church Info.
4. Update the time, day, or note.
5. Click **Save**.

The new service time will appear on the homepage hero, in the footer, on the Plan a Visit page, and everywhere else the time is shown — all automatically after the site rebuilds.

The same applies to phone number, address, email, social links, and the homepage headline.

---

## How to add a new staff member with a photo

1. Click **Staff** in the left sidebar.
2. Click **New Staff**.
3. Fill in:
   - **Name** — how they want their name shown. Include "Pastor" if applicable.
   - **Role** — e.g. "Worship Director", "Office Manager"
   - **Email** — public email. Leave blank if they prefer to be contacted through the church office.
   - **Photo** — click the image field, then select or upload a file. Square photos work best — the site crops to a circle.
   - **Display Order** — `1` is first. The Senior Pastor is usually 1, the Associate Pastor 2, etc.
   - **Bio** — 2-3 sentences. What someone meeting them on a Sunday would want to know.
4. Click **Save**.

To **remove** a staff member: open their entry and click **Delete** (if available) or ask a tech volunteer.

---

## What happens after you click Save

Here's the exact sequence:

1. **You click Save.**
2. **TinaCMS commits your change** to the church's GitHub repository.
3. **Vercel detects the commit** and rebuilds the site.
4. **Your changes are live** — typically 1–3 minutes after you save.

There is no review step. Saves go live after the build completes. If you make a mistake, just edit the same item again and save the correction.

---

## A few rules of thumb

- **Optional fields are optional.** If you don't have a YouTube ID for a sermon yet, leave it blank — the sermon will still show up, just without the video player.
- **Don't change URL slugs after the fact.** The "Slug" field on ministries (e.g. `kids`) becomes part of the web address. Changing it after publishing breaks links people may have shared. Pick it once, leave it alone.
- **Photos look better square or 4:5.** Wide photos get cropped in unpredictable ways for staff portraits. For ministry banner images, use a wide shot.
- **If you're unsure, make the change on a quiet day** (not Saturday night before Sunday). Changes go live automatically — check the live site after saving.

---

## When something breaks

- **"I can't log in"** — Ask a volunteer to confirm your email is added as a collaborator in Tina Cloud.
- **"I uploaded a photo but it looks weird"** — Photos under 500 KB might be low-resolution. Try a higher-quality version.
- **"I saved but nothing changed on the site"** — The site may still be rebuilding. Wait 1–3 minutes and refresh. If it's still not there after 5 minutes, ask a tech volunteer to check the Vercel build log.
- **"I made a mistake"** — Edit the same item again and save the correction. Everything is in git history; nothing is permanently lost.

---

## For the tech volunteer setting this up

One-time setup (you only do this once, when first deploying the CMS):

1. **Create a Tina Cloud project** at [app.tina.io](https://app.tina.io) and connect it to the church's GitHub repository.
2. **Add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`** as environment variables in your Vercel project settings.
3. **Redeploy** on Vercel so the build picks up the new env vars.
4. **Invite editors** from the Tina Cloud project → Team tab.
5. **Test the CMS login** at `https://yourchurch.org/admin/`.

Full step-by-step: [docs/for-tech-volunteers/08-grant-editor-access.md](for-tech-volunteers/08-grant-editor-access.md)

Reading list:
- [TinaCMS Tina Cloud setup](https://tina.io/docs/tina-cloud/overview/)
- [TinaCMS schema reference](https://tina.io/docs/reference/schema/)
- [docs/REFACTOR_FOR_TEMPLATE.md](REFACTOR_FOR_TEMPLATE.md) — what's still hardcoded in components vs. CMS-editable
