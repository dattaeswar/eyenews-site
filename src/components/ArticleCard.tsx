import ArticleThumb from "@/components/ArticleThumb";
import type { NewsItem } from "@/lib/news/fetch-news";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function LeadArticleCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-accent-300 hover:shadow-md sm:grid-cols-[2fr_3fr]"
    >
      <ArticleThumb src={item.image} source={item.source} className="aspect-video w-full sm:aspect-auto sm:h-full" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {item.source} · {timeAgo(item.pubDate)}
        </p>
        <p className="mt-2 font-serif text-lg font-semibold leading-snug text-primary-900 group-hover:text-accent-700 sm:text-xl">
          {item.title}
        </p>
        {item.snippet && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {item.snippet}
          </p>
        )}
      </div>
    </a>
  );
}

export function GridArticleCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition hover:border-accent-300 hover:shadow-md"
    >
      <ArticleThumb src={item.image} source={item.source} className="aspect-[4/3] w-full" />
      <div className="p-3.5">
        <p className="text-sm font-medium leading-snug text-neutral-900 group-hover:text-accent-600">
          {item.title}
        </p>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
          {item.source} · {timeAgo(item.pubDate)}
        </p>
      </div>
    </a>
  );
}
