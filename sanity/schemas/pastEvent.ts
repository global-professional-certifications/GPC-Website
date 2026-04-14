import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pastEvent',
    title: 'Past Event',
    type: 'document',
    fields: [
        defineField({
            name: 'eventName',
            title: 'Event Name',
            type: 'string',
            description: 'Short name for the event (e.g., "IIA Mumbai 2025")',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'eventName',
                maxLength: 96,
            },
            description: 'Used for gallery modal identification',
        }),
        defineField({
            name: 'title',
            title: 'Title/Tagline',
            type: 'text',
            rows: 3,
            description: 'A brief tagline or description displayed on the event card',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Detailed description of the event',
        }),
        defineField({
            name: 'location',
            title: 'Location/City',
            type: 'string',
            description: 'Event city/location (e.g., "Mumbai, Maharashtra, India")',
        }),
        defineField({
            name: 'date',
            title: 'Date Display',
            type: 'string',
            description: 'Date as displayed (e.g., "8th & 9th January 2025")',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            description: 'Year of the event for filtering (e.g., 2024, 2025)',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Main cover image for the event card',
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            options: {
                layout: 'grid',
            },
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            description: 'Images for the event gallery (shown in "See More Images" modal)',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which events appear (lower numbers first)',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this event is visible on the website',
            initialValue: true,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Year (Newest First)',
            name: 'yearDesc',
            by: [{ field: 'year', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'eventName',
            subtitle: 'date',
            media: 'coverImage',
            year: 'year',
        },
        prepare({ title, subtitle, media, year }) {
            return {
                title: title,
                subtitle: `${year} - ${subtitle}`,
                media: media,
            }
        },
    },
})
