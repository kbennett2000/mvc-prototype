---
type: explanation
audience: editor
time: 5 minutes
---

# What happens when you click Save

**Who this is for:** Every editor on the team. Read this once and you'll understand the whole publishing flow.
**What you'll accomplish:** Understand exactly what the **Save** button does and what to do when "I saved but nothing happened."
**You'll need first:** Nothing — this is a good doc to read before you edit for the first time.

## The big picture

Here's the entire journey of a change, from you clicking **Save** to it appearing on the public site:

1. **You** click **Save** in the editor.
2. **The editor** commits your change directly to the church's website files on GitHub.
3. **The website** rebuilds itself with your edits.
4. **The new version** goes live for everyone to see.

The whole process usually takes 1–3 minutes from start to finish.

```
You click Save        Site rebuilds        Live!
       │                    │                │
       ▼                    ▼                ▼
   (instant)           (1–3 min)        (immediate)
```

## There is no review step

Changes go live automatically after the rebuild — there is no tech volunteer approval step. This means:

- **Changes are fast.** A new sermon or updated service time is live within minutes, no waiting.
- **Double-check before you save.** Since there's no safety net, it's worth scanning what you typed before clicking Save. If you make a mistake, just edit again and save the correction.

If you make a mistake that's already live, the fix is simple: open the same entry, correct it, and click Save again. The correction will be live within another 1–3 minutes.

## What "Save" actually does

Behind the scenes, here's what happens the moment you click **Save**:

1. The editor packages your changes as a **commit** — a snapshot of what you changed.
2. The commit goes to GitHub (the church's online filing cabinet).
3. Vercel (the hosting service) detects the commit and starts rebuilding the site.
4. The rebuilt site goes live on the CDN.

> **Tip:** "Commit," "CDN," "Vercel" — these are all technical words. You don't need to know them. The editor handles all of it for you. Just click Save.

## How long does it take?

| Step | Typical time |
| --- | --- |
| You click Save | Instant |
| Editor commits to GitHub | A few seconds |
| Vercel detects and starts rebuilding | A few seconds |
| Site finishes rebuilding | 1–3 minutes |
| Live on the public site | Immediately after rebuild |

## "I clicked Save but nothing changed on the site"

This is the most common confusion. Here are the possible reasons:

### 1. The site is still rebuilding

Wait a couple of minutes, then refresh the public page. The rebuild takes 1–3 minutes.

### 2. Your browser is showing a cached (old) version

Browsers remember old pages to load them faster. To force a fresh load:

- **Windows:** Press Ctrl+Shift+R.
- **Mac:** Press Cmd+Shift+R.

### 3. The save failed silently

Rare, but possible. Look at the entry in the CMS — if your changes aren't showing in the form, the save may not have gone through. Try saving again. If it keeps failing, contact your tech volunteer.

## "Can I undo a save?"

Yes — by making another save with the corrected content. Open the same entry, fix it, and click Save. The corrected version will be live within 1–3 minutes.

For a true rollback (like "everything I did today was wrong — restore yesterday's version"), ask your tech volunteer. They can revert to any previous state using GitHub's history. Nothing is ever permanently lost.

## What's next?

- [Add a sermon](./02-add-a-sermon.md) — the most common task you'll do every week.
- [Glossary](./glossary.md) — definitions of words like "commit," "rebuild," and "cache."

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- **Ask your church's tech volunteer.** They can sit next to you, share screens, or look over the problem with you. This is your fastest path to help.
- If you'd rather report something in writing: [open a GitHub issue](https://github.com/your-org/your-repo/issues) (this is the tech-volunteer route — your tech volunteer can help you do it if needed).

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Publishing%20Changes).*
