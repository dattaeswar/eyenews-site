import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Article = {
  id: string;
  title: string;
  topic: string;
  body: string;
  author_name: string;
  author_bio: string;
  thumbnail_url: string;
  tags: string[];
  publication_date: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Submission = Article & {
  submitted_by_email: string;
  admin_notes?: string;
};
