function getEnv(key: string): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }
  return undefined
}

export const apiVersion =
  getEnv('VITE_SANITY_API_VERSION') || getEnv('SANITY_STUDIO_API_VERSION') || '2024-12-05'

export const dataset = assertValue(
  getEnv('VITE_SANITY_DATASET') || getEnv('SANITY_STUDIO_DATASET'),
  'Missing environment variable: VITE_SANITY_DATASET or SANITY_STUDIO_DATASET'
)

export const projectId = assertValue(
  getEnv('VITE_SANITY_PROJECT_ID') || getEnv('SANITY_STUDIO_PROJECT_ID'),
  'Missing environment variable: VITE_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
