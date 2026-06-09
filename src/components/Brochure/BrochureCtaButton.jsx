import { useState } from 'react'
import { downloadBrochure } from '../../services/brochure.service'

/**
 * Renders the brochure call-to-action button driven by Sanity, falling back to
 * each page's existing hardcoded behaviour when Studio content is absent.
 *
 * Two actions are supported (matching the schema):
 *  - "download"    → fetches the brochure PDF from Sanity and triggers a real
 *                    file download (with loading + error states).
 *  - "externalUrl" → renders an anchor to an external link (opens a new tab),
 *                    e.g. a Zoho lead-capture form.
 *
 * @param {object} props
 * @param {string} props.course - Course key used to resolve the PDF, e.g. "cia".
 * @param {{ label?: string, type?: string, url?: string }} [props.cta] - Sanity CTA.
 * @param {string} props.className - Button/anchor classes (page-specific styling).
 * @param {'download'|'externalUrl'} props.fallbackType - Action when Sanity has none.
 * @param {string} [props.fallbackUrl] - URL used for the externalUrl fallback.
 * @param {string} [props.fallbackLabel='Download'] - Label when Sanity has none.
 * @param {string} [props.downloadFilename] - Filename for the downloaded PDF.
 */
const BrochureCtaButton = ({
  course,
  cta,
  className,
  fallbackType,
  fallbackUrl,
  fallbackLabel = 'Download',
  downloadFilename,
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const type = cta?.type || fallbackType
  const label = cta?.label || fallbackLabel
  const url = cta?.url || fallbackUrl

  // External link (e.g. lead-capture form) — opens in a new tab.
  if (type === 'externalUrl' && url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    )
  }

  // Default: download the PDF stored in Sanity for this course.
  const handleDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)
    setDownloadError('')
    try {
      await downloadBrochure(course, downloadFilename)
    } catch (err) {
      console.error(`${course} brochure download failed:`, err)
      setDownloadError('Download failed. Please try again later.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className={className}
      >
        {isDownloading ? 'Downloading...' : label}
      </button>
      {downloadError && (
        <p className="text-red-600 text-xs md:text-sm mt-1" role="alert">
          {downloadError}
        </p>
      )}
    </>
  )
}

export default BrochureCtaButton
