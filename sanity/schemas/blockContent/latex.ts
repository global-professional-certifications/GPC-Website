import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'latex',
  title: '📐 Math Equation (LaTeX)',
  type: 'object',
  fields: [
    defineField({
      name: 'formula',
      title: 'Formula',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'LaTeX formula without $$ delimiters (e.g., V_a = \\frac{I \\cdot C}{L})',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Block (Centered on its own line)', value: 'block' },
          { title: 'Inline (Within text flow)', value: 'inline' },
        ],
        layout: 'radio',
      },
      initialValue: 'block',
    }),
  ],
  preview: {
    select: {
      formula: 'formula',
      displayMode: 'displayMode',
    },
    prepare(selection) {
      const isInline = selection.displayMode === 'inline'
      return {
        title: isInline ? '📐 Inline Math' : '📐 Equation',
        subtitle: selection.formula,
      }
    },
  },
})
