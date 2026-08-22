import { getNewsPulse, type NewsItem } from "@/lib/news/fetch-news";

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

function NewsColumn({ title, items }: { title: string; items: NewsItem[] }) {
  return (
    <div>
      <h3 className="border-b-2 border-accent-600 pb-2 font-serif text-lg font-semibold text-primary-900">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">
          Sources are temporarily unavailable. Check back shortly.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-neutral-200">
          {items.map((item) => (
            <li key={item.link} className="py-3">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p className="text-sm font-medium leading-snug text-neutral-900 group-hover:text-accent-600">
                  {item.title}
                </p>
                {item.snippet && (
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{item.snippet}</p>
                )}
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
                  {item.source} · {timeAgo(item.pubDate)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function NewsPulsePanel({ limit }: { limit?: number }) {
  const { national, international } = await getNewsPulse();
  const nationalItems = limit ? national.slice(0, limit) : national;
  const internationalItems = limit ? international.slice(0, limit) : international;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <NewsColumn title="National" items={nationalItems} />
      <NewsColumn title="International" items={internationalItems} />
    </div>
  );
}
