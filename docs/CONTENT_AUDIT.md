# Content audit — mvckiowa.com import

**Imported:** 2026-05-13.
**Source pages fetched:** 15 of 15 (all returned content; no 404s, no redirects encountered).
**Raw extractions:** `content/source/<slug>.md` (one per URL).
**Structured output:** `content/staff.ts`, `content/elders.ts`, `content/beliefs.ts`, `content/events.ts`, `content/story.md`, `content/ministries/*.md`.
**Images:** 65 downloaded into `public/images/imported/`.

## Imported successfully

| URL | Slug | What was extracted | Landed in |
|---|---|---|---|
| https://mvckiowa.com/ | `home` | Doctrinal statement, service times, recurring events, 10 image URLs | `content/source/home.md` · `content/beliefs.ts` |
| https://mvckiowa.com/about/our-story/ | `our-story` | Church identity / Scripture stance / facility rename | `content/source/our-story.md` · `content/story.md` |
| https://mvckiowa.com/team/ | `team` | 4 elders, 5 staff, 12+ ministry leaders, 1 facility lead — all with bios; no emails listed on source | `content/source/team.md` · `content/staff.ts` · `content/elders.ts` |
| https://mvckiowa.com/plan-a-visit/ | `plan-a-visit` | Service times, parking, address | `content/source/plan-a-visit.md` |
| https://mvckiowa.com/contact/ | `contact` | Address, phone, email, office hours | `content/source/contact.md` |
| https://mvckiowa.com/on-our-knees/ | `on-our-knees` | Prayer-initiative history; meeting schedule | `content/source/on-our-knees.md` |
| https://mvckiowa.com/mvc-kids/ | `mvc-kids` | Sunday programs, Awana, Story Hour, VBS dates | `content/source/mvc-kids.md` · `content/ministries/kids.md` |
| https://mvckiowa.com/mvc-youth/ | `mvc-youth` | The View, AWANA TREK/Journey | `content/source/mvc-youth.md` · `content/ministries/youth.md` |
| https://mvckiowa.com/young-adults/ | `young-adults` | Monday 6:30 PM gathering in The Study | `content/source/young-adults.md` · `content/ministries/young-adults.md` |
| https://mvckiowa.com/mvc-adults/ | `mvc-adults` | Women's Ministry content (mapped to `women` on prototype side) | `content/source/mvc-adults.md` · `content/ministries/women.md` |
| https://mvckiowa.com/men/ | `men` | Men of Valor, MVC Men's Breakfast | `content/source/men.md` · `content/ministries/men.md` |
| https://mvckiowa.com/about/our-mission/ | `our-mission` | Missions ministry overview (mapped to `missions` on prototype side) | `content/source/our-mission.md` · `content/ministries/missions.md` |
| https://mvckiowa.com/overcomers/ | `overcomers` | Overcomers Outreach description | `content/source/overcomers.md` · `content/ministries/overcomers.md` |
| https://mvckiowa.com/calendar/ | `calendar` | 10 recurring events with day/time/location | `content/source/calendar.md` · `content/events.ts` |
| https://mvckiowa.com/donations/ | `donations` | Online giving via Church Center, PO Box, methods | `content/source/donations.md` |

### Slug mapping from source URL to prototype side
The prototype's ministry slugs do not all match the source URLs. Mapping documented in the markdown frontmatter and reproduced here:

| Source URL | Prototype slug | File |
|---|---|---|
| `/mvc-kids/` | `kids` | `content/ministries/kids.md` |
| `/mvc-youth/` | `youth` | `content/ministries/youth.md` |
| `/young-adults/` | `young-adults` | `content/ministries/young-adults.md` |
| `/mvc-adults/` | `women` | `content/ministries/women.md` (source is entirely women's-ministry content) |
| `/men/` | `men` | `content/ministries/men.md` |
| `/overcomers/` | `overcomers` | `content/ministries/overcomers.md` |
| `/about/our-mission/` | `missions` | `content/ministries/missions.md` (source is the church-supported-missions page, not a "mission statement") |

### Output file shapes match prototype lib types

- `content/staff.ts` re-exports the `StaffMember` type from `lib/staff.ts`.
- `content/elders.ts` re-exports the `Elder` type from `lib/elders.ts`.
- `content/beliefs.ts` re-exports the `Belief` type from `lib/beliefs.ts`.
- `content/events.ts` re-exports the `RecurringEvent` type from `lib/calendar-data.ts` and uses the existing `RecurrenceRule` union (`weekly`, `nth-of-month`, `last-of-month`) without inventing new variants.

No files in `lib/` were modified.

---

## Missing or unclear (TODO before launch)

These are items the source site **did not contain**, and which the church will need to provide. They are NOT invented in the imported content — fields are left as empty strings or `TODO` markers.

### Staff & leaders
- [ ] **No email addresses anywhere on /team/** for any elder, pastor, staff member, or ministry leader. Need to collect for: John Smith, Brian Janes, Jim Keen, Howie Whitcomb, Joseph Tartaglia, Jonathan Darnell, Matthew Smith, Brenda Kelly, Kristin Babcock, Sharon Egan (we DO have egancasa@gmail.com — but it's a personal Gmail, confirm preferred public address), Brooke Tartaglia, Shane & Briana Kelly, Colin & Kaitlyn Kelly, Denise Vandas, Jaron & Jessica Kelly, Matt Parenti, Pastor Brian Janes.
- [ ] **Howie Whitcomb has no occupation listed** on /team/ (other elders have implicit ones). Optional fill.
- [ ] **Kurt Goldyn** is named as part of the Men's Ministry leadership team but is "not pictured" and has no bio.
- [ ] **Greg Egan, Kent Hayne, Tom Braun, Brandon McElroy** — listed as Men's Ministry leadership but no individual bios.
- [ ] **Julie Seeley** — Women's Ministry leadership team, no individual bio.

### Ministry pages
- [ ] **MVC Kids /mvc-kids/** — no leader's name on the page itself; only church-office contact. Confirm Denise Vandas (Children's Ministry Director) and/or Jonathan Darnell (Children & Youth Pastor) are the right point(s) of contact for this page, with a direct email.
- [ ] **MVC Youth /mvc-youth/** — same gap; confirm Jonathan Darnell is the contact and provide an email.
- [ ] **Young Adults /young-adults/** — no leader named on the page; per /team/, Shane and Briana Kelly are Young Adult Directors. Confirm.
- [ ] **Women's Ministry conflict** — /mvc-adults/ says BSF meets Tuesdays starting Sept 15, 2026; /calendar/ says Thursdays. Which is correct?
- [ ] **Sewing class** dates given as "April 24 & May 14" with no year. Confirm year (likely 2026).
- [ ] **Men's Ministry conflict** — /men/ says "Last Sunday 7:00 AM" for MVC Men's Breakfast; /calendar/ says "4th Sunday 6:45 AM". Verify both day-of-month rule and time.
- [ ] **Overcomers conflict** — /overcomers/ page describes Sunday 9:00 AM gatherings; /calendar/ and homepage list Monday 6:30 PM. Are these two separate gatherings, or is one stale?
- [ ] **Overcomers location** — /calendar/ says "Large Trailer". Confirm this is the current location, and whether the room has a real name to use.
- [ ] **Missions /about/our-mission/** — no specific missionary roster captured in this pass. The source page contains "multiple missionary portraits and family photos with corresponding names and locations" that the WebFetch summary did not enumerate. A second targeted fetch is recommended.
- [ ] **No dedicated mission-statement / vision-statement page** was found among the 15 URLs. /about/our-mission/ is about missionaries supported, not the church's own mission statement. Confirm whether the church has a one-sentence mission statement we should add.

### Calendar / events
- [ ] **Event durations** are NOT given on the source for: Sunday Service, Moms in Prayer, Community Meals, Women's Fellowship, Men of Valor, MVC Men's Breakfast. Placeholders used in `content/events.ts` — verify or replace.
- [ ] **Moms in Prayer time conflict** — /on-our-knees/ says 8:00 AM; /calendar/ and homepage say 7:30 AM. Confirm.
- [ ] **Moms in Prayer location** — /calendar/ says "The Smiths' residence" but /on-our-knees/ says "Pastor John's home in Kiowa." If meeting at a private residence, decide whether the public site should display the address or just say "contact for location".

### Doctrine & beliefs
- [ ] **Is there a longer Statement of Faith?** — The homepage gives short Scripture-anchored summary bullets. A church plant since 1996 typically has a more formal document. Ask if there's a PDF or longer text to use instead.

### Donations
- [ ] **501(c)(3) / tax info** — Not stated on /donations/. Confirm and add for donor reassurance.

### Homepage event
- [ ] **"Local Missions event on April 12"** — the homepage describes an evangelism seminar concluding at 2:30 PM, but no year is stated. Confirm whether this is a 2025, 2026, or future event, or remove if past.

### Pastor name discrepancy
- [x] **"Pastor Nathan Smith"** — **Resolved 2026-05-13:** confirmed by church as a guest pastor for the April 12 evangelism seminar, not a regular MVC pastor. No staff/elder change needed.

---

## Verify before launch (content that IS on the source but might be stale)

- [ ] **Sewing class dates** "April 24 & May 14" — confirm 2026.
- [ ] **VBS June 15–19, 2026** "Emerald Crossing" — confirm dates and theme for the live 2026 run.
- [ ] **Women's Fellowship "final May 9th gathering" of the 2025–26 season** — assumed 2026 from context. Once the 2026–27 season schedule is set, supersede.
- [ ] **BSF "Romans" starting September 15, 2026** — confirm.
- [x] **Pastor John Smith** is the current Senior Pastor and Elder. **Confirmed 2026-05-13.** Added to `content/staff.ts` so he renders in the staff directory and the /about staff section, in addition to remaining in `content/elders.ts`. ("Planted MVC in 1996" — still verify the founding year.)
- [ ] **Phone 303-491-4339 (church office)** — still active? Sent to both call and text.
- [ ] **Phone 720-468-2631 (Debra Smith / Moms in Prayer)** — confirm still current.
- [ ] **Phone 303-243-0167 (Pastor Brian Janes)** — confirm still current.
- [ ] **Phone 720-656-5438 (Colin Kelly)** — confirm still current.
- [ ] **Phone 303-653-6605 (Kaitlyn Kelly)** — confirm still current.
- [ ] **Phone 303-981-9808 (Sharon Egan)** — confirm still current.
- [ ] **Phone 623-755-1933 (Brooke Tartaglia, sewing)** — confirm still current; 623 area code is Phoenix-area, may be a cell number she's kept.
- [ ] **Email egancasa@gmail.com (Sharon Egan, Bible studies)** — confirm this Gmail is the correct address to publish.
- [ ] **Mailing address PO Box 490, Kiowa, CO 80117** — confirm.
- [ ] **Physical address 620 Comanche St, Kiowa, CO 80117** — note: the contact and plan-a-visit pages say "Comanche" but the homepage extract showed "Commanche" (likely a typo on the source homepage; "Comanche" is correct). Worth a quick verify.
- [ ] **"Elevation Community Center at Majestic View Church"** — confirm this is still the current dba/sub-brand for the facility.
- [ ] **Pioneers missionary partnership** — confirm still active.
- [ ] **Men of Valor location at the American Legion Hall in Elizabeth** — confirm still meeting there.
- [ ] **Story Hour at the Children's Museum** — confirm still on Tuesdays 10–11 AM.
- [ ] **Awana running Sept–April** — confirm this season runs the same calendar.
- [ ] **All staff bios** — were sourced as-of-fetch but may have stale family numbers (e.g. "8 children, 14 grandchildren"). Worth a once-over by each person before publishing.
