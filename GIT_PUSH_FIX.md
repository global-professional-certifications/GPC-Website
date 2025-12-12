# Git Push Fix for Large Files

## Problem
You're experiencing `RPC failed; curl 55 Send failure: Connection was aborted` when trying to push to GitHub. This is caused by:
- Large Git LFS (Large File Storage) files (225 MB)
- Network timeout during upload
- GitHub's connection limits

## Quick Solutions (Try in Order)

### Solution 1: Use GitHub Desktop (EASIEST) ✅
If you have GitHub Desktop installed:
1. Open GitHub Desktop
2. It will show your 2 unpushed commits
3. Click "Push origin" - GitHub Desktop handles large files better
4. Wait for it to complete

### Solution 2: Push via SSH instead of HTTPS
```powershell
# Check your current remote URL
git remote -v

# If it shows HTTPS (https://github.com/...), switch to SSH:
git remote set-url origin git@github.com:global-professional-certifications/GPC-Website.git

# Then push
git push origin anirban
```

### Solution 3: Manual Deployment to Vercel (FASTEST)
Since you only changed 2 small files, you can:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to Settings** → **Git**
4. **Click "Disconnect"** temporarily
5. **Deploy manually**:
   - Go to Deployments tab
   - Click "Deploy" button
   - Select "Import from Git" or upload the files directly

6. **Make the changes directly in Vercel**:
   - You can edit `StudioPage.jsx` directly in Vercel's file editor
   - Or use Vercel CLI to deploy

### Solution 4: Use Vercel CLI (RECOMMENDED) ⭐
This bypasses Git entirely:

```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

This will deploy your current local code directly to Vercel without needing to push to GitHub!

### Solution 5: Increase Git Timeouts (Already Applied)
I've already configured these for you:
```powershell
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
git config --global core.compression 0
```

Now try pushing again:
```powershell
git push origin anirban
```

### Solution 6: Push in Smaller Chunks
If you have multiple commits, push them one at a time:

```powershell
# Push just the first commit
git push origin anirban~1:anirban

# Then push the second
git push origin anirban
```

### Solution 7: Use Git LFS Transfer Optimization
```powershell
# Set LFS transfer to use multiple concurrent transfers
git config lfs.concurrenttransfers 3

# Try pushing again
git push origin anirban
```

## What Changed (Files to Deploy)
You only need to deploy these 2 files:
1. `src/components/Studio/StudioPage.jsx` - Fixed TypeScript import
2. `VERCEL_DEPLOYMENT_FIX.md` - Documentation update

## Recommended Approach

**I strongly recommend using Vercel CLI (Solution 4)** because:
- ✅ Bypasses Git push issues entirely
- ✅ Deploys directly from your local files
- ✅ Much faster than waiting for Git LFS
- ✅ No need to fix Git configuration

### Quick Vercel CLI Steps:
```powershell
# Install (one-time)
npm install -g vercel

# Login (one-time)
vercel login

# Deploy (every time you want to deploy)
vercel --prod
```

## Alternative: Cherry-pick Changes to a New Branch
If nothing works, create a fresh branch without the large file history:

```powershell
# Create a new branch from the remote
git fetch origin
git checkout -b anirban-fix origin/main

# Cherry-pick your 2 commits
git cherry-pick 0b8eb6f
git cherry-pick 26180a6

# Push the new branch
git push origin anirban-fix

# Then merge on GitHub
```

## Why This Happens
- Git LFS files (videos in `src/assets/`) are large (225 MB total)
- Your network connection times out during upload
- GitHub has limits on push size and duration
- The error happens even though LFS files haven't changed

## Prevention for Future
1. **Use Vercel CLI** for deployments instead of Git push
2. **Use SSH** instead of HTTPS for Git remotes
3. **Avoid committing large files** - use external storage (S3, Cloudinary, etc.)
4. **Use `.gitignore`** to exclude large files

## Need Help?
If none of these work, let me know and I can:
1. Help you set up Vercel CLI
2. Create a deployment script
3. Help migrate large files to external storage
