import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SocialLinks from "@/components/SocialLinks";
import { FOUNDERS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: `The founders and philosophy behind ${SITE.legalName} — ${SITE.tagline}`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              About
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Grounded in the field. Built for impact.
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <FadeIn>
          <h2 className="font-serif text-2xl font-semibold text-primary-900">Our approach</h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">
            {SITE.legalName} operates through two entities working in tandem:{" "}
            <strong>EYE-PAC INDIA CONSULTING PRIVATE LIMITED</strong>, which builds data-driven
            political strategy and campaign solutions, and <strong>EYE NEWS INDIA</strong>, which
            strengthens political and public-interest communication in the digital era. Together
            they combine grassroots intelligence, field operations, strategic thinking, technology
            and media into one practice — because understanding people, local issues and the
            realities of public life is where every effective campaign has to start.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-16 px-4 sm:px-6">
          {FOUNDERS.map((founder, i) => (
            <FadeIn key={founder.slug} delay={i * 0.1}>
              <div className="grid gap-8 sm:grid-cols-[200px_1fr] sm:items-start">
                <div className="mx-auto sm:mx-0">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={200}
                    height={200}
                    className="h-44 w-44 rounded-full border-4 border-white object-cover shadow-md sm:h-48 sm:w-48"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-primary-900">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-accent-600">
                    {founder.title}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-neutral-700">{founder.bio}</p>
                  <div className="mt-5">
                    <SocialLinks socials={founder.socials} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
