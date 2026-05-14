import { defineConfig } from "tinacms";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public",
    },
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
              const date = values.date
                ? String(values.date).slice(0, 10)
                : "undated";
              const title = slugify(String(values.title || "untitled"));
              return `${date}-${title}`;
            },
          },
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
          { type: "rich-text", name: "body", label: "Notes", isBody: true },
        ],
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
              const date = values.date
                ? String(values.date).slice(0, 10)
                : "undated";
              const title = slugify(String(values.title || "untitled"));
              return `${date}-${title}`;
            },
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "boolean", name: "pinned", label: "Pinned" },
          { type: "string", name: "link", label: "Link URL" },
          { type: "string", name: "linkLabel", label: "Link Label" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },

      // ── Elders ─────────────────────────────────────────────────────
      {
        name: "elders",
        label: "Elders",
        path: "content/elders",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "elder")),
          },
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "occupation", label: "Occupation / Role" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true },
        ],
      },

      // ── Staff ──────────────────────────────────────────────────────
      {
        name: "staff",
        label: "Staff",
        path: "content/staff",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "staff")),
          },
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "email", label: "Email" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true },
        ],
      },

      // ── Ministries ─────────────────────────────────────────────────
      {
        name: "ministries",
        label: "Ministries",
        path: "content/ministries",
        format: "md",
        ui: {
          filename: {
            slugify: (values) =>
              String(values.slug || slugify(String(values.title || "ministry"))),
          },
        },
        fields: [
          { type: "string", name: "slug", label: "Slug" },
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "tagline", label: "Tagline" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
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
              { type: "string", name: "note", label: "Note" },
            ],
          },
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
      },

      // ── Small Groups ───────────────────────────────────────────────
      {
        name: "groups",
        label: "Small Groups",
        path: "content/groups",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.name || "group")),
          },
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
            ui: { component: "textarea" },
          },
        ],
      },

      // ── Serve Roles ────────────────────────────────────────────────
      {
        name: "serveRoles",
        label: "Serve Roles",
        path: "content/serve-roles",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.title || "role")),
          },
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
            ui: { component: "textarea" },
          },
          { type: "string", name: "icon", label: "Icon (Lucide name)" },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },

      // ── Custom Pages ───────────────────────────────────────────────
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => slugify(String(values.title || "page")),
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "description", label: "Description" },
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
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
              const date = values.date
                ? String(values.date).slice(0, 10)
                : "undated";
              const initials = slugify(String(values.initials || "anon"));
              return `${date}-${initials}`;
            },
          },
        },
        fields: [
          { type: "string", name: "initials", label: "Initials", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "rich-text", name: "body", label: "Request", isBody: true },
        ],
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
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
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
                  { type: "string", name: "zip", label: "ZIP" },
                ],
              },
              {
                type: "object",
                name: "social",
                label: "Social Media",
                fields: [
                  { type: "string", name: "facebook", label: "Facebook URL" },
                  { type: "string", name: "youtube", label: "YouTube URL" },
                ],
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
                  { type: "boolean", name: "primary", label: "Primary" },
                ],
              },
            ],
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
                  { type: "string", name: "headline", label: "Headline" },
                ],
              },
            ],
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
                  { type: "string", name: "headline", label: "Headline" },
                ],
              },
            ],
          },
        ],
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
                ui: { component: "textarea" },
              },
            ],
          },
        ],
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
                ui: { component: "textarea" },
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
                    options: ["weekly", "nth-of-month"],
                  },
                  { type: "number", name: "dayOfWeek", label: "Day of Week (0 = Sun)" },
                  { type: "number", name: "n", label: "Nth week (nth-of-month only)" },
                ],
              },
            ],
          },
        ],
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
                  { type: "string", name: "href", label: "URL" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
