import { defineType } from 'sanity'

export default defineType({
    name: 'inlineCTA',
    title: 'Inline CTA',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'CTA headline, e.g., "Ready to scale your SaaS?"'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
            description: 'Short value proposition',
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Work with me',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Internal path, e.g., "/work-with-me"',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Gradient (Primary)', value: 'gradient' },
                    { title: 'Subtle (Outline)', value: 'outline' },
                    { title: 'Dark', value: 'dark' },
                ],
                layout: 'radio',
            },
            initialValue: 'gradient',
        },
    ],
    preview: {
        select: {
            title: 'title',
            buttonText: 'buttonText',
        },
        prepare({ title, buttonText }) {
            return {
                title: `CTA: ${title || 'No title'}`,
                subtitle: `Button: ${buttonText}`,
            }
        },
    },
})

