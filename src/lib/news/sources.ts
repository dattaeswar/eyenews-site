// A "pool" is what a feed inherently covers. Regional pools are always political/local by
// nature; "national" and "international" pools are broad general-news feeds that get run
// through the political-keyword filter (see political-filter.ts) and then sorted into the
// right region — so an "india" pool item mentioning Andhra Pradesh or Telangana lands in
// that state's column instead of the general India one.
export type FeedPool = "regional-ap" | "regional-telangana" | "national" | "international";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  pool: FeedPool;
}

// Verified resolving (HTTP 200, valid RSS/XML) on 2026-08-22. Indian Express, PIB India,
// Reuters and AP News no longer expose a working public RSS feed (403 / discontinued) and were
// dropped. CNN's world feed was removed after it started serving sponsored personal-finance
// cards instead of news — France 24 replaced it, which also happens to publish inline article
// images.
export const FEED_SOURCES: FeedSource[] = [
  // Regional — Andhra Pradesh & Telangana desks, always in scope for their column
  { id: "hindu-ap", name: "The Hindu", url: "https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss", pool: "regional-ap" },
  { id: "hindu-telangana", name: "The Hindu", url: "https://www.thehindu.com/news/national/telangana/feeder/default.rss", pool: "regional-telangana" },
  // National — filtered to political stories, then sorted into AP / Telangana / India
  { id: "ndtv", name: "NDTV", url: "https://feeds.feedburner.com/ndtvnews-india-news", pool: "national" },
  { id: "toi", name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", pool: "national" },
  { id: "hindustan-times", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml", pool: "national" },
  { id: "india-today", name: "India Today", url: "https://www.indiatoday.in/rss/1206578", pool: "national" },
  // International — filtered to political stories
  { id: "bbc-world", name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml", pool: "international" },
  { id: "al-jazeera", name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", pool: "international" },
  { id: "guardian-world", name: "The Guardian World", url: "https://www.theguardian.com/world/rss", pool: "international" },
  { id: "france24", name: "France 24", url: "https://www.france24.com/en/rss", pool: "international" },
];
