import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  groups: [
    { name: 'profile', title: '👤 Profile', default: true },
    { name: 'credentials', title: '🎓 Credentials' },
    { name: 'social', title: '🔗 Social' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'profile',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'profile',
      rows: 4,
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials & Expertise',
      type: 'array',
      group: 'credentials',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})
