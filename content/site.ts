import data from "./site.json";

// Cross-page editorial copy. The actual values live in /content/site.json
// so Decap CMS can edit them via the "Site Settings" collection.

export const siteContent = {
  home: data.home,
  about: data.about,
};

// Re-export the raw church block so /lib/church-info.ts can compute derived
// fields (mapsUrl, phoneHref, etc.) without parsing JSON itself.
export const churchData = data.church;

// `features` controls optional site sections. Defaults to all-off so
// the template ships inert — churches enable features as they set them up.
//
//   features.devotionals  →  Enables /devotionals: reading plans, daily
//                             scripture, and the email subscriber system.
//                             Requires devotional-email-settings.json to be
//                             configured and Resend credentials to be set
//                             before the email phase is wired up.
//                             Toggle in CMS: Site Settings → Feature Flags.
//
//   features.digest       →  Enables /digest: weekly church digest emails
//                             with announcements, events, recent sermons,
//                             and an optional pastor's note. Requires
//                             digest-settings.json to be configured and
//                             Resend credentials set.
//                             Toggle in CMS: Site Settings → Feature Flags.
export const features = data.features ?? { devotionals: false, digest: false };

// `adminAuth` controls how the custom admin pages (/admin/devotionals,
// /admin/digest) and admin API routes (/api/admin/*) are protected.
//
// IMPORTANT: This does NOT control TinaCMS authentication. The CMS at
// /admin/ has its own authentication via TinaCloud (Google/email login
// configured in your TinaCloud project's collaborator list). adminAuth
// only gates the custom site-rendered admin pages.
//
//   adminAuth.provider →
//     "basic"  → HTTP Basic Auth. Single shared password set via the
//                ADMIN_PASSWORD environment variable. Simple to set up,
//                but everyone with admin access shares one credential
//                and the browser prompt is functional, not friendly.
//                This is the default — preserves the existing behavior.
//
//     "google" → Google OAuth via NextAuth (Auth.js). Each authorized
//                person signs in with their own Google account; access
//                is controlled by an email allowlist in
//                /content/admin-access.json (editable in the CMS) plus
//                an optional ADMIN_ALLOWLIST env-var bootstrap fallback.
//                Requires Google Cloud OAuth credentials and a few env
//                vars — see docs/for-tech-volunteers/admin-access-google-oauth.md.
//
// Switch by editing site.json (or via the CMS once Google is set up).
// Restart the dev server / redeploy after changing.
export type AdminAuthProvider = "basic" | "google";
const adminAuthRaw = (data as { adminAuth?: { provider?: string } }).adminAuth;
export const adminAuth: { provider: AdminAuthProvider } =
  adminAuthRaw?.provider === "google"
    ? { provider: "google" }
    : { provider: "basic" };
