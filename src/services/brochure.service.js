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

  const query = `*[_type == "brochure" && (
    slug.current == $slug1 ||
    slug.current == $slug2 ||
    _id == $slug1 ||
    _id == $slug2
  )][0]{ "url": pdfFile.asset->url }`

  const result = await client.fetch(query, { slug1, slug2 })
  return result?.url || null
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
