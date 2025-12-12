# PowerShell script to find unused media files
$mediaFiles = Get-Content "all-media-files.txt"
$unusedFiles = @()
$usedFiles = @()

Write-Host "Analyzing $($mediaFiles.Count) media files..." -ForegroundColor Cyan

foreach ($file in $mediaFiles) {
    if ([string]::IsNullOrWhiteSpace($file)) { continue }
    
    # Extract just the filename
    $filename = Split-Path $file -Leaf
    $filenameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    
    # Search for the filename in source files (js, jsx, ts, tsx, html, css)
    $found = $false
    
    # Search in src directory
    $searchResults = Get-ChildItem -Path "src" -Recurse -Include *.js,*.jsx,*.ts,*.tsx,*.html,*.css,*.json -File | 
        Select-String -Pattern $filenameWithoutExt -SimpleMatch -Quiet
    
    if ($searchResults) {
        $found = $true
    }
    
    # Also search in index.html
    if (-not $found) {
        $indexContent = Get-Content "index.html" -Raw -ErrorAction SilentlyContinue
        if ($indexContent -and $indexContent.Contains($filenameWithoutExt)) {
            $found = $true
        }
    }
    
    if ($found) {
        $usedFiles += $file
    } else {
        $unusedFiles += $file
        Write-Host "  Unused: $file" -ForegroundColor Yellow
    }
}

# Save results
$unusedFiles | Out-File "unused-media-files.txt" -Encoding UTF8
$usedFiles | Out-File "used-media-files.txt" -Encoding UTF8

Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
Write-Host "Total files analyzed: $($mediaFiles.Count)" -ForegroundColor Cyan
Write-Host "Used files: $($usedFiles.Count)" -ForegroundColor Green
Write-Host "Unused files: $($unusedFiles.Count)" -ForegroundColor Red
Write-Host "`nUnused files saved to: unused-media-files.txt" -ForegroundColor Yellow
Write-Host "Used files saved to: used-media-files.txt" -ForegroundColor Green
