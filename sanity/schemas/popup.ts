import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'popup',
    title: 'Popup',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Internal name for this popup',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Inactive', value: 'inactive' },
                ],
                layout: 'radio',
            },
            initialValue: 'inactive',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Modal', value: 'modal' },
                    { title: 'Slide-In', value: 'slideIn' },
                    { title: 'Sticky Banner', value: 'stickyBanner' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'priority',
            title: 'Priority',
            type: 'number',
            description: 'Display order (higher numbers = higher priority)',
            initialValue: 1,
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            description: 'Call-to-action button text',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'url',
            description: 'Call-to-action button URL',
        }),
        // Styling Group
        defineField({
            name: 'styling',
            title: 'Styling',
            type: 'object',
            fields: [
                {
                    name: 'badgeText',
                    title: 'Badge Text',
                    type: 'string',
                    description: 'Optional badge text (e.g., "NEW", "LIMITED")',
                },
                {
                    name: 'badgeColor',
                    title: 'Badge Color',
                    type: 'string',
                    description: 'Hex color code',
                },
                {
                    name: 'size',
                    title: 'Size',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Small', value: 'small' },
                            { title: 'Medium', value: 'medium' },
                            { title: 'Large', value: 'large' },
                        ],
                    },
                    initialValue: 'medium',
                },
                {
                    name: 'theme',
                    title: 'Theme',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Light', value: 'light' },
                            { title: 'Dark', value: 'dark' },
                        ],
                    },
                    initialValue: 'light',
                },
                {
                    name: 'ctaStyle',
                    title: 'CTA Style',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Primary', value: 'primary' },
                            { title: 'Secondary', value: 'secondary' },
                            { title: 'Outline', value: 'outline' },
                        ],
                    },
                    initialValue: 'primary',
                },
            ],
        }),
        // Display Rules Group
        defineField({
            name: 'displayRules',
            title: 'Display Rules',
            type: 'object',
            fields: [
                {
                    name: 'showOn',
                    title: 'Show On',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'All Pages', value: 'all' },
                            { title: 'Home Only', value: 'home' },
                            { title: 'Blog Only', value: 'blog' },
                            { title: 'Custom URLs', value: 'custom' },
                        ],
                    },
                    initialValue: 'all',
                },
                {
                    name: 'customUrls',
                    title: 'Custom URLs',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'Specific URLs where popup should appear',
                    hidden: ({ parent }) => parent?.showOn !== 'custom',
                },
                {
                    name: 'excludeUrls',
                    title: 'Exclude URLs',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'URLs where popup should NOT appear',
                },
                {
                    name: 'deviceType',
                    title: 'Device Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'All Devices', value: 'all' },
                            { title: 'Desktop Only', value: 'desktop' },
                            { title: 'Mobile Only', value: 'mobile' },
                            { title: 'Tablet Only', value: 'tablet' },
                        ],
                    },
                    initialValue: 'all',
                },
            ],
        }),
        // Trigger Rules Group
        defineField({
            name: 'triggerRules',
            title: 'Trigger Rules',
            type: 'object',
            fields: [
                {
                    name: 'triggerType',
                    title: 'Trigger Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Time Delay', value: 'time' },
                            { title: 'Scroll Percentage', value: 'scroll' },
                            { title: 'Exit Intent', value: 'exit' },
                            { title: 'Idle Time', value: 'idle' },
                        ],
                    },
                    initialValue: 'time',
                },
                {
                    name: 'triggerValue',
                    title: 'Trigger Value',
                    type: 'number',
                    description: 'Seconds for time/idle, percentage for scroll',
                    initialValue: 5,
                },
                {
                    name: 'frequency',
                    title: 'Frequency',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Once per Session', value: 'session' },
                            { title: 'Always', value: 'always' },
                            { title: 'Once per X Days', value: 'days' },
                        ],
                    },
                    initialValue: 'session',
                },
                {
                    name: 'frequencyDays',
                    title: 'Frequency Days',
                    type: 'number',
                    description: 'Number of days before showing again',
                    hidden: ({ parent }) => parent?.frequency !== 'days',
                    initialValue: 7,
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            status: 'status',
            type: 'type',
        },
        prepare({ title, status, type }) {
            return {
                title,
                subtitle: `${status} - ${type}`,
            }
        },
    },
})
