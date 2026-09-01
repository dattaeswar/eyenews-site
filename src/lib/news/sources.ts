export type FeedPool =
  | "regional-ap" | "regional-telangana" | "regional-bihar" | "regional-delhi"
  | "regional-maharashtra" | "regional-karnataka" | "regional-tamil-nadu" | "regional-west-bengal"
  | "regional-uttar-pradesh" | "regional-rajasthan" | "regional-gujarat" | "regional-madhya-pradesh"
  | "regional-punjab" | "regional-haryana" | "regional-himachal" | "regional-uttarakhand"
  | "regional-jharkhand" | "regional-odisha" | "regional-assam" | "regional-kerala"
  | "regional-tripura" | "regional-manipur" | "regional-mizoram" | "regional-nagaland"
  | "regional-goa" | "regional-ladakh" | "regional-sikkim" | "regional-chandigarh"
  | "regional-puducherry" | "regional-lakshadweep" | "national" | "international";

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
  // Andhra Pradesh & Telangana
  { id: "hindu-ap", name: "The Hindu", url: "https://www.thehindu.com/news/national/andhra-pradesh/feeder/default.rss", pool: "regional-ap" },
  { id: "hindu-telangana", name: "The Hindu", url: "https://www.thehindu.com/news/national/telangana/feeder/default.rss", pool: "regional-telangana" },
  // Bihar & Delhi
  { id: "hindu-bihar", name: "The Hindu", url: "https://www.thehindu.com/news/national/bihar/feeder/default.rss", pool: "regional-bihar" },
  { id: "ht-patna", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/patna-news/rssfeed.xml", pool: "regional-bihar" },
  { id: "hindu-delhi", name: "The Hindu", url: "https://www.thehindu.com/news/cities/Delhi/feeder/default.rss", pool: "regional-delhi" },
  { id: "ht-delhi", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/delhi-news/rssfeed.xml", pool: "regional-delhi" },
  // Major states
  { id: "hindu-maharashtra", name: "The Hindu", url: "https://www.thehindu.com/news/national/maharashtra/feeder/default.rss", pool: "regional-maharashtra" },
  { id: "ht-mumbai", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/mumbai-news/rssfeed.xml", pool: "regional-maharashtra" },
  { id: "hindu-karnataka", name: "The Hindu", url: "https://www.thehindu.com/news/national/karnataka/feeder/default.rss", pool: "regional-karnataka" },
  { id: "ht-bangalore", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/bangalore-news/rssfeed.xml", pool: "regional-karnataka" },
  { id: "hindu-tamil-nadu", name: "The Hindu", url: "https://www.thehindu.com/news/national/tamil-nadu/feeder/default.rss", pool: "regional-tamil-nadu" },
  { id: "ht-chennai", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/chennai-news/rssfeed.xml", pool: "regional-tamil-nadu" },
  { id: "hindu-west-bengal", name: "The Hindu", url: "https://www.thehindu.com/news/national/west-bengal/feeder/default.rss", pool: "regional-west-bengal" },
  { id: "hindu-up", name: "The Hindu", url: "https://www.thehindu.com/news/national/uttar-pradesh/feeder/default.rss", pool: "regional-uttar-pradesh" },
  { id: "ht-lucknow", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/lucknow-news/rssfeed.xml", pool: "regional-uttar-pradesh" },
  { id: "hindu-rajasthan", name: "The Hindu", url: "https://www.thehindu.com/news/national/rajasthan/feeder/default.rss", pool: "regional-rajasthan" },
  { id: "ht-jaipur", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/cities/jaipur-news/rssfeed.xml", pool: "regional-rajasthan" },
  { id: "hindu-gujarat", name: "The Hindu", url: "https://www.thehindu.com/news/national/gujarat/feeder/default.rss", pool: "regional-gujarat" },
  { id: "hindu-mp", name: "The Hindu", url: "https://www.thehindu.com/news/national/madhya-pradesh/feeder/default.rss", pool: "regional-madhya-pradesh" },
  { id: "hindu-punjab", name: "The Hindu", url: "https://www.thehindu.com/news/national/punjab/feeder/default.rss", pool: "regional-punjab" },
  { id: "hindu-haryana", name: "The Hindu", url: "https://www.thehindu.com/news/national/haryana/feeder/default.rss", pool: "regional-haryana" },
  { id: "hindu-hp", name: "The Hindu", url: "https://www.thehindu.com/news/national/himachal-pradesh/feeder/default.rss", pool: "regional-himachal" },
  { id: "hindu-uttarakhand", name: "The Hindu", url: "https://www.thehindu.com/news/national/uttarakhand/feeder/default.rss", pool: "regional-uttarakhand" },
  { id: "hindu-jharkhand", name: "The Hindu", url: "https://www.thehindu.com/news/national/jharkhand/feeder/default.rss", pool: "regional-jharkhand" },
  { id: "hindu-odisha", name: "The Hindu", url: "https://www.thehindu.com/news/national/odisha/feeder/default.rss", pool: "regional-odisha" },
  { id: "hindu-assam", name: "The Hindu", url: "https://www.thehindu.com/news/national/assam/feeder/default.rss", pool: "regional-assam" },
  { id: "hindu-kerala", name: "The Hindu", url: "https://www.thehindu.com/news/national/kerala/feeder/default.rss", pool: "regional-kerala" },
  { id: "hindu-tripura", name: "The Hindu", url: "https://www.thehindu.com/news/national/tripura/feeder/default.rss", pool: "regional-tripura" },
  { id: "hindu-manipur", name: "The Hindu", url: "https://www.thehindu.com/news/national/manipur/feeder/default.rss", pool: "regional-manipur" },
  { id: "hindu-mizoram", name: "The Hindu", url: "https://www.thehindu.com/news/national/mizoram/feeder/default.rss", pool: "regional-mizoram" },
  { id: "hindu-nagaland", name: "The Hindu", url: "https://www.thehindu.com/news/national/nagaland/feeder/default.rss", pool: "regional-nagaland" },
  { id: "hindu-goa", name: "The Hindu", url: "https://www.thehindu.com/news/national/goa/feeder/default.rss", pool: "regional-goa" },
  { id: "hindu-ladakh", name: "The Hindu", url: "https://www.thehindu.com/news/national/ladakh/feeder/default.rss", pool: "regional-ladakh" },
  { id: "hindu-sikkim", name: "The Hindu", url: "https://www.thehindu.com/news/national/sikkim/feeder/default.rss", pool: "regional-sikkim" },
  { id: "hindu-chandigarh", name: "The Hindu", url: "https://www.thehindu.com/news/cities/Chandigarh/feeder/default.rss", pool: "regional-chandigarh" },
  { id: "hindu-puducherry", name: "The Hindu", url: "https://www.thehindu.com/news/cities/puducherry/feeder/default.rss", pool: "regional-puducherry" },
  // National & International
  { id: "ndtv", name: "NDTV", url: "https://feeds.feedburner.com/ndtvnews-india-news", pool: "national" },
  { id: "toi", name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", pool: "national" },
  { id: "hindustan-times", name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml", pool: "national" },
  { id: "india-today", name: "India Today", url: "https://www.indiatoday.in/rss/1206578", pool: "national" },
  { id: "bbc-world", name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml", pool: "international" },
  { id: "al-jazeera", name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", pool: "international" },
  { id: "guardian-world", name: "The Guardian World", url: "https://www.theguardian.com/world/rss", pool: "international" },
  { id: "france24", name: "France 24", url: "https://www.france24.com/en/rss", pool: "international" },
];
