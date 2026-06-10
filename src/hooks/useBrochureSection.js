import { useEffect, useState } from 'react'
import { getBrochureSection } from '../services/brochure.service'

/**
 * Load the editable brochure-section content for a course from Sanity.
 *
 * Returns `null` while loading or when no document exists; consumers fall back
 * to their existing hardcoded content in that case, so the section never goes
 * blank during loading or if Studio data is missing.
 *
 * @param {string} course - Course key, e.g. "cia" or "cisa".
 * @returns {{ section: object|null, loading: boolean }}
 */
export const useBrochureSection = (course) => {
  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)

    getBrochureSection(course)
      .then((data) => {
        if (active) setSection(data)
      })
      .catch((err) => {
        console.error(`Failed to load "${course}" brochure section:`, err)
        if (active) setSection(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [course])

  return { section, loading }
}
