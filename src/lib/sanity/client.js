import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false, // disabled to get fresh data immediately
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-12-05',
})
