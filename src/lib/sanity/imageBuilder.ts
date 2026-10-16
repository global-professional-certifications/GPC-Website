// Named export, not the default. The default is deprecated in @sanity/image-url
// v2 and logged a warning on every server render during the Next.js build.
import { createImageUrlBuilder } from '@sanity/image-url'
// Both types come from the package root in @sanity/image-url v2. The deep
// '/lib/types/...' paths that older guides reference no longer resolve.
import type { SanityImageSource, ImageUrlBuilder } from '@sanity/image-url'

import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Stand-in returned when there is no image source.
 *
 * `urlFor` has always had to tolerate a missing source -- plenty of call sites
 * do `urlFor(post.mainImage).url()` on a CMS field that is genuinely optional,
 * and throwing there would take out the whole page for a missing thumbnail.
 *
 * The original stub was `{ url: () => '' }`, which only works when `.url()` is
 * called immediately. Several call sites chain first
 * (`urlFor(x).width(800).url()`), so the stub has to be chainable too or it
 * throws exactly where it was meant to be forgiving.
 *
 * Every method returns the stub itself; `url()` returns an empty string. The
 * Proxy means it keeps working if a call site starts using a builder method
 * nobody has used yet, rather than failing on a method this file forgot to
 * list.
 */
const emptyBuilder = new Proxy({} as ImageUrlBuilder, {
  get(_target, prop) {
    if (prop === 'url' || prop === 'toString') return () => ''
    return () => emptyBuilder
  },
})

export function urlFor(source: SanityImageSource | null | undefined): ImageUrlBuilder {
  if (!source) return emptyBuilder
  return builder.image(source).auto('format').format('webp').quality(75)
}
