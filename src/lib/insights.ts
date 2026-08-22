import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export interface InsightFrontmatter {
  title: string;
  date: string; // ISO date, e.g. 2026-08-01
  summary: string;
  author?: string;
  tags?: string[];
}

export interface InsightPost {
  slug: string;
  frontmatter: InsightFrontmatter;
  content: string;
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs.readdirSync(INSIGHTS_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllInsights(): InsightPost[] {
  const posts = listMdxFiles().map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as InsightFrontmatter, content };
  });

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

export function getInsightBySlug(slug: string): InsightPost | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as InsightFrontmatter, content };
}
