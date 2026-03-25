import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successPageSettings',
  title: 'Success Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'videoVaultTitle',
      title: 'Video Vault Title (Standard)',
      type: 'string',
      initialValue: 'The Video',
      validation: (Rule) => Rule.required(),
      description: 'The standard part of the heading.',
    }),
    defineField({
      name: 'videoVaultHighlight',
      title: 'Video Vault Title (Highlight)',
      type: 'string',
      initialValue: 'Vault',
      description: 'The italicized/highlighted part of the heading.',
    }),
    defineField({
      name: 'videoVaultSubtitle',
      title: 'Video Vault Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Raw, unfiltered experiences from professionals who transformed their careers. See how they mastered their certifications with GPC.',
      description: 'The description text shown below the video vault heading.',
    }),
    defineField({
        name: 'writtenStoriesTitle',
        title: 'Written Stories Title (Standard)',
        type: 'string',
        initialValue: 'Read their',
        validation: (Rule) => Rule.required(),
        description: 'The standard part of the heading.',
    }),
    defineField({
        name: 'writtenStoriesHighlight',
        title: 'Written Stories Title (Highlight)',
        type: 'string',
        initialValue: 'journey',
        description: 'The italicized/highlighted part of the heading.',
    }),
    defineField({
        name: 'writtenStoriesSubtitle',
        title: 'Written Stories Subtitle',
        type: 'text',
        rows: 3,
        initialValue: 'Raw, unfiltered experiences from professionals who transformed their careers. See how they mastered their certifications with GPC.',
        description: 'The description text shown below the written stories heading.',
    }),
  ],
})
