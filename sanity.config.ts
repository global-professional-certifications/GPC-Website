import { defineConfig, Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'
import { structure } from './sanity/structure'

// Initial value templates for pre-filling course and category when adding testimonials
const initialValueTemplates: Template[] = [
  {
    id: 'successStory-with-course-and-category',
    title: 'Success Story with Course and Category',
    schemaType: 'successStory',
    parameters: [
      { name: 'courseId', type: 'string' },
      { name: 'category', type: 'string' }
    ],
    value: (params: { courseId: string; category: string }) => ({
      course: { _type: 'reference', _ref: params.courseId },
      category: params.category,
    }),
  },
  {
    id: 'wallOfExcellence-with-course',
    title: 'Wall of Excellence with Course',
    schemaType: 'wallOfExcellence',
    parameters: [
      { name: 'courseId', type: 'string' },
    ],
    value: (params: { courseId: string }) => ({
      course: { _type: 'reference', _ref: params.courseId },
    }),
  },
  {
    id: 'testimonialCourse-video',
    title: 'Video Course',
    schemaType: 'testimonialCourse',
    value: { category: 'video' },
  },
  {
    id: 'testimonialCourse-written',
    title: 'Written Course',
    schemaType: 'testimonialCourse',
    value: { category: 'written' },
  },
  {
    id: 'testimonialCourse-image',
    title: 'Image Course',
    schemaType: 'testimonialCourse',
    value: { category: 'image' },
  },
  {
    id: 'testimonialCourse-wall',
    title: 'Wall Course',
    schemaType: 'testimonialCourse',
    value: { category: 'wallOfExcellence' },
  },
]

export default defineConfig({
  name: 'default',
  title: 'GPC Blog',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },
  document: {
    actions: (prev, context) => {
      // For event types, ensure delete action is available and prominent
      const eventTypes = ['upcomingEvent', 'pastEvent', 'event']
      if (eventTypes.includes(context.schemaType)) {
        // Reorder actions: keep publish first, then delete, then rest
        const publishAction = prev.find((action: any) => action.action === 'publish')
        const deleteAction = prev.find((action: any) => action.action === 'delete')
        const otherActions = prev.filter((action: any) =>
          action.action !== 'publish' && action.action !== 'delete'
        )

        const orderedActions = []
        if (publishAction) orderedActions.push(publishAction)
        if (deleteAction) orderedActions.push(deleteAction)
        orderedActions.push(...otherActions)

        return orderedActions
      }
      return prev
    },
  },
})

