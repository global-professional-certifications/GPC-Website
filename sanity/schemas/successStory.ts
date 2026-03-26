import { defineField, defineType } from 'sanity'
import { CourseSelect } from '../components/CourseSelect'

export default defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'E.g. Grant Thornton, Deloitte, EY',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or Country — e.g. Bengaluru, Dubai',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'designation',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Internal Audit Specialist',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      description: 'e.g. BATCH 2023-A',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'testimonialCourse' }],
      validation: (Rule) => Rule.custom((value, context) => {
        if (['video', 'written'].includes(context.document?.category as string) && !value) {
          return 'Course is required for Video and Written testimonials'
        }
        return true
      }),
      description: 'Select the course this testimonial belongs to (Automatically filtered by category).',
      components: {
        input: CourseSelect
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Testimonial (Video Vault)', value: 'video' },
          { title: 'Written Testimonial (Read Their Journey)', value: 'written' },
          { title: 'Image Testimonial (Mobile Screenshots)', value: 'image' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Select where this testimonial will appear on the Success Stories page.',
    }),
    defineField({
      name: 'image',
      title: 'Student Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Used for the Wall of Excellence (Circular Photo).',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Used for the Wall of Excellence cards.',
      hidden: ({ document }) => ['video', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail / Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'For video/written testimonials this is the preview thumbnail. For image testimonials this is the main image.',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'The main testimonial quote — displayed on written testimonial cards.',
      hidden: ({ document }) => ['image', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'A short excerpt for the grid card preview (1-2 sentences).',
      hidden: ({ document }) => ['image', 'written'].includes(document?.category as string),
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload video for video/written testimonials',
      hidden: ({ document }) => document?.category === 'image',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Course, then Order',
      name: 'courseOrder',
      by: [
        { field: 'course.name', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      courseName: 'course.name',
      category: 'category',
      media: 'thumbnail',
    },
    prepare({ title, courseName, category, media }) {
      const courseLabel = courseName || 'No Course';
      const categoryLabel = category === 'video' ? 'Video' : category === 'written' ? 'Written' : 'Image';
      return {
        title,
        subtitle: `${courseLabel} - ${categoryLabel}`,
        media,
      };
    },
  },
})
