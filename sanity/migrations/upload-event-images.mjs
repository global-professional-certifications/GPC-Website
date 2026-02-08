/**
 * Migration Script: Upload event images to Sanity
 *
 * This script uploads all event images (cover + gallery) to Sanity
 * and updates the event documents with the image references.
 *
 * Usage: node sanity/migrations/upload-event-images.mjs <YOUR_EDITOR_TOKEN>
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ID = 'x48sh1kt'
const DATASET = 'production'
const TOKEN = process.argv[2]

if (!TOKEN) {
    console.log('Usage: node sanity/migrations/upload-event-images.mjs <YOUR_EDITOR_TOKEN>')
    console.log('')
    console.log('Get a token with Editor permissions from:')
    console.log('https://www.sanity.io/manage/project/x48sh1kt/api#tokens')
    process.exit(1)
}

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-01-01',
    token: TOKEN,
    useCdn: false,
})

// Base path for assets
const ASSETS_BASE = path.join(__dirname, '..', '..', 'src', 'assets')

// Event image configurations
const eventImageConfig = [
    {
        eventId: 'event-bombay26',
        eventName: 'IIA Mumbai 2026',
        coverImage: 'iia-bombay-26/iiabombay2026-image7.jpg',
        galleryImages: [
            'iia-bombay-26/iiabombay2026-image1.jpg',
            'iia-bombay-26/iiabombay2026-image2.jpg',
            'iia-bombay-26/iiabombay2026-image3.jpg',
            'iia-bombay-26/iiabombay2026-image4.jpg',
            'iia-bombay-26/iiabombay2026-image5.jpg',
            'iia-bombay-26/iiabombay2026-image6.jpg',
            'iia-bombay-26/iiabombay2026-image7.jpg',
            'iia-bombay-26/iiabombay2026-image8.jpg',
            'iia-bombay-26/iiabombay2026-image9.jpg',
        ]
    },
    {
        eventId: 'event-hyderabad',
        eventName: 'IIA Hyderabad',
        coverImage: 'iia-hyderabad/iia-hyderabad-1.webp',
        galleryImages: [
            'iia-hyderabad/iia-hyderabad-1.jpeg',
            'iia-hyderabad/iia-hyderabad-2.jpeg',
            'iia-hyderabad/iia-hyderabad-3.jpeg',
            'iia-hyderabad/iia-hyderabad-4.jpeg',
            'iia-hyderabad/iia-hyderabad-5.jpeg',
            'iia-hyderabad/iia-hyderabad-6.jpeg',
            'iia-hyderabad/iia-hyderabad-7.jpeg',
            'iia-hyderabad/iia-hyderabad-8.jpeg',
            'iia-hyderabad/iia-hyderabad-9.jpeg',
        ]
    },
    {
        eventId: 'event-wofa',
        eventName: 'WOFA 2025',
        coverImage: 'wofa-banner.webp',
        galleryImages: [
            'wofa-2025/wofa-1.jpeg',
            'wofa-2025/wofa-2.jpeg',
            'wofa-2025/wofa-3.jpeg',
            'wofa-2025/wofa-4.jpeg',
            'wofa-2025/wofa-5.jpeg',
            'wofa-2025/wofa-6.jpeg',
            'wofa-2025/wofa-7.jpeg',
            'wofa-2025/wofa-8.jpeg',
        ]
    },
    {
        eventId: 'event-kolkata',
        eventName: 'IIA Kolkata',
        coverImage: 'iia-kolkata-banner.webp',
        galleryImages: [
            'iia-kolkata/iia-kolkata-2.jpeg',
            'iia-kolkata/iia-kolkata-3.jpg',
        ]
    },
    {
        eventId: 'event-bangalore',
        eventName: 'IIA Bangalore',
        coverImage: 'iia-bengaluru-banner.webp',
        galleryImages: [
            'iia-bangalore/iia-bangalore-3.jpeg',
            'iia-bangalore/iia-bangalore-6.jpeg',
        ]
    },
    {
        eventId: 'event-mumbai',
        eventName: 'IIA Mumbai 2025',
        coverImage: 'iia-mumbai-banner.webp',
        galleryImages: [
            'iia-bombay/IIA-bombay-5.jpg',
            'iia-bombay/IIA-bombay-9.jpg',
        ]
    },
    {
        eventId: 'event-delhi',
        eventName: 'AGM IIA Delhi',
        coverImage: 'AGM-IIA-Delhi/AGM-IIA-Delhi-7-events.webp',
        galleryImages: [
            'AGM-IIA-Delhi/AGM-IIA-Delhi-1.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-2.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-3.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-4.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-5.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-6.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-7.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-8.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-9.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-10.webp',
            'AGM-IIA-Delhi/AGM-IIA-Delhi-11.webp',
        ]
    },
]

async function uploadImage(filePath, filename) {
    const fullPath = path.join(ASSETS_BASE, filePath)

    if (!fs.existsSync(fullPath)) {
        console.log(`  Warning: File not found: ${fullPath}`)
        return null
    }

    try {
        const imageBuffer = fs.readFileSync(fullPath)
        const asset = await client.assets.upload('image', imageBuffer, {
            filename: filename || path.basename(filePath),
        })
        return asset._id
    } catch (error) {
        console.log(`  Error uploading ${filePath}: ${error.message}`)
        return null
    }
}

async function updateEventWithImages(eventId, coverImageId, galleryImageIds) {
    const galleryImages = galleryImageIds
        .filter(id => id !== null)
        .map(id => ({
            _type: 'image',
            _key: `gallery-${Math.random().toString(36).substr(2, 9)}`,
            asset: {
                _type: 'reference',
                _ref: id
            }
        }))

    const patch = {
        coverImage: coverImageId ? {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: coverImageId
            }
        } : undefined,
        galleryImages: galleryImages.length > 0 ? galleryImages : undefined
    }

    // Remove undefined values
    Object.keys(patch).forEach(key => patch[key] === undefined && delete patch[key])

    if (Object.keys(patch).length === 0) {
        console.log(`  No images to update for ${eventId}`)
        return
    }

    await client.patch(eventId).set(patch).commit()
}

async function main() {
    console.log('Starting image upload to Sanity...\n')
    console.log('Assets base path:', ASSETS_BASE)
    console.log('')

    for (const config of eventImageConfig) {
        console.log(`\nProcessing: ${config.eventName}`)
        console.log('-'.repeat(40))

        // Upload cover image
        console.log(`  Uploading cover image: ${config.coverImage}`)
        const coverImageId = await uploadImage(config.coverImage, `${config.eventId}-cover`)
        if (coverImageId) {
            console.log(`  Cover image uploaded successfully`)
        }

        // Upload gallery images
        console.log(`  Uploading ${config.galleryImages.length} gallery images...`)
        const galleryImageIds = []
        for (let i = 0; i < config.galleryImages.length; i++) {
            const imgPath = config.galleryImages[i]
            process.stdout.write(`    [${i + 1}/${config.galleryImages.length}] ${path.basename(imgPath)}... `)
            const imageId = await uploadImage(imgPath, `${config.eventId}-gallery-${i + 1}`)
            if (imageId) {
                galleryImageIds.push(imageId)
                console.log('OK')
            } else {
                console.log('FAILED')
            }
        }

        // Update the event document
        console.log(`  Updating event document...`)
        try {
            await updateEventWithImages(config.eventId, coverImageId, galleryImageIds)
            console.log(`  Event updated successfully!`)
        } catch (error) {
            console.log(`  Error updating event: ${error.message}`)
        }
    }

    console.log('\n' + '='.repeat(60))
    console.log('Image migration complete!')
    console.log('='.repeat(60))
    console.log('\nAll events should now have their images in Sanity.')
    console.log('Visit https://gpc-website.sanity.studio/ to verify.')
}

main().catch(console.error)
