# Deployment Guide: eyenews.in Domain & Vercel Setup

## Current Status
- Domain: `eyenews.in` (registered in GoDaddy/domain registrar)
- Vercel Account: `eyenewsindiaa@gmail.com` (new account for production)
- Previous Account: `datta-eswars-projects` (development)

## Step 1: Create Vercel Project (New Account)

1. Sign up/Login to [Vercel](https://vercel.com) with `eyenewsindiaa@gmail.com`
2. Import the eyenews-site repository:
   - Click **"New Project"**
   - Connect GitHub account
   - Select `eyenews-site` repo
   - Deploy

## Step 2: Add Environment Variables to Vercel

1. Go to project **Settings** → **Environment Variables**
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ifmpahiibruhzzakrshp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <your_anon_key_from_supabase>
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = <existing_key>
   NEXT_PUBLIC_WEB3FORMS_CAREERS_ACCESS_KEY = <existing_key>
   ```
3. Click **"Save"**
4. Redeploy: **Deployments** → **... → Redeploy**

## Step 3: Connect eyenews.in Domain

### Option A: Nameserver Setup (Recommended)

1. In Vercel project, go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `eyenews.in`
4. Choose **"Add Domain"**
5. Vercel shows nameservers:
   ```
   ns-123.vercel-dns.com
   ns-456.vercel-dns.com
   ```
6. Go to your domain registrar (GoDaddy/etc):
   - Domain settings
   - Change nameservers to Vercel's nameservers
   - Save changes
7. Wait 24-48 hours for DNS propagation
8. Verify in Vercel: Status should show **"Connected"**

### Option B: CNAME Setup (If nameserver change not available)

1. In Vercel, add domain `eyenews.in`
2. Choose **CNAME** option
3. Note the CNAME record value
4. In domain registrar:
   - Add DNS record: `CNAME eyenews.in → <vercel-cname>`
5. Wait for propagation

### Option C: Update DNS Records (Manual)

1. Keep nameservers pointing to registrar
2. Add these DNS records in registrar control panel:
   - **A Record**: `eyenews.in` → `76.76.19.165` (Vercel IP)
   - **CNAME**: `www` → `cname.vercel-dns.com`

## Step 4: Add Subdomains (Optional)

For `www.eyenews.in`:
1. In Vercel domains, add `www.eyenews.in`
2. Auto-redirects to `eyenews.in`

For `admin.eyenews.in` (optional, for admin dashboard):
1. Add as separate domain
2. Points to same Vercel project
3. Route internally to `/admin`

## Step 5: Verify Deployment

1. **Check HTTPS**: Visit `https://eyenews.in`
   - Should show SSL certificate valid
   - Vercel provides free SSL

2. **Test all routes**:
   - `/` - Home page
   - `/news-pulse` - News pulse page
   - `/about` - About page
   - `/submit-article` - Submission form
   - `/admin` - Admin dashboard

3. **Check DNS**:
   ```bash
   # From terminal:
   dig eyenews.in
   ```

## Step 6: Redirect Old Domain (If applicable)

If `eyes-news.in` exists and needs to redirect:
1. In domain registrar, add 301 redirect
2. Or create Vercel project with old domain → redirect to eyenews.in

## Step 7: SSL Certificate

- Vercel automatically provisions SSL via Let's Encrypt
- Certificate auto-renews
- Force HTTPS: **Settings** → **Domains** → Enable "Redirect to HTTPS"

## Step 8: Monitor Deployment

1. **Deployments page**:
   - Shows all builds
   - Deployment logs
   - Rollback if needed

2. **Analytics** (optional):
   - **Analytics** tab shows traffic, CLS, FCP metrics

3. **Environment monitoring**:
   - **Logs** tab shows runtime errors

## Troubleshooting

### Domain shows "Pending" after 24 hours
- Check DNS propagation: [dnschecker.org](https://dnschecker.org)
- Verify nameservers/records in registrar
- Wait additional 24-48 hours
- Contact Vercel support if needed

### Articles/images not loading
- Verify environment variables added
- Check Supabase storage bucket is public
- Verify CORS settings in Supabase

### 404 errors on dynamic routes
- Ensure `/article/[id]` and `/admin` routes deployed
- Check logs: **Deployments** → **View Details**

### Old Vercel URL still works
- That's normal (Vercel auto-creates preview URLs)
- Users should use `eyenews.in`
- You can disable in project settings if needed

## Post-Deployment Checklist

- [ ] Domain resolves to Vercel (eyenews.in)
- [ ] HTTPS certificate valid
- [ ] All routes working
- [ ] Supabase credentials in environment
- [ ] Article submission form submits successfully
- [ ] Admin dashboard loads and shows submissions
- [ ] Article view and PDF download works
- [ ] Images loading from Supabase storage
- [ ] Analytics tracking enabled (optional)

## Rollback Plan

If deployment has issues:
1. Go to **Deployments**
2. Find last working deployment
3. Click **... → Promote to Production**
4. Wait for rollback to complete

## Next Steps

1. Complete Supabase setup (see SUPABASE_SETUP.md)
2. Deploy to Vercel with new account
3. Connect eyenews.in domain
4. Test all features
5. Monitor deployment logs
6. Announce new URL to users

## Important Notes

- Keep previous Vercel account for development/staging
- Production account (`eyenewsindiaa@gmail.com`) for eyenews.in only
- Store credentials securely
- Enable 2FA on Vercel account
- Regularly backup Supabase data
