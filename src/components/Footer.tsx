import Link from "next/link";
import { CONTACT, FOUNDERS, SITE } from "@/lib/site-data";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/eyenews_india?igsh=aGd6MTBkamFwcnR1",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1GMtGHAGhA/",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@eyenews_india?si=YlzFAwtGJ0FYxxsB",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eye-news-27aa44422?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-primary-950 text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold text-white">{SITE.brandName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-accent-500">{SITE.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">{SITE.parentEntity}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-200">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/info" className="hover:text-white">Info</Link></li>
              <li><Link href="/practice-areas" className="hover:text-white">Practice Areas</Link></li>
              <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
              <li><Link href="/news-pulse" className="hover:text-white">News Pulse</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-200">Leadership</p>
            <ul className="mt-3 space-y-2 text-sm">
              {FOUNDERS.map((f) => (
                <li key={f.slug}>
                  <a href={`mailto:${f.email}`} className="hover:text-white">{f.name}</a>
                  <span className="block text-xs text-neutral-500">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-200">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`mailto:${CONTACT.primaryEmail}`} className="hover:text-white">
                  {CONTACT.primaryEmail}
                </a>
              </li>
              <li>
                <a href={`tel:+91${CONTACT.primaryPhone}`} className="hover:text-white">
                  +91 {CONTACT.primaryPhone}
                </a>
              </li>
              <li>
                <a href={SITE.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {SITE.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-center sm:gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-14 w-14 flex-1 basis-[calc(25%-0.75rem)] items-center justify-center rounded-2xl border border-white/10 text-neutral-400 transition hover:border-accent-400/60 hover:bg-white/5 hover:text-accent-400 sm:h-16 sm:w-16 sm:flex-none sm:basis-auto"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-neutral-500">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
