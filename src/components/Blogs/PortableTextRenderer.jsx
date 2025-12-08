import { PortableText } from '@portabletext/react'
import { urlFor } from '../../lib/sanity/imageBuilder'

const components = {
  block: {
    h1: ({children}) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-semibold my-5">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-semibold my-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-lg font-semibold my-3">{children}</h4>,
    normal: ({children}) => <p className="text-lg leading-relaxed my-3">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-brand-purple pl-4 italic my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-8 my-4 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-8 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="text-lg">{children}</li>,
    number: ({children}) => <li className="text-lg">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-brand-blue underline">
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Blog Image'}
          className="w-full h-auto my-6 rounded-xl"
        />
      )
    },
    code: ({value}) => {
      return (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-6">
          <code>{value.code}</code>
        </pre>
      )
    }
  },
}

const PortableTextRenderer = ({ value }) => {
  return <PortableText value={value} components={components} />
}

export default PortableTextRenderer
