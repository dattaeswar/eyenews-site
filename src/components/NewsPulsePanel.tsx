import { getNewsPulse, type NewsItem } from "@/lib/news/fetch-news";

const AVATAR_COLORS = [
  "bg-primary-700",
  "bg-accent-600",
  "bg-primary-500",
  "bg-[#b8860b]", // muted gold, echoes the badge ring
  "bg-[#2f6b46]", // deep flag green
  "bg-primary-800",
];

function avatarColor(source: string): string {
  let hash = 0;
  for (let i = 0; i < source.length; i++) hash = (hash * 31 + source.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

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

function SourceAvatar({ source }: { source: string }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(source)}`}
      aria-hidden
    >
      {source.charAt(0)}
    </span>
  );
}

function LeadItem({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-accent-300 hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <SourceAvatar source={item.source} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {item.source}
          </p>
          <p className="text-xs text-neutral-400">{timeAgo(item.pubDate)}</p>
        </div>
      </div>
      <p className="mt-3 font-serif text-lg font-semibold leading-snug text-primary-900 group-hover:text-accent-700">
        {item.title}
      </p>
      {item.snippet && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {item.snippet}
        </p>
      )}
    </a>
  );
}

function ListItem({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 border-b border-neutral-100 py-3.5 last:border-0"
    >
      <SourceAvatar source={item.source} />
      <div className="min-w-0">
        <p className="text-sm font-medium leading-snug text-neutral-900 group-hover:text-accent-600">
          {item.title}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
          {item.source} · {timeAgo(item.pubDate)}
        </p>
      </div>
    </a>
  );
}

function NewsColumn({
  title,
  accent,
  items,
}: {
  title: string;
  accent: string;
  items: NewsItem[];
}) {
  const [lead, ...rest] = items;

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`} aria-hidden />
        <h3 className="font-serif text-lg font-semibold text-primary-900">{title}</h3>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">
          Sources are temporarily unavailable. Check back shortly.
        </p>
      ) : (
        <div className="mt-4 space-y-1">
          <LeadItem item={lead} />
          {rest.length > 0 && (
            <div className="rounded-lg border border-neutral-200 bg-white px-4">
              {rest.map((item) => (
                <ListItem key={item.link} item={item} />
              ))}
            </div>
          )}
        </div>
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
      <NewsColumn title="National" accent="bg-saffron" items={nationalItems} />
      <NewsColumn title="International" accent="bg-flagGreen" items={internationalItems} />
    </div>
  );
}
