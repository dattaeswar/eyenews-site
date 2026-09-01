-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_bio TEXT,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  publication_date TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create submissions table (for pending articles awaiting approval)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  submitted_by_email TEXT NOT NULL,
  admin_notes TEXT,
  reviewed_by_email TEXT,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS articles_status_idx ON articles(status);
CREATE INDEX IF NOT EXISTS articles_publication_date_idx ON articles(publication_date DESC);
CREATE INDEX IF NOT EXISTS submissions_article_id_idx ON submissions(article_id);
CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions USING GIN(
  (CASE WHEN reviewed_at IS NULL THEN 'pending' ELSE 'reviewed' END)
);

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  performed_by_email TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles (public can view approved, authors/admin can see all)
CREATE POLICY "Public can view approved articles"
  ON articles FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can see article metadata"
  ON articles FOR SELECT
  USING (TRUE);

-- RLS Policies for submissions (only admin can see)
CREATE POLICY "Only admin can view submissions"
  ON submissions FOR SELECT
  USING (auth.jwt() ->> 'email' = 'eyenewsindiaa@gmail.com');

CREATE POLICY "Only admin can insert submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'eyenewsindiaa@gmail.com');

-- Function to update article status when submission is reviewed
CREATE OR REPLACE FUNCTION update_article_status_on_submission_review()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reviewed_at IS NOT NULL AND OLD.reviewed_at IS NULL THEN
    UPDATE articles
    SET status = CASE
      WHEN NEW.admin_notes IS NOT NULL AND NEW.admin_notes LIKE '%rejected%' THEN 'rejected'
      ELSE 'approved'
    END
    WHERE id = NEW.article_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER submission_review_trigger
AFTER UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_article_status_on_submission_review();
