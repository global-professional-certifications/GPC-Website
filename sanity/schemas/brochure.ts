import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'brochure',
  title: 'Brochure',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'cta', title: 'Call to Action' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    //  Settings (admin only) 
    defineField({
      name: 'title',
      title: 'Internal Title (admin only — not shown on site)',
      type: 'string',
      group: 'settings',
      initialValue: 'CIA Course Brochure',
      validation: (Rule) => Rule.required(),
      description:
        'Used only to identify this brochure inside Sanity Studio and to name the downloaded file (e.g. "CIA-Brochure.pdf"). This text is NOT rendered on the website — edit the "Headline" field below for that.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description:
        'Stable key used by the website to load this brochure (e.g. "cia" or "cisa"). Avoid changing once published — the course pages and download links resolve brochures by this slug.',
    }),

    // ─── Content (shown on the website) ────────────────────────────────────
    defineField({
      name: 'heading',
      title: 'Headline (shown on website)',
      type: 'array',
      group: 'content',
      description:
        'The full headline rendered on the page, e.g. "Download Our Comprehensive CIA Course Brochure". Select any part of the text and click the "Highlight" button in the toolbar to render that part in blue italics.',
      of: [
        defineArrayMember({
          type: 'block',
          // Single-line headline: only a "Normal" style, no headings/quotes.
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            // Only expose the brand highlight — no bold/italic/links.
            decorators: [{ title: 'Highlight (Blue Italic)', value: 'highlight' }],
            annotations: [],
          },
        }),
      ],
      validation: (Rule) =>
        Rule.max(1).warning('Keep the headline to a single line for the best layout.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'The supporting paragraph shown beneath the headline.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'The brochure cover image shown beside the text.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the image for screen readers and SEO.',
          validation: (Rule) => Rule.required().warning('Add alt text for accessibility.'),
        }),
      ],
    }),

    // ─── Call to Action ────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'object',
      group: 'cta',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Download',
          validation: (Rule) => Rule.required(),
          description: 'Text shown on the button (e.g. "Download").',
        }),
        defineField({
          name: 'type',
          title: 'Button Action',
          type: 'string',
          initialValue: 'download',
          options: {
            layout: 'radio',
            list: [
              { title: 'Download the uploaded PDF file', value: 'download' },
              { title: 'Open an external link (e.g. a lead-capture form)', value: 'externalUrl' },
            ],
          },
          validation: (Rule) => Rule.required(),
          description:
            '"Download" serves the PDF uploaded below. "Open an external link" sends visitors to the URL below (opens in a new tab).',
        }),
        defineField({
          name: 'url',
          title: 'External Link URL',
          type: 'url',
          hidden: ({ parent }) => parent?.type !== 'externalUrl',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
              const parent = context.parent as { type?: string } | undefined
              if (parent?.type === 'externalUrl' && !value) {
                return 'A URL is required when the button opens an external link.'
              }
              return true
            }),
          description: 'Destination opened when the button action is set to "Open an external link".',
        }),
      ],
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      group: 'cta',
      options: {
        accept: '.pdf',
      },
      description:
        'Upload or replace the PDF brochure here. Used when the button action is "Download the uploaded PDF file".',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { cta?: { type?: string } } | undefined
          const type = doc?.cta?.type
          if (type === 'download' && !value) {
            return 'Upload a PDF, or change the button action to "Open an external link".'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
  },
})
