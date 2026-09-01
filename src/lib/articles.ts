import { supabase } from "./supabase";

export type DbArticle = {
  id: string;
  title: string;
  topic: string;
  body: string;
  author_name: string;
  author_bio: string;
  thumbnail_url: string;
  tags: string[];
  publication_date: string;
  status: "draft" | "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
};

// Thumbnail + body limits shared by the submit form and the admin editor.
export const THUMBNAIL_RULES = {
  recommendedWidth: 1200,
  recommendedHeight: 675, // 16:9
  minWidth: 800,
  minHeight: 450,
  maxBytes: 2 * 1024 * 1024, // 2 MB
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
};

export const BODY_RULES = {
  min: 200,
  max: 50000, // ~9,000 words
};

export async function getApprovedArticles(): Promise<DbArticle[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "approved")
    .order("publication_date", { ascending: false });

  if (error) {
    console.error("getApprovedArticles failed:", error.message);
    return [];
  }
  return (data ?? []) as DbArticle[];
}
