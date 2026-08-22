import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import FadeIn from "@/components/FadeIn";
import { getAllInsights, getInsightBySlug } from "@/lib/insights";
import { SITE } from "@/lib/site-data";

export function generateStaticParams() {
  return getAllInsights().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
          {formatDate(post.frontmatter.date)}
          {post.frontmatter.author ? ` · ${post.frontmatter.author}` : ""}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </FadeIn>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-serif prose-headings:text-primary-900 prose-a:text-primary-700">
        <MDXRemote source={post.content} />
      </div>

      <p className="mt-16 text-xs text-neutral-400">{SITE.legalName}</p>
    </article>
  );
}
