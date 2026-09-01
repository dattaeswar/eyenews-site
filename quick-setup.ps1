# Eye News - Automated Setup Script
# This script automates everything we CAN do locally
# You only need to paste your Supabase key ONE TIME

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Eye News - Quick Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the project directory
$projectDir = Split-Path -Parent $MyInvocation.MyCommandPath
Set-Location $projectDir

Write-Host "Step 1/3: Checking project..." -ForegroundColor Yellow

# Verify we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Are you in the right directory?" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project found at: $projectDir" -ForegroundColor Green
Write-Host ""

# Step 2: Get Supabase key
Write-Host "Step 2/3: Environment Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "Go to: https://supabase.com/dashboard/project/ifmpahiibruhzzakrshp/settings/api" -ForegroundColor Cyan
Write-Host ""
$anonKey = Read-Host "Paste your SUPABASE ANON KEY (from API settings)"

if ([string]::IsNullOrWhiteSpace($anonKey)) {
    Write-Host "❌ No key provided. Exiting." -ForegroundColor Red
    exit 1
}

# Update .env.local
Write-Host ""
Write-Host "Adding key to .env.local..." -ForegroundColor Yellow
$envContent = Get-Content ".env.local" -Raw
$envContent = $envContent -replace 'NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY_HERE"', "NEXT_PUBLIC_SUPABASE_ANON_KEY=""$anonKey"""
Set-Content ".env.local" $envContent
Write-Host "✅ Environment configured" -ForegroundColor Green
Write-Host ""

# Step 3: Verify build
Write-Host "Step 3/3: Verifying project..." -ForegroundColor Yellow
Write-Host "Running: npm run build" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ LOCAL SETUP COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "NEXT STEPS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1️⃣  SUPABASE SETUP (5 minutes)" -ForegroundColor Yellow
    Write-Host "   Go to: https://supabase.com/dashboard/project/ifmpahiibruhzzakrshp" -ForegroundColor White
    Write-Host ""
    Write-Host "   a) Create storage bucket:" -ForegroundColor White
    Write-Host "      • Click Storage → New Bucket" -ForegroundColor Gray
    Write-Host "      • Name: article-thumbnails" -ForegroundColor Gray
    Write-Host "      • Make it PUBLIC" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   b) Run database migration:" -ForegroundColor White
    Write-Host "      • SQL Editor → New Query" -ForegroundColor Gray
    Write-Host "      • Open: supabase/migrations/001_create_articles_schema.sql" -ForegroundColor Gray
    Write-Host "      • Copy entire content and paste into Supabase" -ForegroundColor Gray
    Write-Host "      • Click Run" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2️⃣  TEST LOCALLY (5 minutes)" -ForegroundColor Yellow
    Write-Host "   Run: npm run dev" -ForegroundColor Cyan
    Write-Host "   Then test:" -ForegroundColor White
    Write-Host "      • http://localhost:3000/submit-article (submit a test article)" -ForegroundColor Gray
    Write-Host "      • http://localhost:3000/admin (approve it)" -ForegroundColor Gray
    Write-Host "      • http://localhost:3000/article/{id} (view & download PDF)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3️⃣  DEPLOY TO VERCEL (10 minutes)" -ForegroundColor Yellow
    Write-Host "   • Go to: https://vercel.com" -ForegroundColor White
    Write-Host "   • Sign up with: eyenewsindiaa@gmail.com" -ForegroundColor Gray
    Write-Host "   • Import eyenews-site repository" -ForegroundColor Gray
    Write-Host "   • Add these env vars:" -ForegroundColor Gray
    Write-Host "     - NEXT_PUBLIC_SUPABASE_URL = https://ifmpahiibruhzzakrshp.supabase.co" -ForegroundColor Gray
    Write-Host "     - NEXT_PUBLIC_SUPABASE_ANON_KEY = <your key>" -ForegroundColor Gray
    Write-Host "   • Deploy" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4️⃣  CONNECT DOMAIN (15 minutes)" -ForegroundColor Yellow
    Write-Host "   • In Vercel: Settings → Domains → Add eyenews.in" -ForegroundColor White
    Write-Host "   • Copy Vercel nameservers" -ForegroundColor Gray
    Write-Host "   • Update nameservers in your domain registrar" -ForegroundColor Gray
    Write-Host "   • Wait 24-48 hours for DNS to propagate" -ForegroundColor Gray
    Write-Host ""
    Write-Host "For detailed instructions, see: EXECUTE_NOW.md" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
    exit 1
}
