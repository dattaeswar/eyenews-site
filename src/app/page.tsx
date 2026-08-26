import Link from "next/link";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import FeaturedPosters from "@/components/FeaturedPosters";
import InsightCard from "@/components/InsightCard";
import LivePill from "@/components/LivePill";
import NewsPulsePreview from "@/components/NewsPulsePreview";
import TiltLogo from "@/components/TiltLogo";
import { getAllInsights } from "@/lib/insights";
import { SERVICES, SITE } from "@/lib/site-data";

export default function Home() {
  const latestInsights = getAllInsights().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <FadeIn>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400">
              {SITE.tagline}
            </p>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Political strategy built on grassroots intelligence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
              {SITE.legalName} brings together political strategy, grassroots intelligence, data
              and media under one practice — building the campaigns, communication and public
              engagement that political and public life in India runs on.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/insights"
                className="rounded-md bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
              >
                Read our Insights
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="hidden lg:block">
            <TiltLogo src="/brand/logo-mark.png" alt={`${SITE.brandName} emblem`} />
          </FadeIn>
        </div>

        <div className="h-1.5 w-full bg-gradient-to-r from-saffron via-white to-flagGreen" />
      </section>

      {/* Practice areas preview */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
            What we do
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
            Practice Areas
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.05}>
              <div className="h-full rounded-lg border border-neutral-200 p-6">
                <h3 className="font-serif text-lg font-semibold text-primary-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/practice-areas"
            className="text-sm font-semibold text-primary-700 hover:underline"
          >
            View all practice areas →
          </Link>
        </div>
      </section>

      <FeaturedPosters />

      {/* Insights preview */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
                Insights
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
                Latest thinking
              </h2>
            </div>
            <Link
              href="/insights"
              className="hidden text-sm font-semibold text-primary-700 hover:underline sm:block"
            >
              View all →
            </Link>
          </FadeIn>

          {latestInsights.length === 0 ? (
            <FadeIn className="mt-10 rounded-lg border border-dashed border-neutral-300 p-10 text-center">
              <p className="text-neutral-600">
                Our first Insights articles are in the works — check back soon.
              </p>
            </FadeIn>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestInsights.map((post) => (
                <InsightCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News pulse preview */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn className="flex items-end justify-between">
          <div>
            <LivePill />
            <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-900 sm:text-4xl">
              News Pulse
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Political headlines — Andhra Pradesh, Telangana, India &amp; International
            </p>
          </div>
          <Link
            href="/news-pulse"
            className="hidden text-sm font-semibold text-primary-700 hover:underline sm:block"
          >
            Full feed →
          </Link>
        </FadeIn>
        <div className="mt-10">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-neutral-100" />
                ))}
              </div>
            }
          >
            <NewsPulsePreview />
          </Suspense>
        </div>
      </section>
    </>
  );
}
