# 🚀 EXECUTE NOW - Complete Setup in 30 Minutes

Everything is built and ready. Follow these exact steps.

---

## Step 1: Supabase Setup (5 min)
**Go to:** https://supabase.com → Your project (ifmpahiibruhzzakrshp)

### 1.1 Create Storage Bucket
1. Click **Storage** in sidebar
2. Click **+ New Bucket**
3. Name: `article-thumbnails`
4. ✅ Make it **Public**
5. Click **Create**

### 1.2 Run Database Migration
1. Click **SQL Editor** in sidebar
2. Click **+ New Query**
3. Copy entire contents of:
   ```
   C:\Users\datta\Documents\eye news\claude stuff\eyenews-site\supabase\migrations\001_create_articles_schema.sql
   ```
4. Paste into SQL editor
5. Click **Run**
6. Wait for success (should see "OK" message)

### 1.3 Get Your Anon Key
1. Click **Settings** (bottom left) → **API**
2. Under "Project API Keys"
3. Find the `anon` key
4. Click copy icon
5. **Keep this copied** - paste next step

---

## Step 2: Update Environment Variables (2 min)

Open file:
```
C:\Users\datta\Documents\eye news\claude stuff\eyenews-site\.env.local
```

Find this line:
```
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY_HERE"
```

Replace with your copied key:
```
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJSUzI1... <your_actual_key>"
```

Save file (Ctrl+S).

---

## Step 3: Test Locally (5 min)

Open **PowerShell** and run:

```powershell
cd "C:\Users\datta\Documents\eye news\claude stuff\eyenews-site"
npm run dev
```

Wait for:
```
▲ Next.js 16.3.2 (Turbopack)
  ✓ Ready in 1234ms

  ➜  Local:        http://localhost:3000
  ➜  Environments: .env.local
```

### 3.1 Test Submission Form
1. Open browser: `http://localhost:3000/submit-article`
2. Fill form:
   - Email: `test@yourname.com`
   - Author Name: `Test Author`
   - Title: `My First Article`
   - Topic: `Testing`
   - Body: `This is a test article content.`
   - Tags: `test, demo`
   - Upload an image (any image file)
   - Publication Date: Today
3. Click **Submit Article**
4. Should see: "Article submitted successfully!"

### 3.2 Test Admin Dashboard
1. Open: `http://localhost:3000/admin`
2. You should see your submitted article in "Pending Submissions"
3. Click **Review**
4. Add notes (optional): `Looks good`
5. Click **Approve**
6. Article moves to "Reviewed Submissions" with status "approved"

### 3.3 Test Article View & PDF Download
1. Copy the article ID from admin dashboard (the UUID)
2. Open: `http://localhost:3000/article/{article-id}`
   - Example: `http://localhost:3000/article/550e8400-e29b-41d4-a716-446655440000`
3. You should see the article rendered with:
   - Thumbnail image
   - Title
   - Topic & tags
   - Author info
   - Body text
4. Click **Download as PDF**
5. PDF downloads to your Downloads folder ✅

### 3.4 Exit Dev Server
Press: `Ctrl+C` in PowerShell

---

## Step 4: Deploy to Vercel (10 min)

### 4.1 Create Vercel Account
1. Go to: https://vercel.com
2. Click **Sign Up**
3. Use email: `eyenewsindiaa@gmail.com`
4. Complete signup

### 4.2 Create Project
1. Click **Add New...**
2. Select **Project**
3. Click **Import Git Repository**
4. Connect GitHub (if not already connected)
5. Select `eyenews-site` repository
6. Click **Import**

### 4.3 Add Environment Variables
1. In deployment settings, find **Environment Variables**
2. Add these TWO variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ifmpahiibruhzzakrshp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <your_key_from_step_2>
   ```
3. Click **Deploy**
4. Wait for build to complete (2-3 minutes)
5. You'll get a URL like: `https://eyenews-site-xyz.vercel.app`

### 4.4 Test Vercel Deployment
1. Open the Vercel URL
2. Test all routes:
   - `/submit-article`
   - `/admin`
   - `/article/{article-id}`
3. Verify PDF download works

---

## Step 5: Connect Domain eyenews.in (15 min)

### 5.1 Add Domain in Vercel
1. In Vercel project, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `eyenews.in`
4. Click **Add**
5. Vercel shows nameservers:
   ```
   ns-123.vercel-dns.com
   ns-456.vercel-dns.com
   ```
6. **Copy these nameservers**

### 5.2 Update Domain Registrar
**Where you bought eyenews.in** (GoDaddy, Namecheap, etc.):

1. Go to domain settings
2. Find "Nameservers"
3. Replace with Vercel nameservers
4. Save changes

### 5.3 Wait for DNS (24-48 hours)
- Check status in Vercel (may say "Pending" initially)
- Within 24-48 hours, DNS propagates
- Status changes to "Connected" ✅
- You can then access: `https://eyenews.in`

### 5.4 Verify Live Domain
Once DNS is connected:
1. Visit `https://eyenews.in`
2. Test all routes work
3. Verify HTTPS certificate (green lock icon)

---

## ✅ Success Checklist

- [ ] Supabase storage bucket created
- [ ] Database migration ran (tables created)
- [ ] Anon key added to `.env.local`
- [ ] Local dev server tested all routes
- [ ] Article submitted and approved locally
- [ ] PDF download works locally
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Vercel deployment successful
- [ ] Vercel URL tested (all routes work)
- [ ] Domain nameservers updated
- [ ] Domain connected to Vercel (DNS propagated)
- [ ] Live site working at eyenews.in

---

## 🎯 You're Done When:

1. ✅ Can visit `https://eyenews.in/submit-article`
2. ✅ Can submit article
3. ✅ Can approve it in `/admin`
4. ✅ Can view published article
5. ✅ Can download as PDF

---

## ⚠️ Troubleshooting

### Supabase migration failed
- Check SQL syntax (copy-paste entire file)
- Check for error message at bottom
- Retry the query

### env variables not loading
- Make sure `.env.local` is saved
- Stop dev server and restart with `npm run dev`
- Check key is pasted completely (no truncation)

### Admin dashboard shows no submissions
- Verify article was submitted (check browser console)
- Check Supabase SQL Editor: `SELECT * FROM submissions;`
- Verify RLS policies created (run migration again)

### Domain still shows "Pending" after 48h
- Verify nameservers in registrar (not in Vercel)
- Check DNS propagation: https://dnschecker.org
- Contact domain registrar support

### PDF download not working
- Try different article
- Check browser console (F12)
- Verify article has thumbnail image

---

## 📞 Once Live

Send this message:
```
✅ Eye News article submission system is live!

📝 Submit articles: https://eyenews.in/submit-article
🔐 Admin dashboard: https://eyenews.in/admin
📖 View articles: https://eyenews.in/article/{id}

Admin email: eyenewsindiaa@gmail.com
```

---

**Questions?** Check the detailed guides:
- `SUPABASE_SETUP.md` - Detailed Supabase docs
- `DEPLOYMENT.md` - Domain configuration details
- `SETUP_CHECKLIST.md` - Complete reference

**You've got this! 🚀**
