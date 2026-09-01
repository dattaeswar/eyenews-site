# Eye News Admin System - Complete Setup Checklist

## 📋 What Was Built

✅ **Article Submission System** (`/submit-article`)
- Authors submit articles with thumbnail, title, topic, body, tags, date
- Images auto-upload to Supabase Storage
- Auto-creates submission record awaiting admin approval

✅ **Admin Dashboard** (`/admin`)
- View all pending submissions
- Approve/reject with admin notes
- View history of reviewed submissions
- Admin-only access (hardcoded to `eyenewsindiaa@gmail.com`)

✅ **Published Article View** (`/article/[id]`)
- Display approved articles with formatting
- Show metadata: author, topic, tags, date
- **Download as PDF** button (uses html2canvas + jsPDF)

✅ **Database Schema**
- `articles` table (stores content)
- `submissions` table (tracks approvals)
- `audit_logs` table (tracks all actions)
- Row Level Security policies
- Auto-status updates on approval

## 🚀 Quick Start (5 Steps)

### 1. Supabase Configuration
Location: **Supabase Dashboard** (project: `ifmpahiibruhzzakrshp`)

**Tasks:**
- [ ] Create storage bucket: `article-thumbnails` (make it PUBLIC)
- [ ] Run SQL migration from `supabase/migrations/001_create_articles_schema.sql`
- [ ] Copy Anon Key from **Settings → API**
- [ ] Paste into `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key_here>
  ```

### 2. Install Dependencies
```bash
cd "C:\Users\datta\Documents\eye news\claude stuff\eyenews-site"
npm install
```

### 3. Test Locally
```bash
npm run dev
# Opens http://localhost:3000
```

Test routes:
- [ ] `/submit-article` - Submit a test article
- [ ] `/admin` - View pending submission
- [ ] Approve the article in admin dashboard
- [ ] `/article/{article-id}` - View published article
- [ ] Download PDF button works

### 4. Deploy to Vercel
Vercel Account: `eyenewsindiaa@gmail.com`

**Tasks:**
- [ ] Login to Vercel with `eyenewsindiaa@gmail.com`
- [ ] Create new project (import from GitHub)
- [ ] Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Any existing Web3Forms keys
- [ ] Deploy
- [ ] Get Vercel URL (e.g., eyenews-site-xyz.vercel.app)

### 5. Connect Domain (eyenews.in)
Registrar: Your domain provider (GoDaddy/etc)

**Tasks:**
- [ ] In Vercel: **Settings → Domains** → Add `eyenews.in`
- [ ] Copy nameservers from Vercel
- [ ] In domain registrar: Update nameservers
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Verify: Visit `https://eyenews.in`

## 📁 Key Files Created/Modified

```
eyenews-site/
├── package.json (added @supabase/supabase-js, jspdf, html2canvas)
├── .env.local (added SUPABASE credentials)
├── .env.example (documented env vars)
├── src/
│   ├── lib/
│   │   └── supabase.ts (Supabase client)
│   └── app/
│       ├── submit-article/page.tsx (submission form)
│       ├── admin/page.tsx (admin dashboard)
│       └── article/[id]/page.tsx (published article view)
├── supabase/
│   └── migrations/
│       └── 001_create_articles_schema.sql (database schema)
├── SUPABASE_SETUP.md (detailed Supabase guide)
├── DEPLOYMENT.md (domain + Vercel guide)
└── SETUP_CHECKLIST.md (this file)
```

## 🔐 Access Control

**Public Routes:**
- `/` - Home
- `/about` - About page
- `/news-pulse` - News
- `/submit-article` - Submission form (anyone can submit)
- `/article/[id]` - View published articles (only approved articles visible)

**Admin-Only Routes:**
- `/admin` - Admin dashboard (checks email = `eyenewsindiaa@gmail.com`)

**Database:**
- Row Level Security (RLS) enforces permissions at database level
- Submissions table: Only admin email can access
- Articles: Public can see approved only

## 📧 Admin Email

**Current:** `eyenewsindiaa@gmail.com`

To change:
1. Search project for `eyenewsindiaa@gmail.com`
2. Update in:
   - `src/app/admin/page.tsx` (2 places)
   - `supabase/migrations/001_create_articles_schema.sql` (3 places)
3. Re-run migration in Supabase

## 💾 Database

**articles** table:
- `id` (UUID) - Auto-generated
- `title` - Article headline
- `topic` - Category (e.g., "Politics", "Sports")
- `body` - Full article text
- `author_name` - Author's name
- `author_bio` - Short bio
- `thumbnail_url` - Featured image from Supabase Storage
- `tags` - Array of tags (e.g., ["Delhi", "Elections"])
- `publication_date` - When article should be published
- `status` - "draft", "pending", "approved", or "rejected"

**submissions** table:
- Links articles to approval workflow
- Tracks: submitted_by_email, reviewed_by_email, review_date, admin_notes

## 🧪 Testing

### Test Submission Flow
1. Go to `/submit-article`
2. Fill form:
   - Email: test@example.com
   - Name: Test Author
   - Title: "Test Article"
   - Topic: "Testing"
   - Body: Some test content
   - Tags: test, demo
   - Upload an image
3. Click Submit
4. Check admin dashboard `/admin` - article shows as "Pending"

### Test Admin Approval
1. Go to `/admin`
2. Click "Review" on pending article
3. Add optional admin notes
4. Click "Approve"
5. Article status changes to "approved"

### Test Article View
1. Copy article ID from admin dashboard
2. Visit `/article/{article-id}`
3. Verify content displays correctly
4. Click "Download as PDF"
5. Check PDF downloads with full formatting

## ⚠️ Important Notes

- **No authentication system yet** - anyone can submit (can add later)
- **Admin access is IP/email-based** - RLS policies check email in JWT
- **PDF download works client-side** - uses html2canvas + jsPDF
- **Storage is public** - anyone can access image URLs
- **Supabase free tier limits**:
  - 500MB storage
  - 2GB bandwidth
  - No custom domains
  - Scales with growth

## 📞 Support

**Docs:**
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs

**Troubleshooting:**
1. Check browser console for errors (F12 → Console)
2. Check Vercel deployment logs
3. Check Supabase logs (SQL queries)
4. Verify environment variables loaded

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add authentication system (Supabase Auth)
- [ ] Email notifications (Supabase Edge Functions)
- [ ] Comment system on articles
- [ ] Search/filter articles
- [ ] Draft mode for authors
- [ ] Publishing schedule (publish at specific date/time)
- [ ] Article analytics (views, engagement)
- [ ] Editor role (not admin, but can approve)
- [ ] Custom domain for admin dashboard
- [ ] Rate limiting on submissions

---

**Status:** Ready to deploy ✅
**Domain:** eyenews.in (waiting for DNS setup)
**Admin Email:** eyenewsindiaa@gmail.com
**Supabase Project:** ifmpahiibruhzzakrshp
