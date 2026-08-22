import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { SERVICES, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Practice Areas",
  description: `The practice areas of ${SITE.legalName} — ${SITE.tagline}`,
};

export default function PracticeAreasPage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              What we do
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Practice Areas</h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.05}>
              <div className="h-full rounded-lg border border-neutral-200 p-8">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                  0{i + 1}
                </span>
                <h2 className="mt-2 font-serif text-xl font-semibold text-primary-900">
                  {service.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
