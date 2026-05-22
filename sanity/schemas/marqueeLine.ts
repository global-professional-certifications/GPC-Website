import { defineField, defineType } from 'sanity'
import MarqueeArrayInput from '../components/MarqueeArrayInput'

export default defineType({
  name: 'marqueeLine',
  title: 'Company Marquee',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Line Title',
      type: 'string',
      description: 'Name of the line (e.g. Line 1, Line 2)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers display first (e.g., Row 1, Row 2...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companies',
      title: 'Companies & Logos',
      type: 'array',
      components: {
        input: MarqueeArrayInput,
      },
      of: [
        {
          type: 'object',
          name: 'company',
          title: 'Company',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: true, // Enables working crop feature
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
              filename: 'logo.asset.originalFilename',
            },
            prepare({ title, media, filename }) {
              return {
                title: title || 'Unnamed Company',
                subtitle: filename || 'No image uploaded',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one company logo is required in a marquee line.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      companies: 'companies',
    },
    prepare({ title, companies }) {
      const count = companies ? companies.length : 0
      return {
        title: title || 'Unnamed Line',
        subtitle: `${count} compan${count === 1 ? 'y' : 'ies'}`,
      }
    },
  },
})
