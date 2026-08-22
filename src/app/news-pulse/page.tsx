import type { Metadata } from "next";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import LivePill from "@/components/LivePill";
import NewsPulsePanel from "@/components/NewsPulsePanel";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "News Pulse",
  description: "National and international political headlines, aggregated live.",
};

function PanelSkeleton() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {[0, 1].map((col) => (
        <div key={col} className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-md bg-neutral-100" />
          ))}
        </div>
      ))}
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
              National and international political headlines, refreshed automatically every 30
              minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Suspense fallback={<PanelSkeleton />}>
          <NewsPulsePanel />
        </Suspense>
        <p className="mt-10 text-xs text-neutral-400">
          Headlines link out to the original publisher. {SITE.legalName} does not host or claim
          rights to third-party reporting shown here.
        </p>
      </section>
    </>
  );
}
