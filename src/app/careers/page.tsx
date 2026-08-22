import type { Metadata } from "next";
import CareersForm from "@/components/CareersForm";
import FadeIn from "@/components/FadeIn";
import { JOB_OPENINGS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the ${SITE.legalName} team — field operations, media and data-driven political strategy.`,
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              Careers
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Join the team
            </h1>
            <p className="mt-4 text-neutral-300">
              We work at the intersection of grassroots intelligence, political strategy, media
              and technology. If that's where you want to build your career, we'd like to hear
              from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {JOB_OPENINGS.length === 0 ? (
          <FadeIn className="mb-12 rounded-lg border border-dashed border-neutral-300 p-8 text-center">
            <p className="text-neutral-600">
              There are no specific openings listed right now — we still welcome applications
              from people who want to be part of this team. Tell us where you'd fit in below.
            </p>
          </FadeIn>
        ) : (
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {JOB_OPENINGS.map((job) => (
              <div key={job.slug} className="rounded-lg border border-neutral-200 p-5">
                <h3 className="font-serif text-lg font-semibold text-primary-900">{job.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {job.location} · {job.type}
                </p>
              </div>
            ))}
          </div>
        )}

        <FadeIn>
          <h2 className="font-serif text-2xl font-semibold text-primary-900">Apply</h2>
          <div className="mt-6 max-w-2xl">
            <CareersForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
