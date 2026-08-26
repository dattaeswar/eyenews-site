import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";
import { CONTACT, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.legalName}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
              Contact
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Get in touch</h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn>
          <h2 className="font-serif text-2xl font-semibold text-primary-900">
            Reach us directly
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm text-neutral-500">Email</p>
              <a href={`mailto:${CONTACT.primaryEmail}`} className="mt-1 block text-sm font-semibold text-primary-700 hover:underline">
                {CONTACT.primaryEmail}
              </a>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Phone</p>
              <a href={`tel:+91${CONTACT.primaryPhone}`} className="block text-sm font-semibold text-primary-700 hover:underline">
                +91 {CONTACT.primaryPhone}
              </a>
            </div>
            <div className="border-t border-neutral-200 pt-4">
              <p className="text-sm text-neutral-500">Web</p>
              <a
                href={SITE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-700 hover:underline"
              >
                {SITE.domain}
              </a>
            </div>
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-2xl font-semibold text-primary-900">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
