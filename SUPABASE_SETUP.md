# Supabase Setup Guide for Eye News Article Submission System

## Overview
This guide walks through setting up Supabase as the backend for the article submission, admin approval, and PDF download system.

## Prerequisites
- Supabase account (free tier works)
- Supabase project reference: `ifmpahiibruhzzakrshp`
- Admin email: `eyenewsindiaa@gmail.com`

## Step-by-Step Setup

### 1. Create Storage Bucket
In Supabase dashboard:
1. Go to **Storage** → **Buckets**
2. Click **New bucket**
3. Name it: `article-thumbnails`
4. Make it **Public**
5. Click **Create bucket**

### 2. Run Database Schema Migration
In Supabase dashboard:
1. Go to **SQL Editor** → **New query**
2. Copy and paste the contents of `supabase/migrations/001_create_articles_schema.sql`
3. Click **Run**

The schema creates:
- `articles` table (stores article content)
- `submissions` table (tracks pending approvals)
- `audit_logs` table (logs all actions)
- Row Level Security policies
- Automatic approval workflow

### 3. Configure Environment Variables
In `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ifmpahiibruhzzakrshp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
```

Get `NEXT_PUBLIC_SUPABASE_ANON_KEY`:
1. Go to **Project Settings** → **API**
2. Copy the `anon` key
3. Paste into `.env.local`

### 4. Install Dependencies
```bash
npm install
# or
yarn install
```

### 5. Test the System

#### Submit an Article
1. Navigate to `/submit-article`
2. Fill out the form with:
   - Your email (e.g., test@example.com)
   - Author details
   - Article content
   - Upload a thumbnail image
3. Submit

#### Admin Dashboard
1. Navigate to `/admin`
2. You'll see pending submissions
3. Review and approve/reject articles
4. Approved articles become publishable

#### View Published Articles
1. After admin approval, articles appear with their ID
2. Navigate to `/article/{article-id}`
3. Click **Download as PDF** to generate PDF

## Database Schema

### articles table
```
- id: UUID (primary key)
- title: TEXT
- topic: TEXT
- body: TEXT
- author_name: TEXT
- author_bio: TEXT (optional)
- thumbnail_url: TEXT (optional)
- tags: TEXT[] (array)
- publication_date: TIMESTAMP
- status: TEXT ('draft', 'pending', 'approved', 'rejected')
- created_at, updated_at: TIMESTAMPS
```

### submissions table
```
- id: UUID (primary key)
- article_id: UUID (references articles)
- submitted_by_email: TEXT
- admin_notes: TEXT (optional)
- reviewed_by_email: TEXT (optional)
- reviewed_at: TIMESTAMP (optional)
- created_at, updated_at: TIMESTAMPS
```

### audit_logs table
```
- id: UUID
- article_id: UUID
- action: TEXT (e.g., 'article_submitted', 'article_approved')
- performed_by_email: TEXT
- notes: TEXT (optional)
- created_at: TIMESTAMP
```

## Features

### 1. Article Submission (`/submit-article`)
- Authors can submit articles with thumbnail, metadata, and body
- Automatic image upload to Supabase Storage
- Submissions stored with "pending" status
- Auto-creates audit log entry

### 2. Admin Dashboard (`/admin`)
- View all pending submissions
- Review and approve/reject with notes
- Auto-updates article status on approval
- Track reviewed submissions
- Protected by admin email check

### 3. Article View (`/article/[id]`)
- Display published (approved) articles
- Show metadata: author, topic, tags, publication date
- **Download as PDF** functionality
- Responsive design

## Admin-Only Email
Currently hardcoded to: `eyenewsindiaa@gmail.com`

To change this:
1. Search for `eyenewsindiaa@gmail.com` in:
   - `src/app/admin/page.tsx`
   - `supabase/migrations/001_create_articles_schema.sql`
2. Update all references

## Row Level Security (RLS) Policies

- **Articles**: Public can view approved articles only
- **Submissions**: Only admin email can view/manage
- **Audit logs**: Protected

## Vercel Deployment

When deploying to Vercel:
1. Add environment variables in **Settings** → **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy the application

## Troubleshooting

### Articles not showing in admin dashboard
- Check RLS policies in Supabase
- Verify `submissions` table has records
- Check browser console for errors

### Image upload failing
- Verify `article-thumbnails` bucket exists and is public
- Check CORS settings in Storage bucket

### PDF download not working
- Ensure `jspdf` and `html2canvas` are installed
- Check browser console for errors
- Try with a different browser

## Future Enhancements
- Email notifications on approval/rejection
- Editor role (not admin, but can approve)
- Draft mode for authors to save work
- Search and filter articles
- Comment system for articles
- Article analytics/views tracking
