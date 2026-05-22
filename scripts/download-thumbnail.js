import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadThumbnail(videoId) {
  const imageUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  ];

  const targetDir = path.join(__dirname, '../public/thumbnails');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, `${videoId}-opt.webp`);
  const rawJpgPath = path.join(targetDir, `${videoId}.jpg`);

  for (const url of imageUrls) {
    try {
      console.log(`Downloading thumbnail from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Write standard JPG
      fs.writeFileSync(rawJpgPath, buffer);
      console.log(`Saved raw JPG thumbnail to ${rawJpgPath}`);

      // Optimize and convert to WebP using Sharp
      await sharp(buffer)
        .webp({ quality: 65, effort: 6 })
        .toFile(targetPath);
      
      console.log(`Saved optimized WebP thumbnail to ${targetPath}`);
      return true;
    } catch (err) {
      console.warn(`Failed to download from ${url}: ${err.message}`);
    }
  }
  return false;
}

downloadThumbnail('O4H2jSYZ6V8');
