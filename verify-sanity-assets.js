import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    useCdn: false,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-12-05',
    token: process.env.VITE_SANITY_API_TOKEN,
});

async function verify() {
    try {
        console.log('🔍 Starting Sanity verification...\n');

        // 1. Verify Brochures
        console.log('--- 📄 VERIFYING BROCHURES ---');
        const brochures = await client.fetch(`*[_type == "brochure"] {
            _id,
            title,
            slug,
            "pdfUrl": pdfFile.asset->url
        }`);

        if (brochures.length === 0) {
            console.log('❌ No brochures found in Sanity.');
        } else {
            console.log(`✅ Found ${brochures.length} brochure(s):`);
            brochures.forEach(b => {
                console.log(`  - ID: ${b._id}`);
                console.log(`    Title: ${b.title}`);
                console.log(`    Slug: ${b.slug?.current || 'N/A'}`);
                console.log(`    PDF URL: ${b.pdfUrl || 'No file uploaded'}`);
            });
        }

        // 2. Verify Company Marquee Lines
        console.log('\n--- 🏢 VERIFYING COMPANY MARQUEES ---');
        const lines = await client.fetch(`*[_type == "marqueeLine"] | order(order asc) {
            _id,
            title,
            order,
            companies[] {
                name,
                "logoUrl": logo.asset->url
            }
        }`);

        if (lines.length === 0) {
            console.log('❌ No company marquee lines found in Sanity.');
        } else {
            console.log(`✅ Found ${lines.length} marquee line(s):`);
            lines.forEach(l => {
                console.log(`  - ${l.title} (Order: ${l.order}):`);
                const companyNames = l.companies?.map(c => c.name) || [];
                console.log(`    Companies Count: ${companyNames.length}`);
                console.log(`    Companies: ${companyNames.join(', ')}`);
                const missingLogos = l.companies?.filter(c => !l.companies[0] || !c.logoUrl) || [];
                if (missingLogos.length > 0) {
                    console.log(`    ⚠️ WARNING: ${missingLogos.length} companies are missing logo URLs!`);
                } else {
                    console.log(`    🍏 All logos uploaded successfully.`);
                }
            });
        }

    } catch (error) {
        console.error('❌ Verification failed with error:', error);
    }
}

verify();
