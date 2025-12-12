# Vercel Deployment Fix Guide

## Problem Identified
Your Vercel deployment is failing because **environment variables are missing** in your Vercel project settings. The Sanity configuration requires these variables to be present during the build process.

## Root Cause
The file `sanity/env.ts` contains validation that throws errors if required environment variables are not found:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION` (optional, defaults to '2024-12-05')
- `VITE_SANITY_API_TOKEN`

## Solution Steps

### 1. Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: Click on your GPC-Website project
3. **Navigate to Settings**: Click "Settings" in the top menu
4. **Go to Environment Variables**: Click "Environment Variables" in the left sidebar
5. **Add the following variables**:

   ```
   Name: VITE_SANITY_PROJECT_ID
   Value: x48sh1b9
   Environment: Production, Preview, Development (select all)
   ```

   ```
   Name: VITE_SANITY_DATASET
   Value: production
   Environment: Production, Preview, Development (select all)
   ```

   ```
   Name: VITE_SANITY_API_VERSION
   Value: 2024-12-05
   Environment: Production, Preview, Development (select all)
   ```

   ```
   Name: VITE_SANITY_API_TOKEN
   Value: [Get this from your .env file]
   Environment: Production, Preview, Development (select all)
   ```

6. **Save** each variable

### 2. Redeploy Your Project

After adding the environment variables, you have two options:

**Option A: Trigger a new deployment from Vercel**
1. Go to the "Deployments" tab in your Vercel project
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"

**Option B: Push a new commit**
```bash
git add .
git commit -m "Fix: Updated vite config for better build compatibility"
git push origin main
```

### 3. Verify Deployment

1. Wait for the deployment to complete
2. Check the deployment logs for any errors
3. Visit your deployed site to confirm it's working

## Changes Made Locally

✅ Updated `vite.config.js` to:
- Add proper TypeScript file resolution (.ts, .tsx)
- Optimize build configuration for production
- Ensure compatibility with Vercel's build system

## Additional Notes

- **Local builds work** because your `.env` file contains all required variables
- **Vercel builds fail** because environment variables must be configured separately in Vercel's dashboard
- The `.env` file is **not pushed to Git** (and shouldn't be) for security reasons
- Each deployment platform (Vercel, Netlify, etc.) requires separate environment variable configuration

## Troubleshooting

If deployment still fails after adding environment variables:

1. **Check the build logs** in Vercel for specific error messages
2. **Verify all environment variables** are correctly spelled and have values
3. **Clear Vercel's cache**: In deployment settings, enable "Clear cache and retry"
4. **Check for typos**: Ensure variable names match exactly (case-sensitive)

## Security Reminder

⚠️ **Never commit your `.env` file to Git**. It contains sensitive API tokens and should remain local only.

## Need Help?

If you encounter any issues:
1. Check Vercel's deployment logs for specific error messages
2. Verify environment variables are set correctly
3. Ensure the build completes successfully locally first
