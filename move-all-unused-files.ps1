# Script to move ALL unused files to archive folder
# This will free up ~488 MB of space

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$archiveFolder = "..\..\GPC-Unused-Assets-$timestamp"

Write-Host "=== Moving ALL Unused Files ===" -ForegroundColor Cyan
Write-Host "This will move 160 unused files (~488 MB)" -ForegroundColor Yellow
Write-Host "Archive location: $archiveFolder" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to cancel, or press Enter to continue..." -ForegroundColor Yellow
Read-Host

# Create archive folder structure
$folders = @(
    "video-testimonials",
    "written-testimonials",
    "thumbnails",
    "event-photos\iia-bangalore",
    "event-photos\iia-bombay",
    "company-logos",
    "screenshots",
    "misc"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path "$archiveFolder\$folder" | Out-Null
}

$movedCount = 0
$totalSize = 0

# Read unused files list
$unusedFiles = Get-Content "UNUSED-FILES.txt"

foreach ($file in $unusedFiles) {
    if ([string]::IsNullOrWhiteSpace($file)) { continue }
    
    if (Test-Path $file) {
        $item = Get-Item $file
        $size = $item.Length
        $totalSize += $size
        
        # Determine destination folder
        $destFolder = "misc"
        if ($file -match "video-testimonials") { $destFolder = "video-testimonials" }
        elseif ($file -match "written-testimonials") { $destFolder = "written-testimonials" }
        elseif ($file -match "thumbnails") { $destFolder = "thumbnails" }
        elseif ($file -match "iia-bangalore") { $destFolder = "event-photos\iia-bangalore" }
        elseif ($file -match "iia-bombay") { $destFolder = "event-photos\iia-bombay" }
        elseif ($file -match "Companies") { $destFolder = "company-logos" }
        elseif ($file -match "screenshot") { $destFolder = "screenshots" }
        
        # Move file
        $destPath = "$archiveFolder\$destFolder\$($item.Name)"
        Move-Item $file $destPath -Force
        Write-Host "  Moved: $($item.Name) -> $destFolder" -ForegroundColor Green
        $movedCount++
    }
}

Write-Host ""
Write-Host "=== COMPLETE ===" -ForegroundColor Green
Write-Host "Moved $movedCount files" -ForegroundColor Cyan
Write-Host "Total size freed: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Green
Write-Host "Files archived to: $archiveFolder" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the archived files" -ForegroundColor White
Write-Host "2. Commit: git add . && git commit -m 'Remove unused media files'" -ForegroundColor White
Write-Host "3. Push: git push origin anirban" -ForegroundColor White
