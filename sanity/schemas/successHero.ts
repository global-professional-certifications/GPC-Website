import { defineField, defineType, defineArrayMember } from 'sanity'
import { BulkImageUploadInput } from '../components/BulkImageUploadInput'

export default defineType({
  name: 'successHero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Carousel Images',
      type: 'array',
      components: { input: BulkImageUploadInput },
      description:
        'Images shown in the Success Stories hero carousel. Drag multiple files here to bulk upload, drag rows to reorder, and click a row to replace its image. Images are shown in a 4:3 frame — set the hotspot to control the crop focus.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'label',
              title: 'Image Name / Alt Text',
              type: 'string',
              description:
                'Optional name shown in this list (overrides the uploaded filename) and used as the image alt text for accessibility/SEO.',
            }),
          ],
          preview: {
            select: {
              media: 'asset',
              filename: 'asset.originalFilename',
              label: 'label',
            },
            prepare: ({ media, filename, label }) => ({
              title: label || filename || 'Image',
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'heroCaption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      initialValue: 'Empowering industrious alumni who have made us proud.',
      description: 'The single caption shown below the carousel.',
    }),
  ],
  preview: {
    select: { media: 'heroImages.0.asset', caption: 'heroCaption' },
    prepare: ({ media, caption }) => ({
      title: 'Hero Section',
      subtitle: caption,
      media,
    }),
  },
})
