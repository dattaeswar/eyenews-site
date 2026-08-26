import Link from "next/link";
import { CONTACT, FOUNDERS, SITE } from "@/lib/site-data";

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
              <li>{SITE.domain}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="mb-4 flex gap-4">
            <a href="https://instagram.com/eyenewsindia" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition">Instagram</a>
            <a href="https://youtube.com/eyenewsindia" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition">YouTube</a>
            <a href="https://facebook.com/eyenewsindia" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition">Facebook</a>
            <a href="https://twitter.com/eyenewsindia" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition">Twitter</a>
          </div>
          <p className="text-xs text-neutral-500">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="mt-3 text-xs text-neutral-600 opacity-60">
            Website Designed & Developed by <a href="https://claudecode.ai" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500">Claude Code</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
