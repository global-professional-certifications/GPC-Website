import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'upcomingBatch',
    title: 'Upcoming Batch',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Title of the batch (e.g., "CIA Challenge Batch In Collaboration With IIA Bombay")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Detailed description of what the batch covers',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'datePrefixes',
            title: 'Date Prefix Options',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Premiers On', value: 'Premiers On' },
                    { title: 'Starting From', value: 'Starting From' },
                    { title: 'Live Session On', value: 'Live Session On' }
                ]
            },
            description: 'Text prefixes to display before the date',
        }),
        defineField({
            name: 'date',
            title: 'Date Display',
            type: 'date',
            description: 'Select the batch start date (will be formatted as "25 Jun, 2026")',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
            description: 'Label for the enrollment button (e.g., "Enroll Now")',
            initialValue: 'Enroll Now',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ctaButtonLink',
            title: 'CTA Button Link',
            type: 'url',
            description: 'Link for the CTA button (e.g., Razorpay checkout link)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'detailsType',
            title: 'Details Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Rich Text Editor', value: 'richText' },
                    { title: 'Document Upload', value: 'document' },
                ],
                layout: 'radio',
            },
            initialValue: 'richText',
            description: 'Choose whether to display rich text inside a modal or open an uploaded document (e.g., brochure PDF) in a new tab.',
        }),
        defineField({
            name: 'details',
            title: 'Details Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' }
                        ]
                    }
                },
                { type: 'table' }
            ],
            hidden: ({ parent }) => parent?.detailsType !== 'richText',
            description: 'Rich text space for batch details. Shown inside the Details modal.',
        }),
        defineField({
            name: 'detailsFile',
            title: 'Details Document (PDF)',
            type: 'file',
            options: {
                accept: '.pdf,.doc,.docx',
            },
            hidden: ({ parent }) => parent?.detailsType !== 'document',
            description: 'Upload a document (e.g. PDF) that will open in a new tab when clicked.',
        }),
        defineField({
            name: 'badges',
            title: 'Badges',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Filling Fast', value: 'Filling Fast' },
                    { title: 'Limited Seats', value: 'Limited Seats' }
                ]
            },
            description: 'Status badges displayed on the batch card',
        }),
        defineField({
            name: 'contactUrl',
            title: 'Contact URL',
            type: 'url',
            description: 'Custom URL for the "Contact Us" link at the bottom of the description.',
            initialValue: 'https://globalprofessionalcertifications.com/contact',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this batch is visible on the website',
            initialValue: true,
        }),
        defineField({
            name: 'enableAutoInactive',
            title: 'Enable Auto Inactive',
            type: 'boolean',
            description: 'Automatically hide/inactivate this card once the specified date and time passes',
            initialValue: false,
        }),
        defineField({
            name: 'autoInactiveDateTime',
            title: 'Auto Inactive Date & Time',
            type: 'datetime',
            description: 'Select the exact date and time after which this card will automatically become inactive',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
            },
            hidden: ({ parent }) => !parent?.enableAutoInactive,
            validation: (Rule) => Rule.custom((dateTime, context) => {
                const parent = context.parent as any
                if (parent?.enableAutoInactive && !dateTime) {
                    return 'Auto Inactive Date & Time is required when Auto Inactive is enabled'
                }
                return true
            }),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Used for sorting batch cards (lower numbers show first)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
            active: 'isActive',
            badges: 'badges',
            enableAutoInactive: 'enableAutoInactive',
            autoInactiveDateTime: 'autoInactiveDateTime',
        },
        prepare({ title, subtitle, active, badges, enableAutoInactive, autoInactiveDateTime }) {
            let status = active ? '🟢 Active' : '🔴 Inactive'
            if (active && enableAutoInactive && autoInactiveDateTime) {
                const now = new Date()
                const expireDate = new Date(autoInactiveDateTime)
                if (now > expireDate) {
                    status = '⏰ Auto-Expired'
                } else {
                    const formattedExpire = expireDate.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    status = `🟢 Active (Expires ${formattedExpire})`
                }
            }
            const badgesStr = badges && badges.length > 0 ? `[${badges.join(', ')}] ` : ''
            return {
                title: title,
                subtitle: `${status} ${badgesStr}- Starts: ${subtitle || 'TBD'}`,
            }
        },
    },
})
