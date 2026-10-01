import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, useCdn } from './env'

export const client = createClient({
  projectId,
  dataset,
  useCdn, // disabled to get fresh data immediately
  apiVersion,
})
