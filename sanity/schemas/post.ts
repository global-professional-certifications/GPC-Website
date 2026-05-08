import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'write', title: '✏️ Write', default: true },
    { name: 'setup', title: '⚙️ Setup' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'aiCitation', title: '🤖 AI Citation' },
    { name: 'media', title: '🖼️ Media' },
  ],
  fields: [
    // WRITE TAB
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'write',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'write',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 4,
      group: 'write',
      description: 'Brief summary for blog cards and social sharing',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'write',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'Align Left', value: 'alignLeft' },
            { title: 'Align Center', value: 'alignCenter' },
            { title: 'Align Right', value: 'alignRight' },
            { title: 'Align Justify', value: 'alignJustify' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike-through', value: 'strike-through' },
              { title: 'Code', value: 'code' },
              { title: 'Highlight', value: 'highlight' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                title: 'Internal Link',
                name: 'internalLink',
                type: 'reference',
                to: [{ type: 'post' }, { type: 'category' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'displayMode',
              type: 'string',
              title: 'Display Mode',
              options: {
                list: [
                  { title: '📐 Fit Width (Responsive)', value: 'fit' },
                  { title: '🖼️ Contained (Show Full Image)', value: 'contain' },
                  { title: '📏 Original Size', value: 'original' },
                  { title: '🌊 Full Bleed (Edge-to-Edge)', value: 'full' },
                ],
                layout: 'radio',
              },
              initialValue: 'fit',
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Alignment',
              options: {
                list: ['Left', 'Center', 'Right'],
                layout: 'radio',
              },
              hidden: ({ parent }) => parent?.displayMode !== 'original',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        { type: 'code' },
        { type: 'youtube' },
        { type: 'table' },
        { type: 'tableOfContents' },
        { type: 'faqSection' },
        { type: 'inlineCTA' },
        { type: 'latex' },
      ],
    }),

    // SETUP TAB
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          { title: 'Pillar Content (Comprehensive Guide)', value: 'pillar' },
          { title: 'Supporting Content (Cluster Article)', value: 'cluster' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentPillar',
      title: 'Parent Pillar',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'setup',
      hidden: ({ document }) => document?.contentType === 'pillar',
      options: {
        filter: 'contentType == "pillar"',
      },
    }),
    defineField({
      name: 'articleType',
      title: 'Article Type',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          { title: 'Concept Explainer (What is X?)', value: 'explainer' },
          { title: 'Comparison (X vs Y)', value: 'comparison' },
          { title: 'Implementation (How to do X)', value: 'implementation' },
          { title: 'Mistakes & Pitfalls (X mistakes to avoid)', value: 'mistakes' },
          { title: 'Tools & Stack (Best tools for X)', value: 'tools' },
          { title: 'Advanced Strategy (Scaling X)', value: 'strategy' },
          { title: 'Case Study (X in action)', value: 'case-study' },
        ],
      },
      hidden: ({ document }) => document?.contentType !== 'cluster',
    }),
    defineField({
      name: 'topicOwnership',
      title: 'Topic Ownership',
      type: 'string',
      group: 'setup',
      hidden: ({ document }) => document?.contentType === 'cluster',
    }),
    defineField({
      name: 'funnelStage',
      title: 'Funnel Stage',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          { title: 'Awareness (Top of Funnel) - TOFU', value: 'TOFU' },
          { title: 'Consideration (Middle) - MOFU', value: 'MOFU' },
          { title: 'Decision (Bottom) - BOFU', value: 'BOFU' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetReader',
      title: 'Target Reader',
      type: 'string',
      group: 'setup',
      options: {
        list: [
          'Developer',
          'Marketer',
          'Founder / CEO',
          'Product Manager',
          'Executive',
          'General',
        ],
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'setup',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'setup',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'setup',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'setup',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      group: 'setup',
    }),

    // SEO TAB
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: '50-60 characters recommended',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description: '150-155 characters recommended',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
    }),

    // AI CITATION TAB
    defineField({
      name: 'tldr',
      title: 'TL;DR Summary',
      type: 'string',
      group: 'aiCitation',
      description: '200-300 characters direct answer for AI to cite',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'aiCitation',
      validation: (Rule) => Rule.required().min(1),
    }),

    // MEDIA TAB
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'media',
      of: [{ type: 'reference', to: { type: 'post' } }],
    }),
    defineField({
      name: 'relatedPostsPosition',
      title: 'Related Posts Position',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'End of Article', value: 'end' },
          { title: 'Middle of Article', value: 'middle' },
          { title: 'Both Positions', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'end',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      articleType: 'articleType',
      funnelStage: 'funnelStage',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, contentType, articleType, funnelStage, author, media } = selection
      
      const typeStr = contentType === 'pillar' ? 'PILLAR' : 'CLUSTER'
      const categoryStr = articleType ? ` [${articleType}]` : ''
      const funnelStr = funnelStage ? ` [${funnelStage}]` : ''
      const authorStr = author ? ` by ${author}` : ''
      
      return {
        title,
        subtitle: `[${typeStr}]${categoryStr}${funnelStr}${authorStr}`,
        media,
      }
    },
  },
})
