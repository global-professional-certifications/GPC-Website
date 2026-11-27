import { defineField, defineType } from 'sanity'

/**
 * "Some exceptional performances by our candidates".
 *
 * Candidates who cleared every part of a certification unusually fast
 * (e.g. all three CIA parts in 3-8 months). Shown on /success.
 */
export default defineType({
  name: 'exceptionalPerformer',
  title: 'Exceptional Performance',
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
      description: 'Shown as a circular avatar. Initials are used if left empty.',
    }),
    defineField({
      name: 'certification',
      title: 'Certification',
      type: 'string',
      initialValue: 'CIA',
      validation: (Rule) => Rule.required(),
      description: 'e.g. CIA, CISA',
    }),
    defineField({
      name: 'partsCleared',
      title: 'Parts Cleared',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.required().integer().min(1).max(10),
      description: 'Number of exam parts cleared (CIA has 3).',
    }),
    defineField({
      name: 'monthsToClear',
      title: 'Months Taken to Clear All Parts',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(36),
      description: 'Shown as the headline, e.g. "All 3 parts in 4 months". Decimals like 3.5 are allowed.',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'e.g. India, UAE, Saudi Arabia, Nigeria',
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
      name: 'quote',
      title: 'Short Quote',
      type: 'text',
      rows: 3,
      description: 'Optional. One or two sentences from the candidate.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower number appears first',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Fastest First', name: 'fastest', by: [{ field: 'monthsToClear', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'name',
      certification: 'certification',
      parts: 'partsCleared',
      months: 'monthsToClear',
      country: 'country',
      media: 'photo',
    },
    prepare({ title, certification, parts, months, country, media }) {
      return {
        title: title || 'Unnamed',
        subtitle: `${certification || ''} · ${parts ?? '?'} parts in ${months ?? '?'} months${country ? ` · ${country}` : ''}`,
        media,
      }
    },
  },
})
