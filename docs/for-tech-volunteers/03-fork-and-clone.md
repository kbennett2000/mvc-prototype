---
type: how-to
audience: tech-volunteer
time: 10 minutes
---

# Fork and clone the template

**Who this is for:** Tech volunteers ready to make their own copy of the template repository.
**What you'll accomplish:** Have your own GitHub copy of the template, open and ready to customize — either in Codespaces (browser) or on your computer.
**You'll need first:**
- A free GitHub account ([github.com/signup](https://github.com/signup)).
- (Path B only) Node.js and Git installed. See [Prerequisites](./02-prerequisites.md).

---

## What "fork" means

A **fork** is GitHub's word for "make my own copy of someone else's repository." You'll fork the template once. From then on, your fork is your church's website — you customize it, deploy it, and grow it independently.

---

## Steps

### 1. Sign in to GitHub

**Open** [github.com](https://github.com) in your browser.

**Sign in** (or create an account if you don't have one).

### 2. Find the template repository

**Open** the template repository page. The URL looks like `https://github.com/your-org/your-repo` (replace with the actual template URL when published).

### 3. Click Fork

**Click** the **Fork** button at the top right of the repository page.

![GitHub Fork button](/docs/screenshots/tech-volunteer/fork-and-clone-fork-button.png)

A dialog opens asking where to put the fork.

### 4. Pick the owner and a name

**Owner:** Leave it as your personal GitHub account, or pick a GitHub Organization if the church has one.

**Repository name:** Change it to something like `church-site` or `our-church-website`. Keep it short and lowercase.

**Description (optional):** Type a one-liner like "Our church website."

**Leave** the **Copy the main branch only** checkbox checked.

**Click** the green **Create fork** button.

You should now be looking at your own copy of the repository at `https://github.com/your-username/church-site` (or whatever name you picked).

![GitHub forked repository](/docs/screenshots/tech-volunteer/fork-and-clone-forked-repo.png)

---

## Now pick a path

### Path A (recommended): Open in Codespaces

Codespaces runs the project in your browser. No install needed.

#### 1. Click the Code button

On your forked repository page, **click** the green **Code** button.

A dropdown opens with two tabs: **Local** and **Codespaces**.

#### 2. Switch to the Codespaces tab

**Click** the **Codespaces** tab inside the dropdown.

![Codespaces tab in Code dropdown](/docs/screenshots/tech-volunteer/fork-and-clone-codespaces-tab.png)

#### 3. Create a codespace

**Click** the **Create codespace on main** button.

A new browser tab opens with a loading screen. After about 60 seconds, you'll see a full code editor in your browser with a terminal at the bottom.

You should now see a welcome message in the terminal:

```
Welcome! Run npm run setup on first use, or npm run start to see the site.
```

If the welcome message doesn't show, **click** in the terminal area at the bottom of the screen.

You're done with this doc. Go to [First-time setup](./04-first-time-setup.md).

> **Tip:** When you close the browser tab, the codespace pauses (but isn't deleted). Come back anytime by going to your repository page → **Code** → **Codespaces** → click the existing codespace name. Codespaces auto-delete after 30 days of inactivity, but you can keep them indefinitely by visiting them periodically.

---

### Path B: Clone to your computer

Use this path if you've installed Node.js and Git locally.

#### 1. Click the Code button

On your forked repository page, **click** the green **Code** button.

**Stay** on the **Local** tab.

**Click** the small **copy** icon next to the HTTPS URL. The URL looks like `https://github.com/your-username/church-site.git`.

![Copy HTTPS URL](/docs/screenshots/tech-volunteer/fork-and-clone-copy-url.png)

#### 2. Open a terminal

- **Windows:** Press the Windows key, type `cmd`, press Enter.
- **Mac:** Press Cmd+Space, type `Terminal`, press Enter.
- **Linux:** Open your terminal app.

#### 3. Navigate to where you want the project

By default, your terminal starts in your home folder. To put the project on your desktop:

```
cd Desktop
```

(Or pick any folder — `Documents`, `Projects`, wherever you keep code.)

#### 4. Clone the repository

**Type** this command, replacing the URL with the one you copied:

```
git clone https://github.com/your-username/church-site.git
```

**Press** Enter.

You should now see output like:

```
Cloning into 'church-site'...
remote: Enumerating objects: 1234, done.
...
Receiving objects: 100% (1234/1234), 5.6 MiB | 4.2 MiB/s, done.
```

When it finishes, a new folder named `church-site` (or whatever you called it) appears in the location you `cd`'d into.

#### 5. Enter the project folder

```
cd church-site
```

You're now inside the project. Every command in the rest of these docs assumes you're in this folder.

#### 6. (Optional) Open in VS Code

If you installed VS Code:

```
code .
```

The `.` means "open the current folder." VS Code launches with the project ready to edit.

---

## Common Mistakes

- **The Fork button isn't visible.** You're probably not signed in to GitHub. **Click** **Sign in** at the top right.
- **Codespaces says "you've used all your hours."** Check your usage at [github.com/settings/billing](https://github.com/settings/billing). Codespaces gives 60 hours/month free — if you've blown through it, you can either wait until the next month or pay for more.
- **`git clone` says "Permission denied (publickey)."** You copied an SSH URL instead of HTTPS. Go back to GitHub, click **Code**, make sure the dropdown is set to **HTTPS**, copy that URL.
- **`git clone` worked, but `cd church-site` says "No such file or directory."** Either the clone didn't finish (scroll up in the terminal to see if there were errors), or you're typing the folder name with the wrong case. **Type** `ls` to see what's actually there.

---

## What's next?

- [First-time setup](./04-first-time-setup.md) — run `npm run setup` to configure the site.

## Stuck?

- [Troubleshooting](./troubleshooting.md) — common problems and fixes.
- Open an issue: [GitHub Issues](https://github.com/your-org/your-repo/issues)

---
*Was this helpful? [Tell us how to improve this doc](https://github.com/your-org/your-repo/issues/new?template=docs-feedback.md&title=Feedback:%20Fork%20and%20Clone).*
