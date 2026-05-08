import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    groups: [
        { name: 'content', title: '📝 Content', default: true },
        { name: 'seo', title: '🔍 SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            group: 'content',
            rows: 3,
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            group: 'content',
            description: 'Hex color code for UI theming (e.g., #3B82F6)',
        }),
        defineField({
            name: 'definition',
            title: 'Definition (AEO)',
            type: 'text',
            group: 'content',
            description: 'Paragraph definition for AEO (LLMs quote this)',
            rows: 3,
        }),
        defineField({
            name: 'seoContent',
            title: 'SEO Content',
            type: 'array',
            group: 'content',
            of: [{ type: 'block' }],
            description: 'Long-form pillar content',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Question', type: 'string' },
                        { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
                    ],
                },
            ],
        }),
        defineField({
            name: 'parentCategory',
            title: 'Parent Category',
            type: 'reference',
            group: 'content',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
            description: '50-60 characters',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            description: '150-155 characters',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})
