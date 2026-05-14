# Majestic View Church 

> A modern, mobile-first website for small churches. Editors update content in their browser — no developer required. Free to host. Open source.

**Live demo:** [https://your-deployed-site.vercel.app](https://your-deployed-site.vercel.app) _(replace once deployed)_

---

## Pick your path

<table>
<tr>
<td width="33%" align="center">

### 📝 I just want to edit content

For church staff who keep the site updated — sermons, events, staff bios, service times.

**[→ Start the editor guide](docs/for-editors/01-getting-started.md)**

</td>
<td width="33%" align="center">

### 🛠️ I'm setting this up for my church

For the one semi-technical person at the church doing initial setup and deployment.

**[→ Start the setup guide](docs/for-tech-volunteers/01-overview.md)**

</td>
<td width="33%" align="center">

### 💻 I'm a developer

For developers forking this to customize, extend, or contribute back.

**[→ Start the developer guide](docs/for-developers/architecture.md)**

</td>
</tr>
</table>

---

## What it looks like

**The site itself:**

![Homepage screenshot — hero with church exterior, service time, "Plan Your Visit" CTA](docs/screenshots/marketing/homepage.png)

**The editor (TinaCMS):**

![CMS dashboard with collections in left sidebar](docs/screenshots/marketing/cms-dashboard.png)

---

## Everyday commands

| Command | When to use it |
| --- | --- |
| `npm run setup` | First time, or when you want to change the church name, address, colors. |
| `npm run start` | Run the site on your computer to preview changes. |
| `npm run cms` | Start the site **with** local CMS editing enabled. Use this instead of `npm run start` when you want to edit content locally. |
| `npm run deploy` | Step-by-step walkthrough to put your site on the internet. |
| `npm run doctor` | Something's broken? This tells you what. |

> Don't have Node.js installed? See [Easiest path: use Codespaces](docs/for-tech-volunteers/03-fork-and-clone.md) — runs in your browser, no install.

---

## More

- [Documentation map](docs/README.md) — every doc, one-line description
- [FAQ](FAQ.md) — 20 questions church staff ask most
- [Glossary](GLOSSARY.md) — plain-English definitions of CMS, repository, deploy, etc.
- [License](#license)
- [Contributing](docs/for-developers/contributing.md)
- [Code of conduct](CODE_OF_CONDUCT.md)

---

## License

MIT. See [LICENSE](LICENSE).

## Credits

This codebase started as a prototype redesign for [Majestic View Church](https://mvckiowa.com/) in Kiowa, Colorado, and was generalized into a starter any small church can use. The default seed data is MVC's; running `npm run setup` swaps it for yours.
