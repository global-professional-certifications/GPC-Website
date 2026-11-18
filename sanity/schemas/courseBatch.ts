import { defineField, defineType } from 'sanity'

/*
 * Batch card shown in the "Live Batch Schedule & Upcoming Cohort Timelines"
 * section of a course page (currently the CIA page).
 *
 * Managed from the Studio sidebar: Courses -> <course> -> Upcoming Batches.
 * Documents created there get their `course` set automatically.
 */

export const COURSE_BATCH_COURSES = [
    { title: 'CIA', value: 'cia' },
    { title: 'CISA', value: 'cisa' },
    { title: 'IAP', value: 'iap' },
]

export default defineType({
    name: 'courseBatch',
    title: 'Course Batch',
    type: 'document',
    fields: [
        defineField({
            name: 'course',
            title: 'Course Page',
            type: 'string',
            description: 'Which course page shows this batch. Set automatically when created from the course folder.',
            options: { list: COURSE_BATCH_COURSES, layout: 'radio', direction: 'horizontal' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Course Name',
            type: 'string',
            description: 'Shown as the card heading (e.g., "CIA Part 1 – Weekend Batch")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Starting Date',
            type: 'date',
            description: 'Batch start date (shown as e.g. "25 Jun 2026")',
            options: { dateFormat: 'YYYY-MM-DD' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'scheduleFile',
            title: 'Schedule (PDF or Image)',
            type: 'file',
            description: 'Opens in a new tab when visitors click "View Details". Upload a PDF, PNG or JPG.',
            options: { accept: '.pdf,.png,.jpg,.jpeg,.webp' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Turn off to hide this batch from the website without deleting it',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers show first. Batches with the same number are sorted by starting date.',
            initialValue: 0,
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }, { field: 'startDate', direction: 'asc' }] },
        { title: 'Starting Date', name: 'startDateAsc', by: [{ field: 'startDate', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'title', startDate: 'startDate', active: 'isActive', course: 'course' },
        prepare({ title, startDate, active, course }) {
            const status = active === false ? '🔴 Inactive' : '🟢 Active'
            return {
                title: title || 'Untitled batch',
                subtitle: `${status} · ${(course || '').toUpperCase()} · Starts: ${startDate || 'TBD'}`,
            }
        },
    },
})
