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
