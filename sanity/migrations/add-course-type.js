/**
 * Migration Script: Add courseType to existing Success Stories
 * 
 * This script updates all existing successStory documents that don't have
 * a courseType field, setting them to 'cia' (the default).
 * 
 * To run this migration:
 * 1. cd to the sanity folder
 * 2. Run: npx sanity exec migrations/add-course-type.js --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN
})

async function migrate() {
    console.log('Starting migration: Adding courseType to existing success stories...')

    // Fetch all success stories without courseType
    const query = `*[_type == "successStory" && !defined(courseType)]{ _id, name }`
    const stories = await client.fetch(query)

    console.log(`Found ${stories.length} stories without courseType`)

    if (stories.length === 0) {
        console.log('No stories need migration. All stories already have courseType.')
        return
    }

    // Update each story with courseType: 'cia'
    const transaction = client.transaction()

    for (const story of stories) {
        console.log(`Updating: ${story.name} (${story._id})`)
        transaction.patch(story._id, {
            set: { courseType: 'cia' }
        })
    }

    const result = await transaction.commit()
    console.log(`Migration complete! Updated ${stories.length} stories.`)
    console.log('Result:', result)
}

migrate().catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
})
