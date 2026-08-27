# EYE-NEWS INDIAN TIMES

Website for EYE NEWS INDIA — political strategy, grassroots intelligence and media, under the
tagline "Truth. Insight. Impact." Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, MDX
content, live RSS aggregation, no database.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 — brand palette in [`tailwind.config.ts`](tailwind.config.ts), wired via the
  `@config` directive in [`src/app/globals.css`](src/app/globals.css)
- Content: MDX files in [`content/insights/`](content/insights) — no CMS, no database
- Framer Motion for the intro animation and section reveals
- News Pulse: `rss-parser` + Next's built-in data cache (`next: { revalidate: 1800 }`) — no
  database. A free GitHub Actions workflow
  ([`.github/workflows/warm-news-pulse.yml`](.github/workflows/warm-news-pulse.yml)) pings the
  page every 20 minutes so the ISR cache refreshes on a schedule instead of only when a visitor
  happens to land after it goes stale
- Contact form: [Web3Forms](https://web3forms.com) (free, no backend) with a `mailto:` fallback
  when no access key is configured

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you have:

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — optional. Get a free key at web3forms.com, using the
  inbox you want enquiries to land in. Without it, the Contact page form falls back to opening
  the visitor's email client instead of posting to Web3Forms.
- `NEXT_PUBLIC_WEB3FORMS_CAREERS_ACCESS_KEY` — optional, only if you want Careers applications
  routed separately from Contact enquiries (own inbox/Sheet). Falls back to the key above.

### Logging every enquiry to a Google Sheet

Web3Forms has a built-in, free "Google Sheets" integration (their dashboard → your form →
Integrations → connect Google Sheets) that appends every submission as a row, on top of the
email it already sends. Turn that on once per access key and every Contact/Careers submission
is both emailed *and* logged — no extra code here, and no separate database to maintain.

## Adding an Insights article

Create a new `.mdx` file in `content/insights/`, e.g. `content/insights/my-post.mdx`:

```mdx
---
title: "Post title"
date: "2026-08-22"
summary: "One or two sentences shown on the listing page and in link previews."
author: "Optional author name"
tags: ["optional", "tags"]
---

Article body in Markdown/MDX goes here.
```

It appears automatically on `/insights` and at `/insights/my-post` — no rebuild step beyond a
normal deploy.

## Brand palette

`tailwind.config.ts` documents exactly how each color was derived (node-vibrant extraction from
the client's logo, WCAG AA contrast verification, etc). Re-run the scripts if the logo ever
changes:

```bash
node scripts/extract-colors.mjs   # raw node-vibrant swatches from public/brand/logo-mark.png
node scripts/build-palette.mjs    # full 50-950 scale + contrast report
```

## Adding a Featured Poster to the homepage

The "From the desk" section on the homepage (below the gallery) is driven by
[`content/posters.json`](content/posters.json) — no CMS, no login, no database. To add one:

1. Drop the image into `public/posters/` (a portrait/4:5-ish crop looks best).
2. Add an entry to `content/posters.json`:

```json
{
  "title": "Headline shown on the poster card",
  "image": "/posters/my-poster.jpg",
  "href": "https://example.com/the-article-or-post-this-links-to",
  "addedAt": "2026-08-22"
}
```

3. Push/redeploy. The section is hidden entirely when the array is empty, and posters are
   sorted newest-first by `addedAt`. Set `"active": false` on an entry to hide it without
   deleting it.

## Gallery photos

The "Field & campaign moments" section on the homepage reads from
[`src/components/GalleryGrid.tsx`](src/components/GalleryGrid.tsx), which lists each photo's
file path plus its intrinsic width/height (needed by `next/image` to avoid layout shift). To
add a photo: drop the file in `public/gallery/` and add a matching entry to the `PHOTOS` array.

## Careers page

`/careers` uses [`CareersForm`](src/components/CareersForm.tsx) — same Web3Forms/`mailto:`
pattern as Contact, plus an optional resume upload (Web3Forms supports file attachments via
multipart form submission). `JOB_OPENINGS` in [`site-data.ts`](src/lib/site-data.ts) is empty by
default (ships as a general "we're always open to applications" page); add entries there if you
want specific listed roles.

## News Pulse: sources, regions & political filtering

News Pulse is political-news-only, split into six tabs: Andhra Pradesh, Telangana, Bihar,
Delhi, India, International.

- **Sources** — [`src/lib/news/sources.ts`](src/lib/news/sources.ts). Each state tab is fed by a
  dedicated regional desk feed: The Hindu's AP and Telangana desks; The Hindu's Bihar desk plus
  Hindustan Times Patna for Bihar; The Hindu's Delhi desk plus Hindustan Times Delhi for Delhi.
  National feeds (NDTV, TOI, Hindustan Times, India Today) and international feeds (BBC, Al
  Jazeera, Guardian, France 24) feed India and International. Bihar and Delhi previously had no
  dedicated feed and depended entirely on the handful of national "top stories" matching a
  narrow keyword list, so those two tabs were almost always empty — the regional feeds fix that.
  A few outlets named in the original brief (Indian Express, PIB India, Reuters, AP News) no
  longer expose a working public RSS feed as of 2026-08-22 and were swapped for equally
  mainstream outlets. CNN's world feed was dropped after it started serving sponsored
  personal-finance content instead of news.
- **Political filtering** — [`src/lib/news/political-filter.ts`](src/lib/news/political-filter.ts)
  is a plain keyword list (party names, government/election vocabulary, etc), not a trained
  classifier. It's deliberately simple so you can tune it yourself — add or remove a string from
  the arrays and redeploy. It will occasionally miss a political story that doesn't use any of
  the listed keywords, or let through an edge case that does; there's no paid political-news API
  behind this.
- **State routing** — a national-feed item mentioning an AP, Telangana, Bihar or Delhi keyword
  (city names, party names, leaders) is routed to that state's tab instead of the general India
  one; see `AP_KEYWORDS` / `TELANGANA_KEYWORDS` / `BIHAR_KEYWORDS` / `DELHI_KEYWORDS` in the same
  file. `DELHI_KEYWORDS` deliberately omits a bare "delhi" match so national-government stories
  with a routine Delhi dateline don't flood that tab.
- **Article images** — pulled from each feed's own `media:content` / `media:thumbnail` /
  `enclosure` tag (the same preview images Google News, Feedly, or Inshorts show) and hotlinked
  directly, not rehosted. Items whose feed doesn't include an image (BBC, Al Jazeera, India
  Today) get a tinted placeholder card instead of a broken image.

## Deploying

This is a static/ISR app with no database — it deploys to Vercel with zero extra configuration.

```bash
npm run build   # verify locally first
vercel          # or connect the GitHub repo in the Vercel dashboard for auto-deploys
```

Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the Vercel project's Environment Variables if you want
the contact form to submit via Web3Forms instead of the `mailto:` fallback.
