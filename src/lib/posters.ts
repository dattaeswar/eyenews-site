import fs from "node:fs";
import path from "node:path";

const POSTERS_FILE = path.join(process.cwd(), "content", "posters.json");

export interface Poster {
  title: string;
  image: string; // path under /public, e.g. "/posters/my-poster.jpg"
  href: string; // where the poster links out to
  addedAt: string; // ISO date, used only for sort order
  active?: boolean; // set to false to hide without deleting the entry
}

export function getActivePosters(): Poster[] {
  if (!fs.existsSync(POSTERS_FILE)) return [];
  const raw = fs.readFileSync(POSTERS_FILE, "utf8");
  let posters: Poster[];
  try {
    posters = JSON.parse(raw);
  } catch {
    return [];
  }
  return posters
    .filter((p) => p.active !== false)
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
}
