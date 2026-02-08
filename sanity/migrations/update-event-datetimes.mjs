/**
 * Migration Script: Update existing events with datetime fields
 *
 * This script adds eventStartDateTime and eventEndDateTime fields to existing events
 * based on their year and existing date information.
 *
 * Usage: node sanity/migrations/update-event-datetimes.mjs <YOUR_EDITOR_TOKEN>
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'x48sh1kt'
const DATASET = 'production'
const TOKEN = process.argv[2]

if (!TOKEN) {
    console.log('Usage: node sanity/migrations/update-event-datetimes.mjs <YOUR_EDITOR_TOKEN>')
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

// Event datetime configurations based on existing event IDs
// These are approximate dates - adjust as needed
const eventDatetimeConfig = [
    {
        eventId: 'event-bombay26',
        eventStartDateTime: '2026-01-08T09:00:00+05:30',
        eventEndDateTime: '2026-01-09T18:00:00+05:30',
        venue: 'Taj the Trees – Vikhroli, Mumbai',
        registrationLink: 'https://zfrmz.in/au1XcoFBbjvBs5iuy4TI',
        registrationButtonText: 'Register Now',
    },
    {
        eventId: 'event-hyderabad',
        eventStartDateTime: '2025-08-15T09:00:00+05:30',
        eventEndDateTime: '2025-08-15T18:00:00+05:30',
        venue: 'Hyderabad, Telangana',
    },
    {
        eventId: 'event-wofa',
        eventStartDateTime: '2025-02-01T09:00:00+05:30',
        eventEndDateTime: '2025-02-01T18:00:00+05:30',
        venue: 'Virtual Event',
    },
    {
        eventId: 'event-kolkata',
        eventStartDateTime: '2025-06-01T09:00:00+05:30',
        eventEndDateTime: '2025-06-01T18:00:00+05:30',
        venue: 'Kolkata, West Bengal',
    },
    {
        eventId: 'event-bangalore',
        eventStartDateTime: '2025-05-01T09:00:00+05:30',
        eventEndDateTime: '2025-05-01T18:00:00+05:30',
        venue: 'Bangalore, Karnataka',
    },
    {
        eventId: 'event-mumbai',
        eventStartDateTime: '2025-01-08T09:00:00+05:30',
        eventEndDateTime: '2025-01-09T18:00:00+05:30',
        venue: 'Mumbai, Maharashtra',
    },
    {
        eventId: 'event-delhi',
        eventStartDateTime: '2025-03-01T09:00:00+05:30',
        eventEndDateTime: '2025-03-01T18:00:00+05:30',
        venue: 'Delhi',
    },
]

async function updateEvent(config) {
    const patch = {
        eventStartDateTime: config.eventStartDateTime,
        eventEndDateTime: config.eventEndDateTime,
    }

    // Add venue if specified
    if (config.venue) {
        patch.venue = config.venue
    }

    // Add registration info if specified
    if (config.registrationLink) {
        patch.registrationLink = config.registrationLink
    }
    if (config.registrationButtonText) {
        patch.registrationButtonText = config.registrationButtonText
    }

    try {
        await client.patch(config.eventId).set(patch).commit()
        console.log(`  Updated ${config.eventId} successfully`)
    } catch (error) {
        console.log(`  Error updating ${config.eventId}: ${error.message}`)
    }
}

async function main() {
    console.log('Starting event datetime migration...\n')

    // First, let's see what events exist
    console.log('Fetching existing events...')
    const existingEvents = await client.fetch(`*[_type == "event"] { _id, eventName, year, date }`)
    console.log('Existing events:')
    existingEvents.forEach(e => console.log(`  - ${e._id}: ${e.eventName} (${e.year})`))
    console.log('')

    console.log('Updating events with datetime fields...\n')

    for (const config of eventDatetimeConfig) {
        console.log(`Processing: ${config.eventId}`)
        await updateEvent(config)
    }

    console.log('\n' + '='.repeat(60))
    console.log('Migration complete!')
    console.log('='.repeat(60))
    console.log('\nNote: The eventStartDateTime and eventEndDateTime fields have been added.')
    console.log('Events with eventEndDateTime in the future will appear as "Upcoming".')
    console.log('Events with eventEndDateTime in the past will appear as "Past Events".')
    console.log('\nVisit https://gpc-website.sanity.studio/ to verify and adjust dates as needed.')
}

main().catch(console.error)
