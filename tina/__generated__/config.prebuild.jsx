// tina/config.ts
import { defineConfig } from "tinacms";
function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ── Sermons ────────────────────────────────────────────────────
      {
        name: "sermons",
        label: "Sermons",
        path: "content/sermons",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date ? String(values.date).slice(0, 10) : "undated";
              const title = slugify(String(values.title || "untitled"));
              return `${date}-${title}`;
            }
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "speaker", label: "Speaker" },
          { type: "string", name: "series", label: "Series" },
          { type: "string", name: "scripture", label: "Scripture" },
          { type: "string", name: "book", label: "Book" },
          { type: "string", name: "youtubeId", label: "YouTube ID" },
          { type: "string", name: "audioUrl", label: "Audio URL" },
          { type: "string", name: "notesUrl", label: "Notes URL" },
          { type: "image", name: "thumbnail", label: "Thumbnail" },
          { type: "rich-text", name: "body", label: "Notes", isBody: true }
        ]
      },
      // ── Announcements ──────────────────────────────────────────────
      {
        name: "announcements",
        label: "Announcements",
        path: "content/announcements",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date ? String(values.date).slice(0, 10) : "undated";
              const title = slugify(String(values.title || "untitled"));
              return `${date}-${title}`;
            }
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "boolean", name: "pinned", label: "Pinned" },
          { type: "string", name: "link", label: "Link URL" },
          { type: "string", name: "linkLabel", label: "Link Label" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      // ── Elders ─────────────────────────────────────────────────────
      {
        name: "elders",
        label: "Elders",
        path: "content/elders",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "elder"))
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "occupation", label: "Occupation / Role" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true }
        ]
      },
      // ── Staff ──────────────────────────────────────────────────────
      {
        name: "staff",
        label: "Staff",
        path: "content/staff",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "staff"))
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "email", label: "Email" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true }
        ]
      },
      // ── Ministries ─────────────────────────────────────────────────
      {
        name: "ministries",
        label: "Ministries",
        path: "content/ministries",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => String(values.slug || slugify(String(values.title || "ministry")))
          }
        },
        fields: [
          { type: "string", name: "slug", label: "Slug" },
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "tagline", label: "Tagline" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          { type: "image", name: "image", label: "Banner Image" },
          { type: "string", name: "whoFor", label: "Who It's For" },
          {
            type: "object",
            name: "meetings",
            label: "Meeting Times",
            list: true,
            fields: [
              { type: "string", name: "day", label: "Day" },
              { type: "string", name: "time", label: "Time" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "note", label: "Note" }
            ]
          },
          { type: "rich-text", name: "body", label: "Content", isBody: true }
        ]
      },
      // ── Small Groups ───────────────────────────────────────────────
      {
        name: "groups",
        label: "Small Groups",
        path: "content/groups",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "group"))
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "day", label: "Day" },
          { type: "string", name: "time", label: "Time" },
          { type: "string", name: "neighborhood", label: "Neighborhood / Location" },
          { type: "string", name: "lifeStage", label: "Life Stage" },
          { type: "string", name: "leader", label: "Leader" },
          { type: "image", name: "leaderPhoto", label: "Leader Photo" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          }
        ]
      },
      // ── Serve Roles ────────────────────────────────────────────────
      {
        name: "serveRoles",
        label: "Serve Roles",
        path: "content/serve-roles",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.title || "role"))
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "team", label: "Team" },
          { type: "string", name: "commitment", label: "Commitment" },
          { type: "string", name: "training", label: "Training" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          { type: "string", name: "icon", label: "Icon (Lucide name)" },
          { type: "number", name: "order", label: "Display Order" }
        ]
      },
      // ── Custom Pages ───────────────────────────────────────────────
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.title || "page"))
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "description", label: "Description" },
          { type: "rich-text", name: "body", label: "Content", isBody: true }
        ]
      },
      // ── Prayer Requests ────────────────────────────────────────────
      {
        name: "prayerRequests",
        label: "Prayer Requests",
        path: "content/prayer-requests",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date ? String(values.date).slice(0, 10) : "undated";
              const initials = slugify(String(values.initials || "anon"));
              return `${date}-${initials}`;
            }
          }
        },
        fields: [
          { type: "string", name: "initials", label: "Initials", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "rich-text", name: "body", label: "Request", isBody: true }
        ]
      },
      // ── Our Story (single document) ────────────────────────────────
      {
        name: "story",
        label: "Our Story",
        path: "content",
        format: "md",
        match: { include: "story" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "rich-text", name: "body", label: "Content", isBody: true }
        ]
      },
      // ── Site Settings (single JSON) ────────────────────────────────
      {
        name: "site",
        label: "Site Settings",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "church",
            label: "Church Info",
            fields: [
              { type: "string", name: "name", label: "Full Name" },
              { type: "string", name: "shortName", label: "Short Name" },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "image", name: "logo", label: "Logo" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "officeHours", label: "Office Hours" },
              {
                type: "object",
                name: "address",
                label: "Address",
                fields: [
                  { type: "string", name: "street", label: "Street" },
                  { type: "string", name: "city", label: "City" },
                  { type: "string", name: "state", label: "State" },
                  { type: "string", name: "zip", label: "ZIP" }
                ]
              },
              {
                type: "object",
                name: "social",
                label: "Social Media",
                fields: [
                  { type: "string", name: "facebook", label: "Facebook URL" },
                  { type: "string", name: "youtube", label: "YouTube URL" }
                ]
              },
              {
                type: "object",
                name: "services",
                label: "Services",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "day", label: "Day" },
                  { type: "string", name: "time", label: "Time" },
                  { type: "string", name: "note", label: "Note" },
                  { type: "boolean", name: "primary", label: "Primary" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "home",
            label: "Homepage",
            fields: [
              {
                type: "object",
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "headline", label: "Headline" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About Page",
            fields: [
              {
                type: "object",
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "headline", label: "Headline" }
                ]
              }
            ]
          }
        ]
      },
      // ── Beliefs (single JSON) ──────────────────────────────────────
      {
        name: "beliefsDoc",
        label: "Beliefs",
        path: "content",
        format: "json",
        match: { include: "beliefs" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "beliefs",
            label: "Beliefs",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title", required: true, isTitle: true },
              {
                type: "string",
                name: "statement",
                label: "Statement",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      // ── Recurring Events (single JSON) ─────────────────────────────
      {
        name: "eventsDoc",
        label: "Recurring Events",
        path: "content",
        format: "json",
        match: { include: "events" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            fields: [
              { type: "string", name: "id", label: "ID" },
              { type: "string", name: "title", label: "Title", required: true, isTitle: true },
              { type: "string", name: "time", label: "Time" },
              { type: "number", name: "durationMinutes", label: "Duration (minutes)" },
              { type: "string", name: "location", label: "Location" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              },
              {
                type: "object",
                name: "rule",
                label: "Recurrence Rule",
                fields: [
                  {
                    type: "string",
                    name: "kind",
                    label: "Kind",
                    options: ["weekly", "nth-of-month"]
                  },
                  { type: "number", name: "dayOfWeek", label: "Day of Week (0 = Sun)" },
                  { type: "number", name: "n", label: "Nth week (nth-of-month only)" }
                ]
              }
            ]
          }
        ]
      },
      // ── Navigation (single JSON) ───────────────────────────────────
      {
        name: "navigation",
        label: "Navigation",
        path: "content",
        format: "json",
        match: { include: "navigation" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Navigation Items",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL" },
              {
                type: "object",
                name: "children",
                label: "Dropdown Items",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "URL" }
                ]
              }
            ]
          }
        ]
<<<<<<< HEAD
=======
      },
      // ======================================================================
      // 3. OUR STORY  (content/story.md)
      // ======================================================================
      {
        name: "story",
        label: "Our Story",
        path: "content",
        format: "md",
        match: { include: "story" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Story",
            isBody: true
          }
        ]
      },
      // ======================================================================
      // 4. BELIEFS  (content/beliefs.json)
      // ======================================================================
      {
        name: "beliefs",
        label: "What We Believe",
        path: "content",
        format: "json",
        match: { include: "beliefs" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "beliefs",
            label: "Doctrinal Statements",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Belief" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "statement", label: "Statement", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ======================================================================
      // 5. RECURRING EVENTS  (content/events.json)
      // ======================================================================
      {
        name: "events",
        label: "Recurring Events",
        path: "content",
        format: "json",
        match: { include: "events" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title ?? "Event" }) },
            fields: [
              { type: "string", name: "id", label: "ID (no spaces, e.g. wednesday-bible-study)" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "time", label: "Time (e.g. 7:00 PM)" },
              { type: "number", name: "durationMinutes", label: "Duration (minutes)" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "rule",
                label: "Recurrence",
                fields: [
                  {
                    type: "string",
                    name: "kind",
                    label: "Type",
                    options: ["weekly", "monthly-nth"]
                  },
                  { type: "number", name: "dayOfWeek", label: "Day of Week (0=Sun, 6=Sat)" },
                  { type: "number", name: "nth", label: "Nth occurrence (for monthly-nth, e.g. 1 = first)" }
                ]
              }
            ]
          }
        ]
      },
      // ======================================================================
      // 6. CUSTOM PAGES  (content/pages/*.md)
      // ======================================================================
      {
        name: "pages",
        label: "Custom Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => (values?.title ?? "page").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "title", label: "Page Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Content", isBody: true }
        ]
      },
      // ======================================================================
      // 7. STAFF  (content/staff/*.md)
      // ======================================================================
      {
        name: "staff",
        label: "Staff",
        path: "content/staff",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => (values?.name ?? "staff").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", isTitle: true, required: true },
          { type: "string", name: "role", label: "Role / Title" },
          { type: "string", name: "email", label: "Email (optional)" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order (lower = first)" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true }
        ]
      },
      // ======================================================================
      // 8. ELDERS  (content/elders/*.md)
      // ======================================================================
      {
        name: "elders",
        label: "Elders",
        path: "content/elders",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => (values?.name ?? "elder").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", isTitle: true, required: true },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true }
        ]
      },
      // ======================================================================
      // 9. MINISTRIES  (content/ministries/*.md)
      // ======================================================================
      {
        name: "ministries",
        label: "Ministries",
        path: "content/ministries",
        format: "md",
        fields: [
          { type: "string", name: "slug", label: "Slug (URL path, e.g. kids)" },
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "string", name: "whoFor", label: "Who It's For" },
          {
            type: "object",
            name: "meetings",
            label: "Meeting Times",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.day ?? ""} ${item?.time ?? ""}`.trim() || "Meeting" }) },
            fields: [
              { type: "string", name: "day", label: "Day" },
              { type: "string", name: "time", label: "Time" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "note", label: "Note (optional)" }
            ]
          },
          {
            type: "string",
            name: "whatToExpect",
            label: "What to Expect",
            list: true
          },
          {
            type: "object",
            name: "leader",
            label: "Ministry Leader",
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Role" },
              { type: "string", name: "email", label: "Email" },
              { type: "image", name: "photo", label: "Photo" }
            ]
          },
          { type: "rich-text", name: "body", label: "Details", isBody: true }
        ]
      },
      // ======================================================================
      // 10. SERMONS  (content/sermons/*.md)
      // ======================================================================
      {
        name: "sermons",
        label: "Sermons",
        path: "content/sermons",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values?.date ? new Date(values.date).toISOString().slice(0, 10) : "2026-01-01";
              const title = (values?.title ?? "sermon").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return `${date}-${title}`;
            }
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "series", label: "Series" },
          { type: "string", name: "speaker", label: "Speaker" },
          { type: "datetime", name: "date", label: "Date", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "string", name: "scripture", label: "Scripture Reference (e.g. John 3:16)" },
          { type: "string", name: "book", label: "Bible Book (e.g. John)" },
          { type: "string", name: "youtubeId", label: "YouTube Video ID", ui: { description: "The ID after ?v= in a YouTube URL. Leave blank until the recording is uploaded." } },
          { type: "image", name: "thumbnail", label: "Thumbnail Image" },
          { type: "string", name: "audioUrl", label: "Audio URL (MP3 link, or #)" },
          { type: "string", name: "notesUrl", label: "Notes URL (PDF link, or #)" },
          { type: "rich-text", name: "body", label: "Description", isBody: true }
        ]
      },
      // ======================================================================
      // 11. ANNOUNCEMENTS  (content/announcements/*.md)
      // ======================================================================
      {
        name: "announcements",
        label: "Announcements",
        path: "content/announcements",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values?.date ? new Date(values.date).toISOString().slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
              const title = (values?.title ?? "announcement").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return `${date}-${title}`;
            }
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Post Date", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "datetime", name: "expires", label: "Expiration Date (optional)", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "boolean", name: "pinned", label: "Pin to top?" },
          { type: "string", name: "link", label: "Link URL (optional)" },
          { type: "string", name: "linkLabel", label: "Link Button Label (e.g. Learn more)" },
          { type: "rich-text", name: "body", label: "Announcement Text", isBody: true }
        ]
      },
      // ======================================================================
      // 12. SMALL GROUPS  (content/groups/*.md)
      // ======================================================================
      {
        name: "groups",
        label: "Small Groups",
        path: "content/groups",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => (values?.name ?? "group").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "name", label: "Group Name", isTitle: true, required: true },
          {
            type: "string",
            name: "day",
            label: "Day",
            options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          { type: "string", name: "time", label: "Time (e.g. 6:30 PM)" },
          { type: "string", name: "neighborhood", label: "Neighborhood / Area" },
          {
            type: "string",
            name: "lifeStage",
            label: "Life Stage",
            options: ["Young Adults", "Couples", "Men", "Women", "Moms", "Mixed", "Empty Nesters"]
          },
          { type: "string", name: "leader", label: "Leader Name" },
          { type: "image", name: "leaderPhoto", label: "Leader Photo (optional)" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
            description: "Email that receives interest notifications for this group. Leave blank to use the church's main inbox."
          }
        ]
      },
      // ======================================================================
      // 13. SERVE ROLES  (content/serve-roles/*.md)
      // ======================================================================
      {
        name: "serve_roles",
        label: "Serve Roles",
        path: "content/serve-roles",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => (values?.title ?? "role").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "title", label: "Role Title", isTitle: true, required: true },
          { type: "string", name: "team", label: "Team Name" },
          { type: "string", name: "commitment", label: "Time Commitment" },
          { type: "string", name: "training", label: "Training Description" },
          { type: "string", name: "description", label: "Role Description", ui: { component: "textarea" } },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            options: ["HandHeart", "Baby", "BookOpenCheck", "Music", "Coffee", "Sliders", "UtensilsCrossed", "HandHelping"],
            ui: { description: "Icon shown on the serve page card." }
          },
          { type: "number", name: "order", label: "Display Order (lower = first)" }
        ]
      },
      // ======================================================================
      // 14. PRAYER REQUESTS  (content/prayer-requests/*.md)
      // ======================================================================
      {
        name: "prayer_requests",
        label: "Prayer Requests",
        path: "content/prayer-requests",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
              const initials = (values?.initials ?? "anon").toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return `${date}-${initials}`;
            }
          }
        },
        fields: [
          { type: "string", name: "initials", label: "Initials (shown on prayer wall, e.g. J. D.)" },
          { type: "datetime", name: "date", label: "Date Received", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "rich-text", name: "body", label: "Prayer Request", isBody: true }
        ]
>>>>>>> 059863b (Added email alerts to small groups)
      }
    ]
  }
});
export {
  config_default as default
};
