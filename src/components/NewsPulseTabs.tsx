"use client";

import { useState } from "react";
import { GridArticleCard, LeadArticleCard } from "@/components/ArticleCard";
import type { NewsItem, NewsRegion } from "@/lib/news/fetch-news";

const REGIONS: { key: NewsRegion; label: string; accent: string }[] = [
  { key: "andhraPradesh", label: "Andhra Pradesh", accent: "bg-saffron" },
  { key: "telangana", label: "Telangana", accent: "bg-flagGreen" },
  { key: "india", label: "India", accent: "bg-primary-600" },
  { key: "international", label: "International", accent: "bg-accent-600" },
];

export default function NewsPulseTabs({ data }: { data: Record<NewsRegion, NewsItem[]> }) {
  const [active, setActive] = useState<NewsRegion>("andhraPradesh");
  const items = data[active];
  const [lead, ...rest] = items;
  const activeRegion = REGIONS.find((r) => r.key === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
        {REGIONS.map((region) => (
          <button
            key={region.key}
            onClick={() => setActive(region.key)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === region.key
                ? "bg-primary-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${region.accent}`} aria-hidden />
            {region.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No political headlines matched for {activeRegion.label} right now — sources refresh
            every 30 minutes.
          </p>
        ) : (
          <div className="space-y-5">
            <LeadArticleCard item={lead} />
            {rest.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {rest.map((item) => (
                  <GridArticleCard key={item.link} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
