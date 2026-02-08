import { defineField, defineType } from 'sanity'

// Legacy event schema - kept for backward compatibility with existing data
// New events should use 'upcomingEvent' or 'pastEvent' schemas
export default defineType({
    name: 'event',
    title: 'Event (Legacy)',
    type: 'document',
    fields: [
        defineField({
            name: 'eventName',
            title: 'Event Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'eventName',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'title',
            title: 'Title/Tagline',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location/City',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date Display',
            type: 'string',
        }),
        defineField({
            name: 'eventStartDateTime',
            title: 'Event Start Date & Time',
            type: 'datetime',
        }),
        defineField({
            name: 'eventEndDateTime',
            title: 'Event End Date & Time',
            type: 'datetime',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url',
        }),
        defineField({
            name: 'registrationButtonText',
            title: 'Registration Button Text',
            type: 'string',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
        }),
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
                title: `[Legacy] ${title}`,
                subtitle: `${year} - ${subtitle}`,
                media: media,
            }
        },
    },
})
