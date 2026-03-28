import { defineField, defineType } from 'sanity'
import { CourseSelect } from '../components/CourseSelect'

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
      title: 'Courses / Certifications Cleared',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonialCourse' }],
          options: {
            filter: 'category == "wallOfExcellence"'
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Select one or more certifications cleared (CIA, CISA, CMA, etc.)',
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
      courseName0: 'course.0.name',
      legacyCourseName: 'course.name',
      designation: 'designation',
      media: 'photo',
    },
    prepare({ title, courseName0, legacyCourseName, designation, media }) {
      const displayCourse = courseName0 || legacyCourseName || 'No Course'
      return {
        title: title || 'Unnamed',
        subtitle: `${displayCourse} — ${designation || 'No Designation'}`,
        media,
      }
    },
  },
})
