import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonialCourse',
    title: 'Testimonial Course',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Course Name',
            type: 'string',
            description: 'Short name like CIA, CISA, CRMA',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            description: 'Full name like "Certified Internal Auditor"',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 50,
            },
            validation: (Rule) => Rule.required(),
            description: 'Used for URL and filtering',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
            description: 'Order in which courses appear (lower = first)',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
            description: 'Only active courses show on frontend',
        }),
        defineField({
            name: 'category',
            title: 'Course Section',
            type: 'string',
            options: {
                list: [
                    { title: 'Video Testimonials (Video Vault)', value: 'video' },
                    { title: 'Written Testimonials (Read Journey)', value: 'written' },
                    { title: 'Mobile Screenshots', value: 'image' },
                    { title: 'Wall of Excellence', value: 'wallOfExcellence' },
                ],
            },
            description: 'This uniquely defines which section this course tab belongs to.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            isActive: 'isActive',
            category: 'category',
        },
        prepare({ title, isActive, category }) {
            return {
                title,
                subtitle: `${category ? `[${category.toUpperCase()}] ` : ''}${isActive ? 'Active' : 'Inactive'}`,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
