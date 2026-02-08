/**
 * Standalone Migration Script
 * Creates courses and assigns testimonials to CIA
 */

const PROJECT_ID = 'x48sh1kt'
const DATASET = 'production'

// You need a token with Editor permissions
// Get one from: https://www.sanity.io/manage/project/x48sh1kt/api#tokens
const TOKEN = process.argv[2]

if (!TOKEN) {
    console.log('Usage: node run-migration.mjs <YOUR_EDITOR_TOKEN>')
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

async function main() {
    console.log('Step 1: Creating courses...')

    const courses = [
        {
            createOrReplace: {
                _type: 'testimonialCourse',
                _id: 'course-cia',
                name: 'CIA',
                fullName: 'Certified Internal Auditor',
                slug: { _type: 'slug', current: 'cia' },
                order: 1,
                isActive: true,
            }
        },
        {
            createOrReplace: {
                _type: 'testimonialCourse',
                _id: 'course-cisa',
                name: 'CISA',
                fullName: 'Certified Information Systems Auditor',
                slug: { _type: 'slug', current: 'cisa' },
                order: 2,
                isActive: true,
            }
        }
    ]

    try {
        await runMutation(courses)
        console.log('Created: CIA and CISA courses')
    } catch (error) {
        console.error('Error creating courses:', error.message)
        process.exit(1)
    }

    console.log('\nStep 2: Finding unassigned testimonials...')

    const queryUrl = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*[_type == "successStory" && !defined(course)]{ _id, name, category }`

    const queryResponse = await fetch(queryUrl, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    })

    const { result: testimonials } = await queryResponse.json()

    if (!testimonials || testimonials.length === 0) {
        console.log('No unassigned testimonials found.')
        console.log('\nMigration complete!')
        return
    }

    console.log(`Found ${testimonials.length} testimonials to assign to CIA.`)

    const patches = testimonials.map(t => ({
        patch: {
            id: t._id,
            set: {
                course: { _type: 'reference', _ref: 'course-cia' }
            }
        }
    }))

    try {
        await runMutation(patches)
        console.log(`Assigned ${testimonials.length} testimonials to CIA.`)
    } catch (error) {
        console.error('Error assigning testimonials:', error.message)
        process.exit(1)
    }

    console.log('\nMigration complete!')
}

main().catch(console.error)
