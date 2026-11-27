import { defineField, defineType } from 'sanity'

/**
 * "Our Global Candidates" section on /success.
 *
 * Kept deliberately simple: one entry per card. The first 8 by Display Order
 * are shown; the one with the lowest order is the large featured card.
 */
export default defineType({
  name: 'globalCandidate',
  title: 'Global Candidate',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Square photo works best. A placeholder icon is shown if left empty.',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certification',
      title: 'Certification',
      type: 'string',
      description: 'Shown exactly as typed, e.g. "CIA Challenge" or "CIA Part 1".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lowest number shows first (as the large featured card). Only the first 8 are shown.',
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', country: 'country', certification: 'certification', order: 'order', media: 'photo' },
    prepare: ({ title, country, certification, order, media }) => ({
      title: `${order ?? '-'}. ${title}`,
      subtitle: [country, certification].filter(Boolean).join(' · '),
      media,
    }),
  },
})
