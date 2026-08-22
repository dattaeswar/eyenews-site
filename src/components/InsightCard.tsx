import Link from "next/link";
import type { InsightPost } from "@/lib/insights";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightCard({ post }: { post: InsightPost }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group block rounded-lg border border-neutral-200 p-6 transition hover:border-primary-300 hover:shadow-md"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-accent-600">
        {formatDate(post.frontmatter.date)}
      </p>
      <h3 className="mt-2 font-serif text-xl font-semibold text-primary-900 group-hover:text-accent-700">
        {post.frontmatter.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{post.frontmatter.summary}</p>
      <span className="mt-4 inline-block text-sm font-medium text-primary-700 group-hover:underline">
        Read more →
      </span>
    </Link>
  );
}
