import { client } from '../lib/sanity/client'

/**
 * Marquee Service - Handles fetching company marquee data from Sanity
 */

export const getMarqueeLines = async () => {
  const query = `*[_type == "marqueeLine" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    title,
    order,
    companies[] {
      name,
      logo {
        asset-> {
          _id,
          url,
          originalFilename
        },
        crop,
        hotspot
      }
    }
  }`

  return await client.fetch(query)
}
