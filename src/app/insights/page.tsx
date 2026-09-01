import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import InsightCard from "@/components/InsightCard";
import InsightArticleCard from "@/components/InsightArticleCard";
import { getAllInsights } from "@/lib/insights";
import { getApprovedArticles } from "@/lib/articles";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Insights",
  description: `Analysis and perspective from ${SITE.legalName} — ${SITE.tagline}`,
};

// Re-check Supabase for newly approved articles at most once a minute.
export const revalidate = 60;

export default async function InsightsPage() {
  const [posts, articles] = await Promise.all([
    Promise.resolve(getAllInsights()),
    getApprovedArticles(),
  ]);

  const isEmpty = posts.length === 0 && articles.length === 0;

  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              Insights
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Analysis &amp; Perspective
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {isEmpty ? (
          <FadeIn className="rounded-lg border border-dashed border-neutral-300 py-20 text-center">
            <p className="text-lg text-neutral-600">
              Our first Insights articles are on the way.
            </p>
            <p className="mt-2 text-sm text-neutral-500">Check back soon.</p>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <InsightArticleCard key={article.id} article={article} />
            ))}
            {posts.map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
