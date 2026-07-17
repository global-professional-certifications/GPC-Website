import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'upcomingAnnouncement',
    title: 'Upcoming Announcement',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title/Identifier',
            type: 'string',
            description: 'Internal title used for identifying this announcement in the CMS (e.g., "May price increase")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Announcement Content',
            type: 'text',
            rows: 3,
            description: 'The actual text shown in the important announcement bar on the website',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this announcement is visible on the website',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Used for sorting announcements if multiple are active (lower numbers show first)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'content',
            active: 'isActive',
        },
        prepare({ title, subtitle, active }) {
            return {
                title: title,
                subtitle: `${active ? '🟢 Active' : '🔴 Inactive'} - ${subtitle}`,
            }
        },
    },
})
