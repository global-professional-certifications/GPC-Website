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

async function uploadBrochure() {
    try {
        console.log('🚀 Starting CIA Brochure upload to Sanity...');
        
        const brochurePath = path.join(__dirname, '../public/CIA-Brochure.pdf');
        if (!fs.existsSync(brochurePath)) {
            throw new Error(`Brochure file not found at ${brochurePath}`);
        }

        const fileBuffer = fs.readFileSync(brochurePath);
        console.log('⏳ Uploading PDF file to Sanity assets...');
        const asset = await client.assets.upload('file', fileBuffer, {
            filename: 'CIA-Brochure.pdf',
            contentType: 'application/pdf'
        });

        console.log(`✅ Uploaded brochure asset successfully! Asset ID: ${asset._id}`);

        // Create or replace the brochure document with ID `cia-brochure`
        const doc = {
            _type: 'brochure',
            _id: 'cia-brochure',
            title: 'CIA Course Brochure',
            slug: {
                _type: 'slug',
                current: 'cia'
            },
            pdfFile: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                }
            }
        };

        console.log('⏳ Creating/Replacing cia-brochure document in Sanity...');
        const result = await client.createOrReplace(doc);
        console.log(`✅ Created/Replaced document inside Sanity. Document ID: ${result._id}`);
        console.log(`🔗 Sanity Asset URL: ${asset.url}`);
    } catch (error) {
        console.error('❌ Upload failed:', error.message);
        process.exit(1);
    }
}

uploadBrochure();
