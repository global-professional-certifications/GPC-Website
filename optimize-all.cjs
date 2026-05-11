const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Oneskai/GPC/gpc-website';
const dirs = [
    'src/assets/Companies',
    'src/assets/home',
    'src/assets/about',
    'src/assets/navbar',
    'public',
    'public/thumbnails'
];

async function optimizeDir(dirName) {
    const dir = path.join(baseDir, dirName);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.includes('-opt.webp')) continue; // Skip already optimized
        
        const filePath = path.join(dir, file);
        const ext = path.extname(file).toLowerCase();
        
        if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            const fileName = path.basename(file, ext);
            const targetPath = path.join(dir, `${fileName}-opt.webp`);
            
            console.log(`Optimizing ${file}...`);
            
            try {
                let pipeline = sharp(filePath);
                
                if (dirName.includes('Companies')) {
                    pipeline = pipeline.resize(250, null, { withoutEnlargement: true });
                }
                
                if (file.includes('hero-girl')) {
                    pipeline = pipeline.resize(1000, null, { withoutEnlargement: true });
                }
                
                if (dirName.includes('navbar') && file.includes('panel')) {
                    pipeline = pipeline.resize(600, null, { withoutEnlargement: true });
                }

                await pipeline
                    .webp({ quality: 60, effort: 6 })
                    .toFile(targetPath);
                
                const oldSize = fs.statSync(filePath).size;
                const newSize = fs.statSync(targetPath).size;
                console.log(`  Success: ${oldSize} -> ${newSize} bytes saved as ${path.basename(targetPath)}`);
            } catch (err) {
                console.error(`  Error optimizing ${file}: ${err.message}`);
            }
        }
    }
}

async function main() {
    console.log('Starting FINAL image optimization...');
    for (const d of dirs) {
        await optimizeDir(d);
    }
    console.log('Finished optimization.');
}

main();
