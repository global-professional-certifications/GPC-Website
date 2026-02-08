/**
 * Migration Script: Convert 'event' documents to 'pastEvent' documents
 *
 * This script fetches all existing 'event' documents and creates corresponding
 * 'pastEvent' documents with the same data.
 *
 * Usage: node sanity/migrations/migrate-event-to-pastEvent.mjs <YOUR_EDITOR_TOKEN>
 *
 * Get a token with Editor permissions from:
 * https://www.sanity.io/manage/project/x48sh1kt/api#tokens
 */

const PROJECT_ID = 'x48sh1kt'
const DATASET = 'production'

const TOKEN = process.argv[2]

if (!TOKEN) {
    console.log('Usage: node sanity/migrations/migrate-event-to-pastEvent.mjs <YOUR_EDITOR_TOKEN>')
    console.log('')
    console.log('Get a token with Editor permissions from:')
    console.log('https://www.sanity.io/manage/project/x48sh1kt/api#tokens')
    process.exit(1)
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`
const QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}`

async function fetchEvents() {
    const query = encodeURIComponent(`*[_type == "event"] {
        _id,
        eventName,
        slug,
        title,
        description,
        location,
        date,
        year,
        order,
        isActive,
        coverImage,
        galleryImages
    }`)

    const response = await fetch(`${QUERY_URL}?query=${query}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(JSON.stringify(error, null, 2))
    }

    const data = await response.json()
    return data.result
}

async function runMutation(mutations) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ mutations })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(JSON.stringify(error, null, 2))
    }

    return response.json()
}

async function main() {
    console.log('Fetching existing events...\n')

    const events = await fetchEvents()

    if (events.length === 0) {
        console.log('No events found to migrate.')
        return
    }

    console.log(`Found ${events.length} events to migrate.\n`)

    const mutations = events.map(event => ({
        createOrReplace: {
            _type: 'pastEvent',
            _id: event._id.replace('event-', 'pastEvent-'),
            eventName: event.eventName,
            slug: event.slug,
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            year: event.year,
            order: event.order || 0,
            isActive: event.isActive !== false,
            coverImage: event.coverImage,
            galleryImages: event.galleryImages,
        }
    }))

    try {
        await runMutation(mutations)
        console.log(`Successfully migrated ${events.length} events to pastEvent!\n`)

        console.log('Events migrated:')
        events.forEach(e => {
            console.log(`  - ${e.eventName} (${e.year})`)
        })

        console.log('\n' + '='.repeat(60))
        console.log('Migration Complete!')
        console.log('='.repeat(60))
        console.log('\nThe old "event" documents are still in the database.')
        console.log('You can delete them manually from Sanity Studio if needed.')
        console.log('='.repeat(60))

    } catch (error) {
        console.error('Error migrating events:', error.message)
        process.exit(1)
    }
}

main().catch(console.error)
