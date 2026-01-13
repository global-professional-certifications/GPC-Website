import { defineType } from 'sanity'

export default defineType({
    name: 'inlineCTA',
    title: 'Inline CTA',
    type: 'object',
    fields: [
        {
            name: 'text',
            title: 'Button Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        },
        {
            name: 'style',
            title: 'Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                    { title: 'Outline', value: 'outline' },
                ],
                layout: 'radio',
            },
            initialValue: 'primary',
        },
        {
            name: 'openInNewTab',
            title: 'Open in New Tab',
            type: 'boolean',
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'url',
        },
        prepare({ title, subtitle }) {
            return {
                title: `CTA: ${title}`,
                subtitle: subtitle,
            }
        },
    },
})
