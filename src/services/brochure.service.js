import { client } from '../lib/sanity/client'

/**
 * Brochure Service - Fetches course brochure PDFs stored in Sanity.
 *
 * Brochures are `brochure` documents whose `pdfFile` references a Sanity file
 * asset. We resolve them by either the slug or the document `_id`, mirroring the
 * matching logic used by the serverless endpoint in `api/brochure.js` so both
 * paths stay consistent.
 */

/**
 * Resolve the public PDF asset URL for a course brochure.
 *
 * @param {string} course - Course key, e.g. "cisa". Matched against the
 *   brochure slug/_id directly and with a "-brochure" suffix.
 * @returns {Promise<string|null>} The Sanity asset URL, or null if not found.
 */
export const getBrochureUrl = async (course) => {
  const key = String(course || '').toLowerCase().trim()
  if (!key) return null

  const slug1 = key
  const slug2 = `${key}-brochure`
  const slug3 = `${key}-course-brochure`

  const query = `*[_type == "brochure" && (
    slug.current == $slug1 ||
    slug.current == $slug2 ||
    slug.current == $slug3 ||
    _id == $slug1 ||
    _id == $slug2
  )][0]{ "url": pdfFile.asset->url }`

  const result = await client.fetch(query, { slug1, slug2, slug3 })
  return result?.url || null
}

/**
 * Fetch the editable content for a course's brochure CTA section.
 *
 * Resolves the same brochure document as {@link getBrochureUrl} (by slug or
 * `_id`, with and without a "-brochure" suffix) and returns the presentation
 * fields managed from Sanity Studio. Any field may be null/empty — callers are
 * expected to fall back to their existing hardcoded defaults so the section
 * never renders blank.
 *
 * @param {string} course - Course key, e.g. "cia" or "cisa".
 * @returns {Promise<{
 *   heading: any[]|null,
 *   description: string|null,
 *   coverImage: object|null,
 *   cta: { label?: string, type?: 'download'|'externalUrl', url?: string }|null,
 *   pdfUrl: string|null,
 * }|null>} The section content, or null if no brochure document exists.
 */
export const getBrochureSection = async (course) => {
  const key = String(course || '').toLowerCase().trim()
  if (!key) return null

  const slug1 = key
  const slug2 = `${key}-brochure`
  const slug3 = `${key}-course-brochure`

  const query = `*[_type == "brochure" && (
    slug.current == $slug1 ||
    slug.current == $slug2 ||
    slug.current == $slug3 ||
    _id == $slug1 ||
    _id == $slug2
  )][0]{
    heading,
    description,
    coverImage,
    cta,
    "pdfUrl": pdfFile.asset->url
  }`

  const result = await client.fetch(query, { slug1, slug2, slug3 })
  return result || null
}

/**
 * Fetch a course brochure from Sanity and trigger a real file download.
 *
 * Sanity asset URLs are cross-origin (cdn.sanity.io), so the HTML `download`
 * attribute is ignored by browsers. We use Sanity's `?dl=<filename>` query
 * param, which sets `Content-Disposition: attachment`, forcing a download with
 * a clean filename.
 *
 * @param {string} course - Course key, e.g. "cisa".
 * @param {string} [filename] - Desired download filename.
 * @returns {Promise<void>}
 * @throws {Error} If the brochure cannot be found.
 */
export const downloadBrochure = async (course, filename) => {
  const url = await getBrochureUrl(course)
  if (!url) {
    throw new Error(`Brochure for "${course}" not found.`)
  }

  const downloadName = filename || `${String(course).toUpperCase()}-Brochure.pdf`
  const separator = url.includes('?') ? '&' : '?'
  const downloadUrl = `${url}${separator}dl=${encodeURIComponent(downloadName)}`

  const link = document.createElement('a')
  link.href = downloadUrl
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
