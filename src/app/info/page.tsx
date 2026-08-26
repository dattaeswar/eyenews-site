import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import InfoGallery from "@/components/InfoGallery";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Info",
  description: `Ground Field & Campaign Moments from ${SITE.legalName}`,
};

export default function InfoPage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              Info
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Ground Field & Campaign Moments
            </h1>
            <p className="mt-4 text-neutral-300">
              Visual stories from our field operations, campaign engagements, and ground intelligence work.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn>
          <InfoGallery />
        </FadeIn>
      </section>
    </>
  );
}
