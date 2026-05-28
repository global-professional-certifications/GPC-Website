import { PortableText } from '@portabletext/react'
import { urlFor } from '../../lib/sanity/imageBuilder'
import { Link } from 'react-router-dom'
import { ChevronDown, List } from 'lucide-react'
import { useState } from 'react'
import LatexRenderer from './LatexRenderer'

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Convert a heading text into a URL-safe anchor id.
 * e.g. "What is CIA Certification?" → "what-is-cia-certification"
 */
export const slugifyHeading = (text) => {
  if (!text) return ''
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Recursively extract plain text from a portable text child node array.
 */
const extractText = (children) => {
  if (!children) return ''
  return children
    .map((child) => {
      if (typeof child === 'string') return child
      if (child.text) return child.text
      if (child.children) return extractText(child.children)
      return ''
    })
    .join('')
}

/**
 * Extract TOC-eligible headings from a portable text body array.
 * @param {Array}  body  - The portable text array (post.body / post.content)
 * @param {string} depth - 'h2' | 'h2h3'  (default 'h2h3')
 */
export const extractHeadings = (body = [], depth = 'h2h3') => {
  const allowed = depth === 'h2' ? ['h2'] : ['h2', 'h3']
  return body
    .filter((block) => block._type === 'block' && allowed.includes(block.style))
    .map((block) => {
      const text = extractText(block.children)
      return {
        id: slugifyHeading(text),
        text,
        level: block.style, // 'h2' or 'h3'
      }
    })
    .filter((h) => h.text) // drop empty headings
}

// ─── YouTube helper ───────────────────────────────────────────────────────────

const getYouTubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-900 hover:text-brand-blue transition-colors text-sm"
      >
        <span>{question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-3' : 'max-h-0'}`}>
        <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

// ─── Table of Contents Component ─────────────────────────────────────────────

const TableOfContentsBlock = ({ value, body }) => {
  const depth = value?.depth || 'h2h3'
  const numbered = value?.numbered || false
  const headings = extractHeadings(body, depth)

  if (!headings.length) return null

  const ListTag = numbered ? 'ol' : 'ul'

  return (
    <div className="my-8 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100 bg-white/60">
        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
          <List className="w-4 h-4 text-brand-blue" />
        </div>
        <h2 className="text-base font-bold text-gray-900 m-0">
          {value?.title || 'Table of Contents'}
        </h2>
      </div>

      {/* TOC Links */}
      <div className="px-5 py-4">
        <ListTag className={`space-y-1 ${numbered ? 'list-decimal pl-4' : 'list-none pl-0'}`}>
          {headings.map((heading, idx) => (
            <li
              key={idx}
              className={heading.level === 'h3' ? 'pl-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(heading.id)
                  if (el) {
                    const offset = 80 // account for fixed navbar
                    const top = el.getBoundingClientRect().top + window.scrollY - offset
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className={`
                  inline-flex items-center gap-2 text-sm leading-snug py-0.5 transition-colors
                  ${heading.level === 'h2'
                    ? 'font-semibold text-brand-blue hover:text-brand-purple'
                    : 'font-normal text-gray-600 hover:text-brand-blue'}
                `}
              >
                {heading.level === 'h3' && (
                  <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0 inline-block mt-px" />
                )}
                {heading.text}
              </a>
            </li>
          ))}
        </ListTag>
      </div>
    </div>
  )
}

// ─── Portable Text components factory ────────────────────────────────────────

/**
 * Build the PortableText components object.
 * @param {Array} body - The full body array, passed through so tableOfContents
 *                       can scan all blocks for headings.
 */
const buildComponents = (body) => ({
  block: {
    // Headings get anchor IDs so the TOC links work
    h1: ({ children, value }) => {
      const id = slugifyHeading(extractText(value?.children))
      return <h1 id={id} className="text-2xl font-bold mt-6 mb-3 text-gray-900 scroll-mt-24">{children}</h1>
    },
    h2: ({ children, value }) => {
      const id = slugifyHeading(extractText(value?.children))
      return <h2 id={id} className="text-xl font-bold mt-5 mb-2 text-gray-900 scroll-mt-24">{children}</h2>
    },
    h3: ({ children, value }) => {
      const id = slugifyHeading(extractText(value?.children))
      return <h3 id={id} className="text-lg font-semibold mt-4 mb-2 text-gray-800 scroll-mt-24">{children}</h3>
    },
    h4: ({ children, value }) => {
      const id = slugifyHeading(extractText(value?.children))
      return <h4 id={id} className="text-base font-semibold mt-3 mb-1.5 text-gray-800 scroll-mt-24">{children}</h4>
    },
    h5: ({ children }) => <h5 className="text-sm font-semibold mt-2 mb-1 text-gray-800">{children}</h5>,
    h6: ({ children }) => <h6 className="text-xs font-semibold mt-2 mb-1 text-gray-800">{children}</h6>,
    normal: ({ children }) => <p className="text-sm md:text-base leading-relaxed my-3 text-gray-700">{children}</p>,
    alignLeft: ({ children }) => <div className="text-left text-sm md:text-base leading-relaxed my-3 text-gray-700">{children}</div>,
    alignCenter: ({ children }) => <div className="text-center text-sm md:text-base leading-relaxed my-3 text-gray-700">{children}</div>,
    alignRight: ({ children }) => <div className="text-right text-sm md:text-base leading-relaxed my-3 text-gray-700">{children}</div>,
    alignJustify: ({ children }) => <div className="text-justify text-sm md:text-base leading-relaxed my-3 text-gray-700">{children}</div>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-brand-purple bg-purple-50 pl-4 pr-3 py-3 my-4 rounded-r-lg italic text-gray-700 text-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-3 space-y-1.5 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-3 space-y-1.5 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-sm md:text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-sm md:text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline underline-offset-2">{children}</u>,
    'strike-through': ({ children }) => <s className="line-through">{children}</s>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-pink-600 rounded px-1 py-0.5 font-mono text-xs">
        {children}
      </code>
    ),
    highlight: ({ children }) => <mark className="bg-yellow-200 text-gray-900 px-1 rounded">{children}</mark>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-brand-blue hover:text-brand-purple underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      )
    },
    internalLink: ({ value, children }) => (
      <Link
        to={value?.reference?._ref ? `/blogs/${value.reference._ref}` : '#'}
        className="text-brand-blue hover:text-brand-purple underline underline-offset-2 transition-colors"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      const displayClasses = {
        fit: 'w-full h-auto',
        contain: 'w-full h-96 object-contain',
        original: 'max-w-none',
        full: 'w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] max-w-none',
      }
      const alignmentClasses = {
        Left: 'mr-auto',
        Center: 'mx-auto',
        Right: 'ml-auto',
      }
      const imgClass = `${displayClasses[value.displayMode] || displayClasses.fit} ${
        value.displayMode === 'original' ? (alignmentClasses[value.alignment] || 'mx-auto') : ''
      } rounded-lg shadow-md`
      return (
        <figure className="my-5 overflow-x-hidden">
          <img
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Image'}
            className={imgClass}
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-gray-500 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    code: ({ value }) => (
      <div className="my-4 rounded-lg overflow-hidden shadow-md">
        {value.filename && (
          <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1.5 border-b border-gray-700">
            {value.filename}
          </div>
        )}
        <pre className="bg-gray-900 text-gray-100 p-3 overflow-x-auto text-xs">
          <code className="font-mono">{value.code}</code>
        </pre>
      </div>
    ),

    inlineCTA: ({ value }) => {
      const styles = {
        gradient: 'bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90',
        outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
        dark: 'bg-gray-900 text-white hover:bg-gray-800',
      }
      return (
        <div className="my-8 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm text-center">
          {value.title && <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>}
          {value.description && <p className="text-gray-600 text-sm mb-4">{value.description}</p>}
          <Link
            to={value.link || '#'}
            className={`inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${styles[value.variant] || styles.gradient}`}
          >
            {value.buttonText || 'Work with me'}
          </Link>
        </div>
      )
    },

    youtube: ({ value }) => {
      const videoId = getYouTubeId(value.url)
      if (!videoId) return null
      return (
        <div className="my-5">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={value.caption || 'YouTube Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {value.caption && (
            <p className="text-center text-xs text-gray-500 mt-2 italic">{value.caption}</p>
          )}
        </div>
      )
    },

    table: ({ value }) => (
      <div className="my-5 overflow-x-auto rounded-lg shadow-md border border-gray-200">
        {value.caption && (
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
            <p className="font-medium text-gray-700 text-sm">{value.caption}</p>
          </div>
        )}
        <table className="w-full text-sm">
          <tbody>
            {value.rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className={row.isHeader ? 'bg-gray-100' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.cells?.map((cell, cellIndex) =>
                  row.isHeader ? (
                    <th key={cellIndex} className="px-3 py-2 text-left font-semibold text-gray-800 border-b border-gray-200">
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-3 py-2 text-gray-700 border-b border-gray-100">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),

    // FAQ Section — renders accordion UI (JSON-LD is injected separately in BlogPage)
    faqSection: ({ value }) => (
      <div className="my-8 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-white/70">
          <h2 className="text-lg font-bold text-gray-900 m-0">
            {value.title || 'Frequently Asked Questions'}
          </h2>
        </div>
        {/* Accordion items */}
        <div className="px-5 py-2 divide-y divide-gray-200">
          {value.faqs?.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    ),

    // Table of Contents — uses the full body for heading extraction
    tableOfContents: ({ value }) => (
      <TableOfContentsBlock value={value} body={body} />
    ),

    latex: LatexRenderer,
  },
})

// ─── Main exported component ──────────────────────────────────────────────────

const PortableTextRenderer = ({ value }) => {
  // `value` is the body array. We pass it into the components factory so that
  // the tableOfContents block can scan all headings in the same body.
  const components = buildComponents(value)
  return <PortableText value={value} components={components} />
}

export default PortableTextRenderer
