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
  database, no cron job
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

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — optional. Get a free key at web3forms.com. Without it,
  the Contact page form falls back to opening the visitor's email client instead of posting to
  Web3Forms.

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

## News Pulse sources

Feed list lives in [`src/lib/news/sources.ts`](src/lib/news/sources.ts). A few outlets named in
the original brief (Indian Express, PIB India, Reuters, AP News) no longer expose a working
public RSS feed as of 2026-08-22 and were swapped for equally mainstream outlets — see the
comment at the top of that file.

## Deploying

This is a static/ISR app with no database — it deploys to Vercel with zero extra configuration.

```bash
npm run build   # verify locally first
vercel          # or connect the GitHub repo in the Vercel dashboard for auto-deploys
```

Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the Vercel project's Environment Variables if you want
the contact form to submit via Web3Forms instead of the `mailto:` fallback.
