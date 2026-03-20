import { defineField, defineType } from 'sanity'

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
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or Country — e.g. Bengaluru, Dubai',
    }),
    defineField({
      name: 'designation',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Internal Audit Specialist',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      description: 'e.g. BATCH 2023-A',
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'testimonialCourse' }],
      validation: (Rule) => Rule.required(),
      description: 'Select the course this testimonial belongs to',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Testimonial', value: 'video' },
          { title: 'Written Testimonial', value: 'written' },
          { title: 'Image Testimonial', value: 'image' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
