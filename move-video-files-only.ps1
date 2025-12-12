# Script to move only video files (Quick fix for Git push issue)
# This will solve your Git LFS timeout problem immediately

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$archiveFolder = "..\..\GPC-Unused-Assets-$timestamp\videos"

Write-Host "=== Moving Video Files to Reduce Repo Size ===" -ForegroundColor Cyan
Write-Host "This will move ~225 MB of unused video files" -ForegroundColor Yellow
Write-Host "Archive location: $archiveFolder" -ForegroundColor Green
Write-Host ""

# Create archive folder
New-Item -ItemType Directory -Force -Path $archiveFolder | Out-Null
New-Item -ItemType Directory -Force -Path "$archiveFolder\video-testimonials" | Out-Null
New-Item -ItemType Directory -Force -Path "$archiveFolder\written-testimonials" | Out-Null

$movedCount = 0
$totalSize = 0

# Move video testimonials
Write-Host "Moving video testimonials..." -ForegroundColor Cyan
if (Test-Path "src\assets\video-testimonials") {
    Get-ChildItem "src\assets\video-testimonials\*.mp4" | ForEach-Object {
        $size = $_.Length
        $totalSize += $size
        Move-Item $_.FullName "$archiveFolder\video-testimonials\" -Force
        Write-Host "  Moved: $($_.Name) ($([math]::Round($size/1MB, 2)) MB)" -ForegroundColor Green
        $movedCount++
    }
}

# Move written testimonials
Write-Host "Moving written testimonials..." -ForegroundColor Cyan
if (Test-Path "src\assets\written-testimonials") {
    Get-ChildItem "src\assets\written-testimonials\*.mp4" | ForEach-Object {
        $size = $_.Length
        $totalSize += $size
        Move-Item $_.FullName "$archiveFolder\written-testimonials\" -Force
        Write-Host "  Moved: $($_.Name) ($([math]::Round($size/1MB, 2)) MB)" -ForegroundColor Green
        $movedCount++
    }
}

Write-Host ""
Write-Host "=== COMPLETE ===" -ForegroundColor Green
Write-Host "Moved $movedCount video files" -ForegroundColor Cyan
Write-Host "Total size freed: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Green
Write-Host "Files archived to: $archiveFolder" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Commit the changes: git add . && git commit -m 'Remove unused video files'" -ForegroundColor White
Write-Host "2. Push to GitHub: git push origin anirban" -ForegroundColor White
Write-Host "3. Your Git push should now work without LFS timeout!" -ForegroundColor Green
