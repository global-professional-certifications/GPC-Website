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
    defineField({
      name: 'depth',
      title: 'Heading Depth',
      type: 'string',
      description: 'Which heading levels to include in the TOC',
      options: {
        list: [
          { title: 'H2 only (top-level sections)', value: 'h2' },
          { title: 'H2 + H3 (sections & sub-sections)', value: 'h2h3' },
        ],
        layout: 'radio',
      },
      initialValue: 'h2h3',
    }),
    defineField({
      name: 'numbered',
      title: 'Numbered List',
      type: 'boolean',
      description: 'Display TOC items as a numbered list',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      depth: 'depth',
    },
    prepare(selection) {
      const depthLabel = selection.depth === 'h2' ? 'H2 only' : 'H2 + H3'
      return {
        title: selection.title || 'Table of Contents',
        subtitle: `Auto-generated from headings (${depthLabel})`,
      }
    },
  },
})
