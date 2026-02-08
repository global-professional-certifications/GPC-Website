import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'upcomingEvent',
    title: 'Upcoming Event',
    type: 'document',
    fields: [
        defineField({
            name: 'eventName',
            title: 'Event Name',
            type: 'string',
            description: 'Short name for the event (e.g., "IIA Mumbai 2026")',
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
            name: 'venue',
            title: 'Venue',
            type: 'string',
            description: 'Event venue (e.g., "Taj the Trees – Vikhroli, Mumbai")',
        }),
        defineField({
            name: 'date',
            title: 'Date Display',
            type: 'string',
            description: 'Date as displayed (e.g., "8th & 9th January 2026")',
        }),
        defineField({
            name: 'eventStartDateTime',
            title: 'Event Start Date & Time',
            type: 'datetime',
            description: 'When the event starts (used for countdown timer)',
        }),
        defineField({
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url',
            description: 'Link for event registration',
        }),
        defineField({
            name: 'registrationButtonText',
            title: 'Registration Button Text',
            type: 'string',
            description: 'Text for the registration button (e.g., "Register Now")',
            initialValue: 'Register Now',
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
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this event is visible on the website',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'eventName',
            subtitle: 'date',
            media: 'coverImage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title,
                subtitle: subtitle,
                media: media,
            }
        },
    },
})
