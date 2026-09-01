import Link from "next/link";
import type { DbArticle } from "@/lib/articles";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightArticleCard({ article }: { article: DbArticle }) {
  return (
    <Link
      href={`/article/${article.id}`}
      className="group block overflow-hidden rounded-lg border border-neutral-200 transition hover:border-primary-300 hover:shadow-md"
    >
      {article.thumbnail_url ? (
        <img
          src={article.thumbnail_url}
          alt={article.title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-primary-950 text-sm text-accent-400">
          EYE-NEWS
        </div>
      )}
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-600">
          {formatDate(article.publication_date)} • {article.topic}
        </p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-primary-900 group-hover:text-accent-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {article.body.slice(0, 200)}
          {article.body.length > 200 ? "…" : ""}
        </p>
        <p className="mt-3 text-xs text-neutral-500">By {article.author_name}</p>
        <span className="mt-4 inline-block text-sm font-medium text-primary-700 group-hover:underline">
          Read more →
        </span>
      </div>
    </Link>
  );
}
