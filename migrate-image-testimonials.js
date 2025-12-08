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

async function createImageTestimonial(name, thumbnailAsset, order) {
    try {
        const doc = {
            _type: 'successStory',
            name: name,
            category: 'image',
            thumbnail: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: thumbnailAsset._id,
                },
            },
            order: order,
        };

        const result = await client.create(doc);
        console.log(`✅ Created image testimonial: ${name}`);
        return result;
    } catch (error) {
        console.error(`❌ Error creating image testimonial ${name}:`, error.message);
        return null;
    }
}

function formatName(filename) {
    return filename
        .replace('.png', '')
        .replace('testimonial-mobile-screenshot-', 'Mobile Testimonial ')
        .replace('Testimonial-screenshot-', 'Testimonial ')
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function migrateImageTestimonials() {
    console.log('🚀 Starting image testimonials migration to Sanity...\n');

    const assetsDir = path.join(__dirname, 'src/assets');

    // Get all testimonial screenshot files
    const allFiles = fs.readdirSync(assetsDir);
    const mobileScreenshots = allFiles
        .filter(f => f.startsWith('testimonial-mobile-screenshot-') && f.endsWith('.png'))
        .sort();
    const desktopScreenshots = allFiles
        .filter(f => f.startsWith('Testimonial-screenshot-') && f.endsWith('.png'))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

    console.log(`📱 Found ${mobileScreenshots.length} mobile testimonial screenshots`);
    console.log(`🖥️  Found ${desktopScreenshots.length} desktop testimonial screenshots\n`);

    // Get the current max order from existing success stories
    const existingStories = await client.fetch('*[_type == "successStory"] | order(order desc) [0]');
    let order = existingStories ? existingStories.order + 1 : 1;

    // Migrate mobile screenshots
    console.log('📱 Migrating mobile testimonial screenshots...\n');
    for (const screenshot of mobileScreenshots) {
        const name = formatName(screenshot);
        console.log(`Processing: ${name}`);

        const imageAsset = await uploadImage(
            path.join(assetsDir, screenshot),
            screenshot
        );

        if (!imageAsset) continue;

        await createImageTestimonial(name, imageAsset, order);
        order++;
        console.log('');
    }

    // Migrate desktop screenshots
    console.log('\n🖥️  Migrating desktop testimonial screenshots...\n');
    for (const screenshot of desktopScreenshots) {
        const name = formatName(screenshot);
        console.log(`Processing: ${name}`);

        const imageAsset = await uploadImage(
            path.join(assetsDir, screenshot),
            screenshot
        );

        if (!imageAsset) continue;

        await createImageTestimonial(name, imageAsset, order);
        order++;
        console.log('');
    }

    console.log('\n✅ Image testimonials migration completed!');
    console.log(`📊 Total image testimonials created: ${mobileScreenshots.length + desktopScreenshots.length}`);
}

migrateImageTestimonials().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
