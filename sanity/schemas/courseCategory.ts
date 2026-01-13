import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'courseCategory',
    title: 'Course Category',
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
            rows: 3,
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Icon name or emoji',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order (lower numbers appear first)',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            icon: 'icon',
        },
        prepare({ title, subtitle, icon }) {
            return {
                title: icon ? `${icon} ${title}` : title,
                subtitle,
            }
        },
    },
})
