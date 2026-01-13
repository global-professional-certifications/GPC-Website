import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
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
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'courseCategory' },
        }),
        defineField({
            name: 'instructor',
            title: 'Instructor',
            type: 'reference',
            to: { type: 'author' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Course price in INR',
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "8 weeks", "40 hours"',
        }),
        defineField({
            name: 'level',
            title: 'Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'beginner' },
                    { title: 'Intermediate', value: 'intermediate' },
                    { title: 'Advanced', value: 'advanced' },
                ],
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'syllabus',
            title: 'Syllabus',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'moduleTitle',
                            title: 'Module Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'moduleDescription',
                            title: 'Module Description',
                            type: 'text',
                            rows: 3,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'moduleTitle',
                            subtitle: 'moduleDescription',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: "What's included in the course",
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'meta',
            title: 'SEO Metadata',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            instructor: 'instructor.name',
            media: 'thumbnail',
        },
        prepare(selection) {
            const { instructor } = selection
            return { ...selection, subtitle: instructor && `by ${instructor}` }
        },
    },
})
