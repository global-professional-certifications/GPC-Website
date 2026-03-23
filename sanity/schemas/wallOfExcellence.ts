import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wallOfExcellence',
  title: 'Wall of Excellence',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the professional',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Professional photo (displayed as circular avatar)',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name — e.g. Grant Thornton, Deloitte, EY',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Company logo image (shown on the card)',
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'Role or designation — e.g. Internal Audit Specialist',
    }),
    defineField({
      name: 'course',
      title: 'Course / Certification Cleared',
      type: 'reference',
      to: [{ type: 'testimonialCourse' }],
      validation: (Rule) => Rule.required(),
      description: 'Select the certification cleared (CIA, CISA, CMA, etc.)',
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
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      courseName: 'course.name',
      designation: 'designation',
      media: 'photo',
    },
    prepare({ title, courseName, designation, media }) {
      return {
        title: title || 'Unnamed',
        subtitle: `${courseName || 'No Course'} — ${designation || 'No Designation'}`,
        media,
      }
    },
  },
})
