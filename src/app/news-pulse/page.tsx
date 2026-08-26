import type { Metadata } from "next";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import LivePill from "@/components/LivePill";
import NewsPulsePanel from "@/components/NewsPulsePanel";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "News Pulse",
  description:
    "Political headlines for Andhra Pradesh, Telangana, Bihar, Delhi, India and the world — aggregated live.",
};

function PanelSkeleton() {
  return (
    <div>
      <div className="flex gap-2 border-b border-neutral-200 pb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 w-32 animate-pulse rounded-full bg-neutral-100" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-neutral-100" />
        ))}
      </div>
    </div>
  );
}

export default function NewsPulsePage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <LivePill light />
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">News Pulse</h1>
            <p className="mt-4 text-neutral-300">
              Political headlines for Andhra Pradesh, Telangana, Bihar, Delhi, India and the world — refreshed
              automatically every 30 minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Suspense fallback={<PanelSkeleton />}>
          <NewsPulsePanel />
        </Suspense>
        <p className="mt-10 text-xs text-neutral-400">
          Political relevance is determined by an automated keyword filter and may occasionally
          miss or misclassify a story. Headlines link out to the original publisher — thumbnail
          images are the publisher&apos;s own, shown as a preview only. {SITE.legalName} does not host
          or claim rights to third-party reporting shown here.
        </p>
      </section>
    </>
  );
}
