/**
 * Seed Script: Create initial Testimonial Courses
 * 
 * Creates CIA and CISA courses in Sanity.
 * Run this after deploying schema changes.
 * 
 * To run:
 * 1. Add your Sanity token to .env as SANITY_AUTH_TOKEN
 * 2. Run: node sanity/migrations/seed-courses.js
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

const courses = [
    {
        _type: 'testimonialCourse',
        _id: 'course-cia',
        name: 'CIA',
        fullName: 'Certified Internal Auditor',
        slug: { _type: 'slug', current: 'cia' },
        order: 1,
        isActive: true,
    },
    {
        _type: 'testimonialCourse',
        _id: 'course-cisa',
        name: 'CISA',
        fullName: 'Certified Information Systems Auditor',
        slug: { _type: 'slug', current: 'cisa' },
        order: 2,
        isActive: true,
    },
    {
        _type: 'testimonialCourse',
        _id: 'course-crma',
        name: 'CRMA',
        fullName: 'Certification in Risk Management Assurance',
        slug: { _type: 'slug', current: 'crma' },
        order: 3,
        isActive: false,
    },
    {
        _type: 'testimonialCourse',
        _id: 'course-iap',
        name: 'IAP',
        fullName: 'Internal Audit Practitioner',
        slug: { _type: 'slug', current: 'iap' },
        order: 4,
        isActive: false,
    },
]

async function seedCourses() {
    console.log('Creating testimonial courses...')

    for (const course of courses) {
        try {
            const result = await client.createOrReplace(course)
            console.log(`Created/Updated: ${result.name} (${result._id})`)
        } catch (error) {
            console.error(`Error creating ${course.name}:`, error.message)
        }
    }

    console.log('\\nSeeding complete!')
    console.log('Note: CRMA and IAP are set to inactive by default.')
    console.log('Enable them in Sanity Studio when ready.')
}

seedCourses().catch(console.error)
