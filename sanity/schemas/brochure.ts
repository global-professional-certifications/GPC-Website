import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brochure',
  title: 'Brochure',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'CIA Course Brochure',
      validation: (Rule) => Rule.required(),
      description: 'Title of the brochure (e.g., CIA Course Brochure)',
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
      description: 'Slug to identify the course brochure (e.g., "cia" or "cisa"). It determines the public download URL like "/CIA-Brochure.pdf" or "/CISA-Brochure.pdf".',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
      description: 'Upload or replace the PDF brochure here. This will update the brochure downloaded via Zoho.',
    }),
  ],
})
