import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tableOfContents',
  title: 'Table of Contents',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Table of Contents',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Auto-generated from headings',
      }
    },
  },
})
