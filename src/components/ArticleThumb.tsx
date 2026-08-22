"use client";

import { useState } from "react";

const PLACEHOLDER_COLORS = [
  "from-primary-800 to-primary-950",
  "from-accent-700 to-primary-950",
  "from-primary-700 to-neutral-900",
  "from-[#7a5b12] to-primary-950",
  "from-[#1f5233] to-primary-950",
];

function placeholderIndex(source: string): number {
  let hash = 0;
  for (let i = 0; i < source.length; i++) hash = (hash * 31 + source.charCodeAt(i)) | 0;
  return Math.abs(hash) % PLACEHOLDER_COLORS.length;
}

// Publishers' own RSS thumbnails, hotlinked as a preview only (same model as any news
// aggregator — Inshorts, Google News, Feedly). Plain <img>, not next/image: the source list
// spans many external hosts that change over time, so we don't maintain a remotePatterns
// allowlist per publisher. Falls back to a source-tinted placeholder if the image 404s.
export default function ArticleThumb({
  src,
  source,
  className,
}: {
  src?: string;
  source: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br text-3xl font-serif font-semibold text-white/90 ${PLACEHOLDER_COLORS[placeholderIndex(source)]} ${className ?? ""}`}
      >
        {source.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
