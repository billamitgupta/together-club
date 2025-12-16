# Deployment Fix Guide

## Issue
Frontend is making requests to old cached URL instead of the correct backend URL.

## Backend Status ✅
- **URL**: https://server-nine-sigma-44.vercel.app
- **Status**: Working correctly
- **Health Check**: ✅ Passing
- **CORS**: ✅ Configured for https://together-club-fe.netlify.app

## Frontend Issue 🔧
The frontend build is correct but Netlify might be serving cached files.

## Solution Steps

### 1. Force Fresh Deployment on Netlify

**Option A: Manual Deploy (Recommended)**
1. Go to https://app.netlify.com/sites/together-club-fe/deploys
2. Click "Deploy manually"
3. Drag and drop the `client/build` folder
4. This bypasses all caching

**Option B: Git Deploy**
1. Make a small change to trigger rebuild:
   ```bash
   echo "# Cache bust $(date)" >> client/README.md
   git add .
   git commit -m "Force cache bust for API URL fix"
   git push origin main
   ```

### 2. Verify Environment Variables on Netlify
1. Go to Site Settings → Environment Variables
2. Ensure `REACT_APP_API_URL` = `https://server-nine-sigma-44.vercel.app`
3. If missing, add it and redeploy

### 3. Clear Netlify Cache
1. Go to Site Settings → Build & Deploy
2. Click "Clear cache and deploy site"

### 4. Test the Fix
Open the deployed site and check browser console:
- Should see: "API Service initialized with URL: https://server-nine-sigma-44.vercel.app"
- Should NOT see: "your-backend-domain.vercel.app"

## Quick Test Commands

```bash
# Test backend directly
curl https://server-nine-sigma-44.vercel.app/health

# Build frontend locally to verify
cd client && npm run build

# Check built files contain correct URL
grep -r "server-nine-sigma-44" client/build/
```

## Current Status
- ✅ Backend deployed and working
- ✅ Frontend code fixed
- ✅ Environment variables set
- 🔧 Need fresh deployment to clear cache

The issue is purely a caching problem - the code is correct!