const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Oneskai/GPC/gpc-website';
const dirs = [
    'src/assets/Companies',
    'src/assets/home',
    'src/assets/about',
    'src/assets/navbar',
    'src/assets/courses',
];

async function optimizeDir(dirName) {
    const dir = path.join(baseDir, dirName);
    if (!fs.existsSync(dir)) {
        console.log(`Directory ${dir} does not exist.`);
        return;
    }
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const ext = path.extname(file).toLowerCase();
        
        if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            const fileName = path.basename(file, ext);
            const targetPath = path.join(dir, `${fileName}.webp`);
            const tmpPath = `${targetPath}.tmp`;
            
            console.log(`Optimizing ${file}...`);
            
            try {
                let pipeline = sharp(filePath);
                
                if (dirName.includes('Companies')) {
                    pipeline = pipeline.resize(250, null, { withoutEnlargement: true });
                }
                
                // For navbar panels, they are large backgrounds. We can resize to 600px width.
                if (dirName.includes('navbar') && fileName.includes('panel')) {
                    pipeline = pipeline.resize(600, null, { withoutEnlargement: true });
                }
                
                await pipeline
                    .webp({ quality: 65, effort: 6 })
                    .toFile(tmpPath);
                
                const oldSize = fs.statSync(filePath).size;
                const newSize = fs.statSync(tmpPath).size;
                
                if (newSize < oldSize || ext !== '.webp') {
                    if (fs.existsSync(targetPath) && filePath !== targetPath) {
                        fs.unlinkSync(targetPath);
                    }
                    if (fs.existsSync(targetPath) && filePath === targetPath) {
                        fs.unlinkSync(filePath);
                    }
                    fs.renameSync(tmpPath, targetPath);
                    console.log(`  Success: ${oldSize} -> ${newSize} bytes`);
                } else {
                    fs.unlinkSync(tmpPath);
                    console.log(`  Skipped (new size larger or equal)`);
                }
            } catch (err) {
                console.error(`  Error optimizing ${file}: ${err.message}`);
            }
        }
    }
}

async function main() {
    console.log('Starting broad image optimization...');
    for (const d of dirs) {
        await optimizeDir(d);
    }
    console.log('Finished optimization.');
}

main();
