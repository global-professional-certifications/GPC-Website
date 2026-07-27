import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'notificationBanner',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'highlightTitle',
      title: 'Highlight Title',
      type: 'string',
      description: 'First highlighted tag/label of the banner (e.g., "Upcoming", "Orientation", "Notice")',
      validation: (Rule) => Rule.required().error('Highlight Title is required'),
    }),
    defineField({
      name: 'notification',
      title: 'Notification Description',
      type: 'text',
      rows: 2,
      description: 'The description or catch line of the notification (e.g., "All new CIA Challenge Batch in collaboration with IIA Bombay.")',
      validation: (Rule) => Rule.required().error('Notification description is required'),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons (Max 2)',
      type: 'array',
      description: 'Navigation action buttons shown in the banner. Up to 2 buttons allowed.',
      validation: (Rule) => Rule.max(2).error('Maximum 2 buttons allowed per notification'),
      of: [
        {
          type: 'object',
          name: 'notificationButton',
          title: 'Button',
          fields: [
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'Text shown on the button (e.g., "Register Now", "Learn More")',
              validation: (Rule) => Rule.required().error('Button text is required'),
            }),
            defineField({
              name: 'pageLink',
              title: 'Page Link',
              type: 'string',
              description: 'URL or internal path (e.g., "https://..." or "/upcoming#batches")',
              validation: (Rule) => Rule.required().error('Page link URL is required'),
            }),
            defineField({
              name: 'isExternal',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              description: 'Toggle to open link in a new browser tab',
            }),
          ],
          preview: {
            select: {
              title: 'buttonText',
              subtitle: 'pageLink',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Button',
                subtitle: subtitle || 'No link set',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this notification is currently visible on the website banner',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used for ordering notifications in the carousel (lower numbers display first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      highlight: 'highlightTitle',
      text: 'notification',
      active: 'isActive',
    },
    prepare({ highlight, text, active }) {
      return {
        title: `${highlight ? `[${highlight}] ` : ''}${text || 'Untitled Notification'}`,
        subtitle: active ? '🟢 Active' : '🔴 Inactive',
      }
    },
  },
})
