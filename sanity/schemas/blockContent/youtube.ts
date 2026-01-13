import { defineType } from 'sanity'

export default defineType({
    name: 'youtube',
    title: 'YouTube Video',
    type: 'object',
    fields: [
        {
            name: 'url',
            title: 'YouTube URL',
            type: 'url',
            validation: (Rule) =>
                Rule.required().custom((url) => {
                    if (!url) return true
                    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
                    return pattern.test(url) || 'Please enter a valid YouTube URL'
                }),
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
    ],
    preview: {
        select: {
            url: 'url',
            caption: 'caption',
        },
        prepare({ url, caption }) {
            return {
                title: caption || 'YouTube Video',
                subtitle: url,
            }
        },
    },
})
