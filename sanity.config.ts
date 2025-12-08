import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './sanity/schemas'
import {apiVersion, dataset, projectId} from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'GPC Blog',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
})
