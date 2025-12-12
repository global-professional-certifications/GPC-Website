# More precise script to find unused media files
$mediaFiles = Get-Content "all-media-files.txt"
$unusedFiles = @()
$usedFiles = @()
$suspiciousFiles = @()

Write-Host "Analyzing $($mediaFiles.Count) media files with precise matching..." -ForegroundColor Cyan

foreach ($file in $mediaFiles) {
    if ([string]::IsNullOrWhiteSpace($file)) { continue }
    
    # Extract just the filename
    $filename = Split-Path $file -Leaf
    $filenameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    $extension = [System.IO.Path]::GetExtension($filename)
    
    # Search for the exact filename (with or without extension) in source files
    $found = $false
    $foundCount = 0
    
    # Search patterns - look for imports, requires, or direct references
    $patterns = @(
        $filename,  # exact filename
        $filenameWithoutExt,  # without extension
        $file.Replace('\', '/'),  # full path with forward slashes
        $file.Replace('src\assets\', '').Replace('\', '/')  # relative path
    )
    
    # Search in all source files
    foreach ($pattern in $patterns) {
        $searchResults = Get-ChildItem -Path "src" -Recurse -Include *.js,*.jsx,*.ts,*.tsx -File | 
            Select-String -Pattern ([regex]::Escape($pattern)) -SimpleMatch
        
        if ($searchResults) {
            $found = $true
            $foundCount += $searchResults.Count
            break
        }
    }
    
    if ($found) {
        $usedFiles += [PSCustomObject]@{
            File = $file
            References = $foundCount
        }
        Write-Host "  ✓ Used ($foundCount refs): $filename" -ForegroundColor Green
    } else {
        # Double-check with just the base name (might be in eventImages.jsx or similar)
        $baseName = $filenameWithoutExt -replace '-\d+$', ''  # Remove trailing numbers
        $baseSearch = Get-ChildItem -Path "src" -Recurse -Include *.js,*.jsx,*.ts,*.tsx -File | 
            Select-String -Pattern $baseName -SimpleMatch -Quiet
        
        if ($baseSearch) {
            $suspiciousFiles += $file
            Write-Host "  ? Possibly used (indirect): $filename" -ForegroundColor Yellow
        } else {
            $unusedFiles += $file
            Write-Host "  ✗ UNUSED: $filename" -ForegroundColor Red
        }
    }
}

# Save results
$unusedFiles | Out-File "UNUSED-FILES.txt" -Encoding UTF8
$suspiciousFiles | Out-File "POSSIBLY-USED-FILES.txt" -Encoding UTF8
$usedFiles | ForEach-Object { $_.File } | Out-File "USED-FILES.txt" -Encoding UTF8

# Create a detailed report
$report = @"
=== MEDIA FILES ANALYSIS REPORT ===
Generated: $(Get-Date)

SUMMARY:
--------
Total files analyzed: $($mediaFiles.Count)
Definitely used: $($usedFiles.Count)
Possibly used (needs manual check): $($suspiciousFiles.Count)
Definitely unused: $($unusedFiles.Count)

UNUSED FILES ($($unusedFiles.Count)):
$(if ($unusedFiles.Count -gt 0) { $unusedFiles -join "`n" } else { "None - all files are being used!" })

POSSIBLY USED FILES ($($suspiciousFiles.Count)):
$(if ($suspiciousFiles.Count -gt 0) { $suspiciousFiles -join "`n" } else { "None" })

RECOMMENDATIONS:
---------------
1. Review files in UNUSED-FILES.txt - these can be safely moved/deleted
2. Manually check files in POSSIBLY-USED-FILES.txt before removing
3. Total potential space savings: Check file sizes of unused files

FILES TO CHECK:
--------------
"@

$report | Out-File "MEDIA-ANALYSIS-REPORT.txt" -Encoding UTF8

Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
Write-Host "Total files analyzed: $($mediaFiles.Count)" -ForegroundColor Cyan
Write-Host "Definitely used: $($usedFiles.Count)" -ForegroundColor Green
Write-Host "Possibly used (check manually): $($suspiciousFiles.Count)" -ForegroundColor Yellow
Write-Host "Definitely unused: $($unusedFiles.Count)" -ForegroundColor Red
Write-Host "`nDetailed report saved to: MEDIA-ANALYSIS-REPORT.txt" -ForegroundColor Cyan
