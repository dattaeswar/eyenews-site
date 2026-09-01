"use client";

import { useState } from "react";
import { GridArticleCard, LeadArticleCard } from "@/components/ArticleCard";
import type { NewsItem, NewsRegion } from "@/lib/news/fetch-news";

const REGIONS: { key: NewsRegion; label: string; accent: string }[] = [
  { key: "andhraPradesh", label: "Andhra Pradesh", accent: "bg-saffron" },
  { key: "telangana", label: "Telangana", accent: "bg-flagGreen" },
  { key: "maharashtra", label: "Maharashtra", accent: "bg-orange-500" },
  { key: "karnataka", label: "Karnataka", accent: "bg-purple-500" },
  { key: "tamilNadu", label: "Tamil Nadu", accent: "bg-pink-600" },
  { key: "westBengal", label: "West Bengal", accent: "bg-red-600" },
  { key: "utarPradesh", label: "Uttar Pradesh", accent: "bg-blue-600" },
  { key: "rajasthan", label: "Rajasthan", accent: "bg-amber-700" },
  { key: "gujarat", label: "Gujarat", accent: "bg-indigo-600" },
  { key: "madhyaPradesh", label: "Madhya Pradesh", accent: "bg-cyan-600" },
  { key: "punjab", label: "Punjab", accent: "bg-yellow-600" },
  { key: "haryana", label: "Haryana", accent: "bg-sky-600" },
  { key: "himachal", label: "Himachal Pradesh", accent: "bg-green-700" },
  { key: "uttarakhand", label: "Uttarakhand", accent: "bg-emerald-600" },
  { key: "jharkhand", label: "Jharkhand", accent: "bg-lime-600" },
  { key: "odisha", label: "Odisha", accent: "bg-teal-600" },
  { key: "assam", label: "Assam", accent: "bg-violet-600" },
  { key: "kerala", label: "Kerala", accent: "bg-rose-600" },
  { key: "bihar", label: "Bihar", accent: "bg-fuchsia-600" },
  { key: "delhi", label: "Delhi", accent: "bg-red-500" },
  { key: "tripura", label: "Tripura", accent: "bg-slate-600" },
  { key: "manipur", label: "Manipur", accent: "bg-stone-600" },
  { key: "mizoram", label: "Mizoram", accent: "bg-zinc-600" },
  { key: "nagaland", label: "Nagaland", accent: "bg-neutral-600" },
  { key: "goa", label: "Goa", accent: "bg-orange-600" },
  { key: "ladakh", label: "Ladakh", accent: "bg-blue-700" },
  { key: "sikkim", label: "Sikkim", accent: "bg-green-600" },
  { key: "chandigarh", label: "Chandigarh", accent: "bg-purple-600" },
  { key: "puducherry", label: "Puducherry", accent: "bg-pink-500" },
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
