---
type: how-to
audience: tech-volunteer
time: 20 minutes
---

# Grant editor access

**Who this is for:** Tech volunteers ready to invite the church's editors (secretary, pastor's spouse, etc.) so they can update the site through `/admin/`.
**What you'll accomplish:** Editors can sign in to TinaCMS with their Tina Cloud account, make changes, and see them go live automatically.
**You'll need first:**
- Site deployed to Vercel. See [Deploy to Vercel](./06-deploy-to-vercel.md).
- Domain working (or the `*.vercel.app` URL ready to use). See [Connect a domain](./07-connect-domain.md).
- The email addresses of every editor you want to invite.
- About 20 minutes.

---

## How TinaCMS authentication works

TinaCMS uses **Tina Cloud** for authentication. Editors log in with a Tina Cloud account (email or GitHub) rather than directly via GitHub. You manage who has access from the Tina Cloud dashboard.

The site itself needs two environment variables set in Vercel so the CMS can connect to your GitHub repository:

- `NEXT_PUBLIC_TINA_CLIENT_ID` — identifies your project to Tina Cloud.
- `TINA_TOKEN` — a read-only content token (used at build time to fetch content).

---

## Steps

### 1. Create a Tina Cloud account

**Go to** [app.tina.io](https://app.tina.io) in your browser.

**Click** **Sign up** (free).

Sign up with your GitHub account or an email address. Either works.

### 2. Create a new Tina Cloud project

Once you're logged in:

**Click** **New project**.

**Connect** it to the church's GitHub repository when prompted. You'll need to authorize Tina Cloud to access the repo.

> **Tip:** Tina Cloud needs read and write access to the repo so it can commit content changes when editors save.

**Give** the project a name — something like "MVC Website" or your church's name.

### 3. Copy the Client ID

After creating the project, you'll see a **Project Settings** page with a **Client ID** (a long string like `a1b2c3d4-...`).

**Copy** the Client ID. You'll need it in step 5.

### 4. Generate a read-only content token

In the same Project Settings page:

**Click** **Tokens**.

**Click** **New token**.

**Name** it something like "Vercel build" and set the scope to **Read only**.

**Copy** the token value. **Save it somewhere safe** — you won't be able to see it again.

### 5. Add the env vars to Vercel

**Open** your Vercel project dashboard.

**Click** **Settings** → **Environment Variables**.

Add both variables:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | The Client ID from step 3 |
| `TINA_TOKEN` | The token from step 4 |

Set both to apply to **Production**, **Preview**, and **Development** environments.

**Click** **Save** for each one.

### 6. Redeploy the site

Vercel needs to rebuild with the new env vars.

**Click** **Deployments** in your Vercel project.

**Click** the three-dot menu on the most recent deployment → **Redeploy**.

Wait 1–3 minutes for the build to complete.

### 7. Verify the CMS loads

**Open** `https://yourchurch.org/admin/` (or your `*.vercel.app` URL).

You should see a TinaCMS login screen.

**Click** **Sign in with Tina Cloud**.

Log in with the same account you used in step 1. You should arrive at the CMS dashboard showing your collections (Sermons, Announcements, Staff, etc.).

If you see an error, see [troubleshooting](./troubleshooting.md).

### 8. Invite your editors

Back in the **Tina Cloud** dashboard ([app.tina.io](https://app.tina.io)):

**Click** your project → **Team**.

**Click** **Invite member**.

**Enter** the editor's email address.

**Select** the role **Editor** (not Owner — editors don't need to manage project settings).

**Click** **Send invite**.

The editor will receive an email from Tina Cloud. They need to create a free Tina Cloud account (or log in if they have one) and accept the invitation.

**Repeat** for each editor.

### 9. Walk an editor through their first login

Once they've accepted:

1. **Go to** `https://yourchurch.org/admin/`.
2. **Click** **Sign in with Tina Cloud** and log in.
3. **Tour** the sidebar — what each collection is.
4. **Add a test sermon** together to demonstrate the save flow.

Point them at the [editor track docs](../for-editors/01-getting-started.md).

### 10. What happens when an editor saves

When an editor clicks **Save** in the CMS:

1. TinaCMS commits the changed file directly to the `main` branch of your GitHub repository.
2. GitHub fires a webhook to Vercel.
3. Vercel rebuilds the site (1–3 minutes).
4. The change is live.

There is no PR review step — saves go live after the Vercel build. If your church needs a review step before changes go live, see the note in [ADR-007](../for-developers/decision-log.md#adr-007-editorial-workflow-direct-commit-not-pr-based).

---

## What's running where (mental model)

```
Editor's browser ── login ──► /admin/ (TinaCMS)
                                  │
                                  │  (authenticated via Tina Cloud)
                                  ▼
                              GitHub repo (direct commit to main)
                                  │
                                  │  (Vercel webhook)
                                  ▼
                              Vercel builds
                                  │
                                  ▼
                            yourchurch.org (live site)
```

---

## Common mistakes

- **"Not authorized" after logging in.** The editor's Tina Cloud account hasn't been added to the project. Go to app.tina.io → your project → Team and invite them.
- **CMS login screen never appears at `/admin/`.** The env vars aren't set, or the last Vercel deployment was before you added them. Redeploy (step 6).
- **Editor sees the CMS but can't save.** The Tina Cloud project may not have write access to the GitHub repo. Go to app.tina.io → project settings and re-authorize the GitHub connection.
- **Build fails after adding env vars.** Check that `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are spelled exactly right (case-sensitive).

---

## What's next?

- [Maintenance](./09-maintenance.md) — your monthly and quarterly tasks.

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- [TinaCMS self-hosted auth docs](https://tina.io/docs/self-hosted/overview/) — if you need to run auth without Tina Cloud.
- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Grant%20Editor%20Access).*
