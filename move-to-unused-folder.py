import os
import shutil
from pathlib import Path

# Read unused files list
with open('UNUSED-FILES.txt', 'r', encoding='utf-8') as f:
    unused_files = [line.strip() for line in f if line.strip()]

# Create "Unused Files" folder
unused_folder = "Unused Files"
if not os.path.exists(unused_folder):
    os.makedirs(unused_folder)
    print(f"Created folder: {unused_folder}")

moved_count = 0
total_size = 0

print(f"\nMoving {len(unused_files)} unused files to '{unused_folder}' folder...\n")

for file_path in unused_files:
    if os.path.exists(file_path):
        # Get file info
        file_size = os.path.getsize(file_path)
        total_size += file_size
        filename = os.path.basename(file_path)
        
        # Destination path
        dest_path = os.path.join(unused_folder, filename)
        
        # Handle duplicate filenames by adding parent folder name
        if os.path.exists(dest_path):
            parent_folder = os.path.basename(os.path.dirname(file_path))
            name, ext = os.path.splitext(filename)
            dest_path = os.path.join(unused_folder, f"{parent_folder}_{filename}")
        
        # Move file
        try:
            shutil.move(file_path, dest_path)
            print(f"✓ Moved: {filename}")
            moved_count += 1
        except Exception as e:
            print(f"✗ Error moving {filename}: {e}")
    else:
        print(f"✗ File not found: {file_path}")

print(f"\n{'='*50}")
print(f"COMPLETE!")
print(f"{'='*50}")
print(f"Moved {moved_count} files")
print(f"Total size: {total_size / (1024*1024):.2f} MB")
print(f"Location: {os.path.abspath(unused_folder)}")
print(f"\nAll unused files are now in the '{unused_folder}' folder.")
