---
type: tutorial
audience: editor
time: 10 minutes
---

# Getting started with the church website editor

**Who this is for:** Church staff who need to update the website — pastors, secretaries, ministry leaders. No coding required.
**What you'll accomplish:** Log into the website editor for the first time and learn what each section is for.
**You'll need first:**
- A free Tina Cloud account (you'll create one in step 2 if you don't have one).
- A tech volunteer to invite you to the church's Tina Cloud project.
- The web address of your church's site, with `/admin/` on the end. For example, `https://yourchurch.org/admin/`.

> **Important:** Before your first login will work, the tech volunteer at your church has to invite your email address in Tina Cloud. If you skip this, you'll see an authorization error when you try to log in. See **Common Mistakes** at the bottom.

## What is this thing I'm logging into?

You're about to use the **CMS** (Content Management System — a fancy term for "the website's editing screen"). Everything you change here ends up on the public website after a tech volunteer reviews it. You'll never see code, type any commands, or break anything that can't be undone.

## Steps

### 1. Open the editor in your browser

**Type** your church's web address followed by `/admin/` into your browser's address bar.

For example: `https://yourchurch.org/admin/`

**Press** Enter.

You should now see a TinaCMS login screen with a button labeled **Sign in with Tina Cloud**.

![CMS login screen](/docs/screenshots/editor/getting-started-login.png)

### 2. Create a Tina Cloud account (skip if you already have one)

Tina Cloud is a free service that handles your editor login. You use it to authenticate with the website's CMS.

**Open** a new browser tab.

**Go to** [app.tina.io](https://app.tina.io).

**Click** **Sign up** and fill out the form with your email address (or sign in with GitHub if you prefer).

**Write down** the email address you used. You'll send it to your tech volunteer.

> **Tip:** Use your personal or work email — not a shared church inbox. Your Tina Cloud account is yours.

### 3. Ask the tech volunteer to invite you

**Email or text** your tech volunteer with the email address you used to sign up for Tina Cloud.

**Wait** for them to confirm they've added you. This usually takes a few minutes.

You'll receive an invitation email from Tina Cloud. **Click** the link in that email to accept the invitation.

> **Important:** You must accept the invitation before you can access the editor. Check your spam folder if you don't see it within a few minutes.

### 4. Sign in with Tina Cloud

**Go back** to the editor tab from step 1 (or reopen `https://yourchurch.org/admin/`).

**Click** the **Sign in with Tina Cloud** button.

**Enter** your Tina Cloud email and password (or use the GitHub login if that's how you signed up).

You should now be looking at the editor dashboard.

![CMS dashboard with collections sidebar](/docs/screenshots/editor/getting-started-dashboard.png)

### 5. Tour the dashboard

The dashboard is the main screen you'll see every time you log in.

On the **left sidebar** you'll see a list of **Collections** (categories of things you can edit):

- **Sermons** — every Sunday's message. You'll add a new entry here each week. See [Add a sermon](./02-add-a-sermon.md).
- **Announcements** — short bulletin-style notices on the homepage. See [Add an announcement](./09-add-an-announcement.md).
- **Ministries** — the church's ministries (Kids, Youth, Women's, and so on). Each has its own page.
- **Staff** — paid pastors and staff. See [Add a staff member](./04-add-a-staff-member.md).
- **Elders** — the church's elder board.
- **Site Settings** — church-wide information: name, address, phone, service times, social links. See [Update service times](./05-update-service-times.md).
- **Beliefs** — the doctrinal statements that appear on the Beliefs page.
- **Recurring Events** — the weekly and monthly events shown on the calendar. See [Add an event](./06-add-an-event.md).
- **Pages** — custom pages on the site. See [Edit a page](./03-edit-a-page.md).
- **Our Story** — the prose paragraph on the About page.

### 6. Click around (you can't break anything)

**Click** any collection in the left sidebar. **Click** any entry. **Look** at the form. **Click** your browser's Back button to leave without saving.

Until you click **Save**, nothing is committed. Explore freely.

## Common Mistakes

- **Authorization error after signing in.** The tech volunteer hasn't added your email address to the Tina Cloud project yet. Email them the address you used to sign up for Tina Cloud, wait for the invitation email, and accept it.
- **The Tina Cloud invitation expired.** Invitations expire after a few days. Ask the tech volunteer to resend it from the Tina Cloud dashboard.
- **The page at `/admin/` shows "404 Not Found".** Check that you typed the URL correctly — include the trailing slash. If still broken, contact your tech volunteer.
- **You log in but see no collections.** Your account was invited but the site may not have been redeployed after the CMS was configured. Ask your tech volunteer to check.

## What's next?

- [Add a sermon](./02-add-a-sermon.md) — the most common task you'll do every week.
- [Publishing changes](./08-publishing-changes.md) — understand what happens when you click **Publish**.

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- **Ask your church's tech volunteer.** They can sit next to you, share screens, or look over the problem with you. This is your fastest path to help.
- If you'd rather report something in writing: [open a GitHub issue](https://github.com/your-org/your-repo/issues) (this is the tech-volunteer route — your tech volunteer can help you do it if needed).

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Getting%20Started).*
