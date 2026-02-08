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
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'fullName',
            isActive: 'isActive',
        },
        prepare({ title, subtitle, isActive }) {
            return {
                title: isActive ? title : `${title} (inactive)`,
                subtitle: subtitle || '',
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
