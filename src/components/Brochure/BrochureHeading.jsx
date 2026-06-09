import { PortableText } from '@portabletext/react'

/**
 * Components for the single-line brochure headline. The only mark is the brand
 * "highlight" decorator (rendered as blue italic), matching the styling that
 * was previously hardcoded into each course page. The `normal` block renders
 * inline so the headline sits inside the page's own <h2> wrapper.
 */
const headingComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    highlight: ({ children }) => (
      <span className="text-brand-blue font-normal italic">{children}</span>
    ),
  },
}

/**
 * Render the editable brochure headline from Sanity Portable Text.
 *
 * When `heading` is empty (no Studio content, or still loading) the `fallback`
 * is rendered instead, so existing hardcoded headlines remain pixel-identical.
 *
 * @param {{ heading?: any[], fallback: React.ReactNode }} props
 */
const BrochureHeading = ({ heading, fallback }) => {
  if (Array.isArray(heading) && heading.length > 0) {
    return <PortableText value={heading} components={headingComponents} />
  }
  return fallback
}

export default BrochureHeading
