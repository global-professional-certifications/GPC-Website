import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client with write token
const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    useCdn: false,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-12-05',
    token: process.env.VITE_SANITY_API_TOKEN,
});

// Manual mapping for mismatched names
const nameMapping = {
    'archana-tiwari': 'Archana',
    'bhargav-tej': 'Bhargav',
    'harishankar-joshi': 'Harishankar',
    'jignesh-mehta': 'Jignesh',
    'murtaza-quresh': 'Murtuza-quresh',
    'ranveer-singh-negi': 'Ranveer',
    'sachin-kokcha': 'Sachin',
    'vishal-gupta': 'Vishal',
    'ajay-kumar-sharma': 'Ajay-kumar',
    'deepak-kumar-garg': 'Deepak',
    'fazil-musthafa': 'Fazil',
    'md-danish': 'Danish',
    'priyanka-paul': 'Priyanka',
    'simranjeet-kaur': 'Simranjeet',
    'vijay-singhal': 'Vijay',
    'wajiha-ansari': 'Wajiha',
};

async function uploadFile(filePath, fileName) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const asset = await client.assets.upload('file', fileBuffer, {
            filename: fileName,
        });
        console.log(`✅ Uploaded file: ${fileName}`);
        return asset;
    } catch (error) {
        console.error(`❌ Error uploading file ${fileName}:`, error.message);
        return null;
    }
}

async function uploadImage(imagePath, imageName) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const asset = await client.assets.upload('image', imageBuffer, {
            filename: imageName,
        });
        console.log(`✅ Uploaded image: ${imageName}`);
        return asset;
    } catch (error) {
        console.error(`❌ Error uploading image ${imageName}:`, error.message);
        return null;
    }
}

async function createSuccessStory(name, category, thumbnailAsset, videoAsset, order) {
    try {
        const doc = {
            _type: 'successStory',
            name: name,
            category: category,
            thumbnail: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: thumbnailAsset._id,
                },
            },
            order: order,
        };

        if (videoAsset) {
            doc.video = {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: videoAsset._id,
                },
            };
        }

        const result = await client.create(doc);
        console.log(`✅ Created success story: ${name}`);
        return result;
    } catch (error) {
        console.error(`❌ Error creating success story ${name}:`, error.message);
        return null;
    }
}

function formatName(filename) {
    return filename
        .replace('.mp4', '')
        .replace('.png', '')
        .replace(/-thumbnail$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function findThumbnail(videoName, thumbnails) {
    const baseName = videoName.replace('.mp4', '').toLowerCase();

    // Check if there's a manual mapping
    const mappedName = nameMapping[baseName];
    if (mappedName) {
        const thumbnail = thumbnails.find(thumb => {
            const thumbBase = thumb.replace('-thumbnail.png', '');
            return thumbBase.toLowerCase() === mappedName.toLowerCase();
        });
        if (thumbnail) return thumbnail;
    }

    // Try exact match
    let thumbnail = thumbnails.find(thumb => {
        const thumbBase = thumb.replace('-thumbnail.png', '').toLowerCase();
        return thumbBase === baseName;
    });
    if (thumbnail) return thumbnail;

    // Try partial match (first name)
    const firstName = baseName.split('-')[0];
    thumbnail = thumbnails.find(thumb => {
        const thumbBase = thumb.replace('-thumbnail.png', '').toLowerCase();
        return thumbBase.startsWith(firstName) || thumbBase === firstName;
    });

    return thumbnail;
}

async function migrateTestimonials() {
    console.log('🚀 Starting testimonial migration to Sanity...\n');

    const videoDir = path.join(__dirname, 'src/assets/video-testimonials');
    const writtenDir = path.join(__dirname, 'src/assets/written-testimonials');
    const thumbnailDir = path.join(__dirname, 'src/assets/thumbnails');

    const videoFiles = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));
    const writtenFiles = fs.readdirSync(writtenDir).filter(f => f.endsWith('.mp4'));
    const thumbnailFiles = fs.readdirSync(thumbnailDir).filter(f => f.endsWith('.png'));

    console.log(`📹 Found ${videoFiles.length} video testimonials`);
    console.log(`📝 Found ${writtenFiles.length} written testimonials`);
    console.log(`🖼️  Found ${thumbnailFiles.length} thumbnails\n`);

    // Delete existing success stories first
    console.log('🗑️  Deleting existing success stories...');
    const existing = await client.fetch('*[_type == "successStory"]._id');
    for (const id of existing) {
        await client.delete(id);
    }
    console.log(`✅ Deleted ${existing.length} existing stories\n`);

    let order = 1;

    // Migrate video testimonials
    console.log('📹 Migrating video testimonials...\n');
    for (const videoFile of videoFiles) {
        const name = formatName(videoFile);
        const thumbnailFile = findThumbnail(videoFile, thumbnailFiles);

        if (!thumbnailFile) {
            console.log(`⚠️  No thumbnail found for ${videoFile}, skipping...`);
            continue;
        }

        console.log(`Processing: ${name} (${videoFile} → ${thumbnailFile})`);

        const thumbnailAsset = await uploadImage(
            path.join(thumbnailDir, thumbnailFile),
            thumbnailFile
        );

        if (!thumbnailAsset) continue;

        const videoAsset = await uploadFile(
            path.join(videoDir, videoFile),
            videoFile
        );

        if (!videoAsset) continue;

        await createSuccessStory(name, 'video', thumbnailAsset, videoAsset, order);
        order++;
        console.log('');
    }

    // Migrate written testimonials
    console.log('\n📝 Migrating written testimonials...\n');
    for (const writtenFile of writtenFiles) {
        const name = formatName(writtenFile);
        const thumbnailFile = findThumbnail(writtenFile, thumbnailFiles);

        if (!thumbnailFile) {
            console.log(`⚠️  No thumbnail found for ${writtenFile}, skipping...`);
            continue;
        }

        console.log(`Processing: ${name} (${writtenFile} → ${thumbnailFile})`);

        const thumbnailAsset = await uploadImage(
            path.join(thumbnailDir, thumbnailFile),
            thumbnailFile
        );

        if (!thumbnailAsset) continue;

        const videoAsset = await uploadFile(
            path.join(writtenDir, writtenFile),
            writtenFile
        );

        if (!videoAsset) continue;

        await createSuccessStory(name, 'written', thumbnailAsset, videoAsset, order);
        order++;
        console.log('');
    }

    console.log('\n✅ Migration completed!');
    console.log(`📊 Total success stories created: ${order - 1}`);
}

migrateTestimonials().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
