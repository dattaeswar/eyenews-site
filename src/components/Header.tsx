"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/info", label: "Info" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/insights", label: "Insights" },
  { href: "/news-pulse", label: "News Pulse" },
  { href: "/careers", label: "Careers" },
  { href: "/submit-article", label: "Submit Article" },
  { href: "/admin", label: "Admin" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-mark.png"
            alt={`${SITE.brandName} logo`}
            width={44}
            height={44}
            priority
            className="h-10 w-10 sm:h-11 sm:w-11"
          />
          <span className="font-serif text-base font-semibold leading-tight text-primary-900 sm:text-lg">
            EYE-NEWS
            <span className="block text-[0.65rem] font-sans font-medium uppercase tracking-[0.2em] text-accent-600">
              Indian Times
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-600 ${
                pathname === link.href ? "text-accent-600" : "text-neutral-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-primary-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium ${
                    pathname === link.href
                      ? "bg-primary-50 text-accent-600"
                      : "text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
