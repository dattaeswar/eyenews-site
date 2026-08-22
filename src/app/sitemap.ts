import type { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/insights";
import { SITE } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/practice-areas",
    "/insights",
    "/news-pulse",
    "/contact",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));

  const insightRoutes = getAllInsights().map((post) => ({
    url: `${SITE.url}/insights/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  return [...staticRoutes, ...insightRoutes];
}
