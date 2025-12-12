# 🎯 Unused Media Files Analysis

## Summary

I've analyzed all **349 media files** in your project and found:

- ✅ **Definitely used**: 141 files
- ⚠️ **Possibly used** (need manual check): 48 files  
- ❌ **Definitely unused**: 160 files
- 💾 **Potential space savings**: **488.13 MB**

## Major Findings

### 1. **Video Testimonials (LARGE FILES - ~225 MB)**
All video testimonial files are **UNUSED**:
- `src/assets/video-testimonials/` - 15 MP4 files
- `src/assets/written-testimonials/` - 9 MP4 files
- **These are the LFS files causing your Git push issues!**

### 2. **Thumbnail Images (UNUSED)**
All 26 thumbnail images in `src/assets/thumbnails/` are unused

### 3. **Event Photos**
- **iia-bangalore**: 9 unused images
- **iia-bombay**: 12 unused images
- **iia-kolkata**: Some possibly used, some unused
- **iia-hyderabad**: Mostly possibly used

### 4. **Screenshot Images**
- 16 testimonial screenshots (Testimonial-screenshot-1 through 16) - **UNUSED**
- 5 mobile screenshots - **UNUSED**

### 5. **Company Logos (Duplicates/Unused)**
Many company logos are unused or duplicates:
- `allstate-logo.png`, `BDO-logo-bgremoved.png`, `Cognizant-Logo.png`, etc.

### 6. **Miscellaneous Unused**
- `toBeChecked.png`, `toBeCheckedAgain.png`, `toBeCheckedOnceAgain.png` - clearly test files
- Old hero images, sliders, etc.

## Recommended Actions

### ⚡ **Quick Win: Move Video Files (Solves Git Push Issue)**

The video testimonials are:
1. **Not being used** in the current codebase
2. **Taking up ~225 MB** (the LFS files)
3. **Causing your Git push failures**

**Action**: Move all video files to a separate folder outside the repo

### 📁 **Create Archive Folder Structure**

```
GPC-Website-Unused-Assets/
├── video-testimonials/
├── written-testimonials/
├── thumbnails/
├── event-photos/
├── screenshots/
├── company-logos/
└── misc/
```

## Files to Review

### Detailed Lists:

1. **UNUSED-FILES.txt** - 160 files that can be safely removed
2. **POSSIBLY-USED-FILES.txt** - 48 files to manually verify
3. **USED-FILES.txt** - 141 files currently in use

## Next Steps

### Option 1: Automated Move (Recommended)
Run the provided PowerShell script to automatically move unused files:
```powershell
.\move-unused-files.ps1
```

### Option 2: Manual Review
1. Review `UNUSED-FILES.txt`
2. Manually move files you want to keep as backup
3. Delete the rest

### Option 3: Just Move Videos (Quick Fix for Git)
Move only the video files to solve the Git push issue immediately:
```powershell
.\move-video-files-only.ps1
```

## Impact

After moving unused files:
- ✅ **Reduce repo size by ~488 MB**
- ✅ **Fix Git push issues** (no more LFS timeouts)
- ✅ **Faster builds** (less files to process)
- ✅ **Cleaner project structure**
- ✅ **Easier to maintain**

## Safety Notes

- All files will be **moved, not deleted**
- You can always restore them if needed
- The scripts create backups before moving
- Review the "possibly used" files manually before removing

---

**Ready to proceed?** Choose one of the options above to clean up your project!
