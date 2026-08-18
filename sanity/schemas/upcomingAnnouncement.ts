import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'upcomingAnnouncement',
    title: 'Upcoming Announcement',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title/Identifier',
            type: 'string',
            description: 'Internal title used for identifying this announcement in the CMS (e.g., "May price increase")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Announcement Content',
            type: 'text',
            rows: 3,
            description: 'The actual text shown in the important announcement bar on the website',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this announcement is visible on the website',
            initialValue: true,
        }),
        defineField({
            name: 'enableAutoInactive',
            title: 'Enable Auto Inactive',
            type: 'boolean',
            description: 'Automatically hide/inactivate this announcement once the specified date and time passes',
            initialValue: false,
        }),
        defineField({
            name: 'autoInactiveDateTime',
            title: 'Auto Inactive Date & Time',
            type: 'datetime',
            description: 'Select the exact date and time after which this announcement will automatically become inactive',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
            },
            hidden: ({ parent }) => !parent?.enableAutoInactive,
            validation: (Rule) => Rule.custom((dateTime, context) => {
                const parent = context.parent as any
                if (parent?.enableAutoInactive && !dateTime) {
                    return 'Auto Inactive Date & Time is required when Auto Inactive is enabled'
                }
                return true
            }),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Used for sorting announcements if multiple are active (lower numbers show first)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'content',
            active: 'isActive',
            enableAutoInactive: 'enableAutoInactive',
            autoInactiveDateTime: 'autoInactiveDateTime',
        },
        prepare({ title, subtitle, active, enableAutoInactive, autoInactiveDateTime }) {
            let status = active ? '🟢 Active' : '🔴 Inactive'
            if (active && enableAutoInactive && autoInactiveDateTime) {
                const now = new Date()
                const expireDate = new Date(autoInactiveDateTime)
                if (now > expireDate) {
                    status = '⏰ Auto-Expired'
                } else {
                    const formattedExpire = expireDate.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    status = `🟢 Active (Expires ${formattedExpire})`
                }
            }
            return {
                title: title,
                subtitle: `${status} - ${subtitle}`,
            }
        },
    },
})
