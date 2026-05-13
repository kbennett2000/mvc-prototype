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
