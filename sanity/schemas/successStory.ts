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
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or Country — e.g. Bengaluru, Dubai',
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
    }),
    defineField({
      name: 'designation',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Internal Audit Specialist',
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      description: 'e.g. BATCH 2023-A',
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
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
          { title: 'Video Testimonial (Video Vault)', value: 'video' },
          { title: 'Written Testimonial (Read Their Journey)', value: 'written' },
          { title: 'Image Testimonial (Mobile Screenshots)', value: 'image' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Select where this testimonial will appear.',
    }),
    defineField({
      name: 'image',
      title: 'Student Photo (Circular)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Used for the Wall of Excellence.',
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Used for the Wall of Excellence cards.',
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Testimonial Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Upload the 1:1 image testimonial or the video thumbnail.',
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload video ONLY for Video Vault testimonials.',
      hidden: ({ document }) => document?.category !== 'video',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.document?.category === 'video' && !value) {
          return 'Video is required for video testimonials';
        }
        return true;
      }),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      hidden: true,
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      hidden: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      hidden: ({ document }) => document?.category === 'video' || document?.category === 'written',
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
