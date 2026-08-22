import Parser from "rss-parser";
import { FEED_SOURCES, type NewsRegion } from "./sources";

export interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  pubDate: string; // ISO string
}

const REVALIDATE_SECONDS = 1800; // 30 min — Next.js data cache, no database needed
const CAP_PER_REGION = 15;

const parser = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (compatible; EyeNewsIndiaBot/1.0)" },
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

async function fetchOneFeed(source: (typeof FEED_SOURCES)[number]): Promise<NewsItem[]> {
  const res = await fetch(source.url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; EyeNewsIndiaBot/1.0)" },
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
    }));
}

async function fetchRegion(region: NewsRegion): Promise<NewsItem[]> {
  const sources = FEED_SOURCES.filter((s) => s.region === region);
  const results = await Promise.allSettled(sources.map(fetchOneFeed));

  const items: NewsItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") items.push(...result.value);
    // A single failed source is swallowed here so the rest of the panel still renders.
  }

  const seen = new Set<string>();
  const deduped = items.filter((item) => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });

  deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return deduped.slice(0, CAP_PER_REGION);
}

export async function getNewsPulse(): Promise<{ national: NewsItem[]; international: NewsItem[] }> {
  const [national, international] = await Promise.all([
    fetchRegion("national"),
    fetchRegion("international"),
  ]);
  return { national, international };
}
