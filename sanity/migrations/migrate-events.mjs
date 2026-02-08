/**
 * Migration Script: Migrate existing events to Sanity
 *
 * This script creates event documents in Sanity with all the existing event data.
 * Images need to be uploaded manually via Sanity Studio after running this script.
 *
 * Usage: node sanity/migrations/migrate-events.mjs <YOUR_EDITOR_TOKEN>
 *
 * Get a token with Editor permissions from:
 * https://www.sanity.io/manage/project/x48sh1kt/api#tokens
 */

const PROJECT_ID = 'x48sh1kt'
const DATASET = 'production'

const TOKEN = process.argv[2]

if (!TOKEN) {
    console.log('Usage: node sanity/migrations/migrate-events.mjs <YOUR_EDITOR_TOKEN>')
    console.log('')
    console.log('Get a token with Editor permissions from:')
    console.log('https://www.sanity.io/manage/project/x48sh1kt/api#tokens')
    process.exit(1)
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

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

// 2026 Events Data
const events2026 = [
    {
        _id: 'event-bombay26',
        eventName: 'IIA Mumbai 2026',
        slug: 'iia-mumbai-2026',
        title: 'At the IIA Mumbai Chapter event, we engaged with audit leaders and professionals to explore the future of internal auditing and governance excellence.',
        description: 'The event brought together industry experts and practitioners, fostering meaningful discussions on emerging audit practices and regulatory frameworks in today\'s evolving business landscape.',
        location: 'Vikhroli, Mumbai, India',
        date: '8th & 9th January 2026',
        year: 2026,
        order: 1,
        isActive: true,
        // Note: coverImage and galleryImages need to be uploaded via Sanity Studio
        // Cover image: src/assets/iia-bombay-26/iiabombay2026-image7.jpg
        // Gallery images: src/assets/iia-bombay-26/iiabombay2026-image1.jpg through image9.jpg
    },
]

// 2025 Events Data
const events2025 = [
    {
        _id: 'event-hyderabad',
        eventName: 'IIA Hyderabad',
        slug: 'iia-hyderabad',
        title: 'At the IIA Hyderabad Chapter event, we connected with insightful audit professionals to exchange perspectives on the evolving landscape of internal audit and risk management.',
        description: 'A convergence of ideas and expertise, the event underscored the evolving role of auditors in a rapidly changing world.',
        location: 'Hyderabad, Telengana, India',
        date: '24th May 2025',
        year: 2025,
        order: 1,
        isActive: true,
        // Cover image: src/assets/iia-hyderabad/iia-hyderabad-1.webp
        // Gallery images: src/assets/iia-hyderabad/iia-hyderabad-1.jpeg through 9.jpeg
    },
    {
        _id: 'event-wofa',
        eventName: 'WOFA 2025',
        slug: 'wofa-2025',
        title: 'We were proud to be a part of WOFA 2025, where leaders and changemakers came together to drive innovation and empowerment.',
        description: 'From powerful discussions to meaningful connections, the event was a celebration of global collaboration and forward thinking.',
        location: 'New Delhi, India',
        date: '31st Jan 2025 - 2nd Feb 2025',
        year: 2025,
        order: 2,
        isActive: true,
        // Cover image: src/assets/wofa-banner.webp
        // Gallery images: src/assets/wofa-2025/wofa-1.jpeg through 8.jpeg
    },
    {
        _id: 'event-kolkata',
        eventName: 'IIA Kolkata',
        slug: 'iia-kolkata',
        title: 'We engaged with leading internal audit professionals at the IIA Kolkata Chapter event, exploring emerging trends in governance and risk.',
        description: 'The sessions fostered meaningful dialogue and highlighted the evolving role of auditors in today\'s dynamic landscape.',
        location: 'Kolkata, West Bengal, India',
        date: '10th Feb 2025',
        year: 2025,
        order: 3,
        isActive: true,
        // Cover image: src/assets/iia-kolkata-banner.webp
        // Gallery images: src/assets/iia-kolkata/iia-kolkata-2.jpeg, iia-kolkata-3.jpg
    },
    {
        _id: 'event-bangalore',
        eventName: 'IIA Bangalore',
        slug: 'iia-bangalore',
        title: 'At the IIA Bengaluru Chapter conference, we participated in insightful discussions on innovation in internal auditing.',
        description: 'The event brought together experts and thought leaders, creating a powerful platform for knowledge exchange and collaboration.',
        location: 'Bengaluru, Karnataka, India',
        date: '19th Feb 2025',
        year: 2025,
        order: 4,
        isActive: true,
        // Cover image: src/assets/iia-bengaluru-banner.webp
        // Gallery images: src/assets/iia-bangalore/iia-bangalore-3.jpeg, iia-bangalore-6.jpeg
    },
    {
        _id: 'event-mumbai',
        eventName: 'IIA Mumbai',
        slug: 'iia-mumbai-2025',
        title: 'The IIA Mumbai Chapter event was a hub of ideas and industry insights, focused on enhancing audit excellence.',
        description: 'We connected with professionals driving change and shared in the mission to elevate internal audit practices across sectors.',
        location: 'Mumbai, Maharashtra, India',
        date: '5th March 2025',
        year: 2025,
        order: 5,
        isActive: true,
        // Cover image: src/assets/iia-mumbai-banner.webp
        // Gallery images: src/assets/iia-bombay/IIA-bombay-5.jpg, IIA-bombay-9.jpg
    },
    {
        _id: 'event-delhi',
        eventName: 'AGM IIA Delhi',
        slug: 'agm-iia-delhi',
        title: 'At the AGM IIA Delhi Chapter, we collaborated with audit experts to discuss advancements and strategies for elevating internal audit practices.',
        description: 'The AGM IIA Delhi Chapter united audit professionals to share insights and strategies, advancing the future of internal auditing.',
        location: 'New Delhi, India',
        date: '18th July 2025',
        year: 2025,
        order: 6,
        isActive: true,
        // Cover image: src/assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-events.webp
        // Gallery images: src/assets/AGM-IIA-Delhi/AGM-IIA-Delhi-1.webp through 11.webp
    },
]

async function main() {
    console.log('Migrating events to Sanity...\n')

    const allEvents = [...events2026, ...events2025]

    const mutations = allEvents.map(event => ({
        createOrReplace: {
            _type: 'event',
            _id: event._id,
            eventName: event.eventName,
            slug: { _type: 'slug', current: event.slug },
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            year: event.year,
            order: event.order,
            isActive: event.isActive,
            // Note: Images will need to be uploaded manually via Sanity Studio
        }
    }))

    try {
        await runMutation(mutations)
        console.log(`Successfully created ${allEvents.length} events!\n`)

        console.log('Events created:')
        allEvents.forEach(e => {
            console.log(`  - ${e.eventName} (${e.year})`)
        })

        console.log('\n' + '='.repeat(60))
        console.log('IMPORTANT: Next Steps')
        console.log('='.repeat(60))
        console.log('\nImages need to be uploaded manually via Sanity Studio:')
        console.log('\n1. Go to https://gpc-website.sanity.studio/')
        console.log('2. Navigate to Events in the sidebar')
        console.log('3. For each event, upload:')
        console.log('   - Cover Image (main event card image)')
        console.log('   - Gallery Images (for the "See More Images" modal)')
        console.log('\nImage locations are commented in this script for reference.')
        console.log('='.repeat(60))

    } catch (error) {
        console.error('Error creating events:', error.message)
        process.exit(1)
    }
}

main().catch(console.error)
