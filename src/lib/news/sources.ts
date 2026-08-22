export type NewsRegion = "national" | "international";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  region: NewsRegion;
}

// Verified resolving (HTTP 200, valid RSS/XML) on 2026-08-22. A few outlets named in the
// original brief no longer expose public RSS or block automated fetches (Indian Express and
// PIB India return 403; Reuters and AP News discontinued public RSS entirely) — swapped for
// equally mainstream outlets in the same category so each column still ships 4-5 sources.
export const FEED_SOURCES: FeedSource[] = [
  // National
  { id: "the-hindu", name: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss", region: "national" },
  { id: "ndtv", name: "NDTV", url: "https://feeds.feedburner.com/ndtvnews-india-news", region: "national" },
  { id: "toi", name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", region: "national" },
  { id: "hindustan-times", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml", region: "national" },
  { id: "india-today", name: "India Today", url: "https://www.indiatoday.in/rss/1206578", region: "national" },
  // International
  { id: "bbc-world", name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml", region: "international" },
  { id: "al-jazeera", name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", region: "international" },
  { id: "guardian-world", name: "The Guardian World", url: "https://www.theguardian.com/world/rss", region: "international" },
  { id: "cnn-world", name: "CNN World", url: "http://rss.cnn.com/rss/edition_world.rss", region: "international" },
];
