import os
import re
from pathlib import Path

# Read all media files
with open('all-media-files.txt', 'r', encoding='utf-8') as f:
    media_files = [line.strip() for line in f if line.strip()]

print(f"Analyzing {len(media_files)} media files...")

unused_files = []
used_files = []
possibly_used = []

# Get all source files
source_extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html']
source_files = []

for root, dirs, files in os.walk('src'):
    for file in files:
        if any(file.endswith(ext) for ext in source_extensions):
            source_files.append(os.path.join(root, file))

# Also check index.html
if os.path.exists('index.html'):
    source_files.append('index.html')

# Read all source content
all_source_content = ""
for source_file in source_files:
    try:
        with open(source_file, 'r', encoding='utf-8', errors='ignore') as f:
            all_source_content += f.read() + "\n"
    except:
        pass

# Check each media file
for media_file in media_files:
    filename = os.path.basename(media_file)
    name_without_ext = os.path.splitext(filename)[0]
    
    # Check if referenced in source
    if filename in all_source_content or name_without_ext in all_source_content:
        used_files.append(media_file)
        print(f"  ✓ Used: {filename}")
    else:
        # Check for partial matches (e.g., "AGM-IIA-Delhi" for "AGM-IIA-Delhi-1.jpg")
        base_name = re.sub(r'-\d+$', '', name_without_ext)
        if base_name != name_without_ext and base_name in all_source_content:
            possibly_used.append(media_file)
            print(f"  ? Possibly used: {filename}")
        else:
            unused_files.append(media_file)
            print(f"  ✗ UNUSED: {filename}")

# Save results
with open('UNUSED-FILES.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(unused_files))

with open('POSSIBLY-USED-FILES.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(possibly_used))

with open('USED-FILES.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(used_files))

# Calculate sizes
total_unused_size = 0
for file in unused_files:
    if os.path.exists(file):
        total_unused_size += os.path.getsize(file)

# Create report
report = f"""=== MEDIA FILES ANALYSIS REPORT ===

SUMMARY:
--------
Total files analyzed: {len(media_files)}
Definitely used: {len(used_files)}
Possibly used (needs manual check): {len(possibly_used)}
Definitely unused: {len(unused_files)}
Potential space savings: {total_unused_size / (1024*1024):.2f} MB

UNUSED FILES ({len(unused_files)}):
{'None - all files are being used!' if len(unused_files) == 0 else chr(10).join(unused_files)}

POSSIBLY USED FILES ({len(possibly_used)}):
{'None' if len(possibly_used) == 0 else chr(10).join(possibly_used)}

RECOMMENDATIONS:
---------------
1. Review files in UNUSED-FILES.txt - these can be safely moved/deleted
2. Manually check files in POSSIBLY-USED-FILES.txt before removing
3. Total potential space savings: {total_unused_size / (1024*1024):.2f} MB
"""

with open('MEDIA-ANALYSIS-REPORT.txt', 'w', encoding='utf-8') as f:
    f.write(report)

print(f"\n=== SUMMARY ===")
print(f"Total files analyzed: {len(media_files)}")
print(f"Definitely used: {len(used_files)}")
print(f"Possibly used: {len(possibly_used)}")
print(f"Definitely unused: {len(unused_files)}")
print(f"Potential space savings: {total_unused_size / (1024*1024):.2f} MB")
print(f"\nDetailed report saved to: MEDIA-ANALYSIS-REPORT.txt")
