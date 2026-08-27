import Parser from "rss-parser";
import { isPolitical, matchesAndhraPradesh, matchesBihar, matchesDelhi, matchesTelangana } from "./political-filter";
import { FEED_SOURCES, type FeedPool } from "./sources";

export interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  pubDate: string; // ISO string
  image?: string;
}

export type NewsRegion = "andhraPradesh" | "telangana" | "bihar" | "delhi" | "india" | "international";

const REVALIDATE_SECONDS = 1800; // 30 min — Next.js data cache, no database needed
const CAP_PER_REGION = 12;

type RawFeedItem = {
  title?: string;
  link?: string;
  contentSnippet?: string;
  content?: string;
  summary?: string;
  isoDate?: string;
  pubDate?: string;
  enclosure?: { url?: string };
  mediaThumbnail?: { $?: { url?: string } };
  mediaContent?: { $?: { url?: string; medium?: string } }[];
};

const parser: Parser<unknown, RawFeedItem> = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (compatible; EyeNewsIndiaBot/1.0)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
});

function stripHtml(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 160): string {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function extractImage(item: RawFeedItem): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;
  const withImage = item.mediaContent?.find((m) => m.$?.url);
  return withImage?.$?.url;
}

const FETCH_TIMEOUT_MS = 8000; // one hung/slow source must never freeze the whole panel

async function fetchOneFeed(source: (typeof FEED_SOURCES)[number]): Promise<NewsItem[]> {
  const res = await fetch(source.url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; EyeNewsIndiaBot/1.0)" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${source.name} responded ${res.status}`);
  const xml = await res.text();
  const feed = await parser.parseString(xml);

  return (feed.items ?? [])
    .filter((item) => item.link && item.title)
    .map((item) => ({
      title: stripHtml(item.title),
      link: item.link as string,
      snippet: truncate(stripHtml(item.contentSnippet || item.content || item.summary)),
      source: source.name,
      pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
      image: extractImage(item),
    }));
}

function dedupeSortCap(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const deduped = items.filter((item) => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });
  deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return deduped.slice(0, CAP_PER_REGION);
}

export async function getNewsPulse(): Promise<Record<NewsRegion, NewsItem[]>> {
  const results = await Promise.allSettled(
    FEED_SOURCES.map(async (source) => ({
      pool: source.pool as FeedPool,
      items: await fetchOneFeed(source),
    })),
  );

  const buckets: Record<NewsRegion, NewsItem[]> = {
    andhraPradesh: [],
    telangana: [],
    bihar: [],
    delhi: [],
    india: [],
    international: [],
  };

  for (const result of results) {
    if (result.status !== "fulfilled") continue; // a single failed source shouldn't blank the panel
    const { pool, items } = result.value;

    for (const item of items) {
      const text = `${item.title} ${item.snippet}`;

      if (pool === "regional-ap") {
        if (isPolitical(text)) buckets.andhraPradesh.push(item);
      } else if (pool === "regional-telangana") {
        if (isPolitical(text)) buckets.telangana.push(item);
      } else if (pool === "regional-bihar") {
        if (isPolitical(text) || matchesBihar(text)) buckets.bihar.push(item);
      } else if (pool === "regional-delhi") {
        if (isPolitical(text) || matchesDelhi(text)) buckets.delhi.push(item);
      } else if (pool === "national") {
        if (!isPolitical(text)) continue;
        if (matchesAndhraPradesh(text)) buckets.andhraPradesh.push(item);
        else if (matchesTelangana(text)) buckets.telangana.push(item);
        else if (matchesBihar(text)) buckets.bihar.push(item);
        else if (matchesDelhi(text)) buckets.delhi.push(item);
        else buckets.india.push(item);
      } else if (pool === "international") {
        if (isPolitical(text)) buckets.international.push(item);
      }
    }
  }

  return {
    andhraPradesh: dedupeSortCap(buckets.andhraPradesh),
    telangana: dedupeSortCap(buckets.telangana),
    bihar: dedupeSortCap(buckets.bihar),
    delhi: dedupeSortCap(buckets.delhi),
    india: dedupeSortCap(buckets.india),
    international: dedupeSortCap(buckets.international),
  };
}
