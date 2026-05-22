import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

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

const linesConfig = [
  {
    id: "marquee-line-1",
    title: "Line 1",
    order: 1,
    files: [
      { name: "Accenture", file: "Accenture.webp" },
      { name: "Aditya Birla Group", file: "Aditya Birla Group.webp" },
      { name: "Airtel", file: "Airtel.webp" },
      { name: "American Express", file: "American Express.webp" },
      { name: "Axa", file: "Axa.webp" },
      { name: "Axis Max Life Insurance", file: "Axis Max Life Insurance.webp" },
      { name: "Bandhan Bank", file: "Bandhan Bank.webp" },
      { name: "Bank of America", file: "Bank of America.webp" },
      { name: "Bank of India", file: "Bank of India.webp" },
      { name: "BNY", file: "BNY.webp" },
      { name: "British Telecom", file: "British Telecom.webp" },
      { name: "CAG of India", file: "CAG of India.webp" },
      { name: "CitiBank", file: "CitiBank.webp" },
      { name: "Colgate Palmolive", file: "Colgate Palmolive.webp" }
    ]
  },
  {
    id: "marquee-line-2",
    title: "Line 2",
    order: 2,
    files: [
      { name: "Dell Technologies", file: "Dell Technologies.webp" },
      { name: "DP World", file: "DP World.webp" },
      { name: "DXC Technology", file: "DXC Technology.webp" },
      { name: "Emirates NBD", file: "Emirates NBD.webp" },
      { name: "Franklin Templeton Investments", file: "Franklin Templeton Investments.webp" },
      { name: "Genpact", file: "Genpact.webp" },
      { name: "Grant Thornton", file: "Grant Thornton.webp" },
      { name: "Halliburton", file: "Halliburton.webp" },
      { name: "HDFC Bank", file: "HDFC Bank.webp" },
      { name: "IBM", file: "IBM.webp" },
      { name: "ICICI Bank", file: "ICICI Bank.webp" },
      { name: "Indian Oil", file: "Indian Oil.webp" },
      { name: "IndusInd Bank", file: "IndusInd Bank.webp" }
    ]
  },
  {
    id: "marquee-line-3",
    title: "Line 3",
    order: 3,
    files: [
      { name: "Invesco", file: "Invesco.webp" },
      { name: "Jio", file: "Jio.webp" },
      { name: "Koch Industries", file: "Koch Industries.webp" },
      { name: "MG Motor", file: "MG Motor.webp" },
      { name: "NSDC", file: "NSDC.webp" },
      { name: "Protiviti", file: "Protiviti.webp" },
      { name: "PVH", file: "PVH.webp" },
      { name: "Qatar National Bank", file: "Qatar National Bank.webp" },
      { name: "RBL Bank", file: "RBL Bank.webp" },
      { name: "Reliance Industries Ltd", file: "Reliance Industries Ltd.webp" },
      { name: "ReNew", file: "ReNew.webp" },
      { name: "Shell", file: "Shell.webp" },
      { name: "Sobha Realty", file: "Sobha Realty.webp" }
    ]
  },
  {
    id: "marquee-line-4",
    title: "Line 4",
    order: 4,
    files: [
      { name: "Societe Generale", file: "Societe Generale.webp" },
      { name: "State Bank of India", file: "State Bank of India.webp" },
      { name: "State Street", file: "State Street.webp" },
      { name: "Sun Pharma", file: "Sun Pharma.webp" },
      { name: "Swiss Re", file: "Swiss Re.webp" },
      { name: "Tally", file: "Tally.webp" },
      { name: "Tata Elxsi", file: "Tata Elxsi.webp" },
      { name: "TCS", file: "TCS.webp" },
      { name: "Tesco", file: "Tesco.webp" },
      { name: "UBS Investment Bank", file: "UBS Investment Bank.webp" },
      { name: "Vodafone Idea", file: "Vodafone Idea.webp" },
      { name: "Wipro", file: "Wipro.webp" },
      { name: "Yes Bank", file: "Yes Bank.webp" }
    ]
  }
];

async function uploadMarqueeCompanies() {
    try {
        console.log('🚀 Starting Company Marquee Logos upload to Sanity...');
        const companiesAssetsDir = path.join(__dirname, '../src/assets/Companies');

        if (!fs.existsSync(companiesAssetsDir)) {
            throw new Error(`Companies asset directory not found at ${companiesAssetsDir}`);
        }

        // Cache uploaded image assets to avoid uploading duplicates if they are used multiple times
        const uploadedAssetsCache = {};

        for (const line of linesConfig) {
            console.log(`\n📦 Processing ${line.title} (Order: ${line.order})...`);
            const companiesList = [];

            for (const item of line.files) {
                const filePath = path.join(companiesAssetsDir, item.file);
                if (!fs.existsSync(filePath)) {
                    console.warn(`⚠️ Warning: Logo file not found at ${filePath}. Skipping.`);
                    continue;
                }

                let assetId;
                if (uploadedAssetsCache[item.file]) {
                    assetId = uploadedAssetsCache[item.file];
                    console.log(`  - Using cached asset for ${item.name} (${item.file})`);
                } else {
                    console.log(`  - Uploading ${item.name} (${item.file})...`);
                    const fileBuffer = fs.readFileSync(filePath);
                    const asset = await client.assets.upload('image', fileBuffer, {
                        filename: item.file,
                        contentType: 'image/webp'
                    });
                    assetId = asset._id;
                    uploadedAssetsCache[item.file] = assetId;
                    console.log(`    ✅ Uploaded successfully: ${assetId}`);
                }

                companiesList.push({
                    _key: randomUUID().replace(/-/g, '').slice(0, 12),
                    name: item.name,
                    logo: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: assetId
                        }
                    }
                });
            }

            const doc = {
                _type: 'marqueeLine',
                _id: line.id,
                title: line.title,
                order: line.order,
                companies: companiesList
            };

            console.log(`⏳ Creating/Replacing document ${line.id} in Sanity...`);
            const result = await client.createOrReplace(doc);
            console.log(`✅ Success! Registered ${line.title} with ${companiesList.length} companies.`);
        }

        console.log('\n🎉 All Company Marquee Logos uploaded and registered successfully!');
    } catch (error) {
        console.error('❌ Upload failed:', error.message);
        process.exit(1);
    }
}

uploadMarqueeCompanies();
