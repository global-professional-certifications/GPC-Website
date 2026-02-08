/**
 * Migration: Assign existing testimonials to CIA course
 *
 * This script finds all successStory documents without a course reference
 * and assigns them to the CIA course.
 *
 * To run:
 * 1. Add your Sanity token to .env as SANITY_AUTH_TOKEN
 * 2. Run: node sanity/migrations/assign-testimonials-to-cia.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN
})

const CIA_COURSE_ID = 'course-cia'

async function assignTestimonialsToCIA() {
    console.log('Finding testimonials without a course...')

    // Find all successStory documents without a course reference
    const testimonials = await client.fetch(
        `*[_type == "successStory" && !defined(course)] { _id, name, category }`
    )

    if (testimonials.length === 0) {
        console.log('No unassigned testimonials found.')
        return
    }

    console.log(`Found ${testimonials.length} testimonials to update.`)

    for (const testimonial of testimonials) {
        try {
            await client
                .patch(testimonial._id)
                .set({
                    course: {
                        _type: 'reference',
                        _ref: CIA_COURSE_ID
                    }
                })
                .commit()

            console.log(`Updated: ${testimonial.name} (${testimonial.category})`)
        } catch (error) {
            console.error(`Error updating ${testimonial.name}:`, error.message)
        }
    }

    console.log('\nMigration complete!')
    console.log(`Assigned ${testimonials.length} testimonials to CIA course.`)
}

assignTestimonialsToCIA().catch(console.error)
