// Named export, not the default. The default is deprecated in @sanity/image-url
// v2 and logged a warning on every server render during the Next.js build.
import { createImageUrlBuilder } from '@sanity/image-url'
// Both types come from the package root in @sanity/image-url v2. The deep
// '/lib/types/...' paths that older guides reference no longer resolve.
import type { SanityImageSource, ImageUrlBuilder } from '@sanity/image-url'

import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * The subset of the builder that call sites actually use.
 *
 * `urlFor` has always had two different return shapes: a real ImageUrlBuilder,
 * or a `{ url: () => '' }` stub when the source is missing. Roughly 30 call
 * sites do `urlFor(x).url()` directly on the result, several of them on CMS
 * fields that are genuinely optional, so the stub is load-bearing -- without it
 * a missing image would throw instead of rendering nothing.
 *
 * Typing the return as this common shape keeps both branches assignable and
 * keeps `.url()` available to every caller, which is the only method the stub
 * can honour. Callers that need to chain further transforms (`.width()`,
 * `.height()`) should narrow with the guard below rather than widening this.
 */
export type ImageUrlSource = Pick<ImageUrlBuilder, 'url'>

export function urlFor(source: SanityImageSource | null | undefined): ImageUrlSource {
  if (!source) return { url: () => '' }
  return builder.image(source).auto('format').format('webp').quality(75)
}

/**
 * True when `urlFor` returned a real builder rather than the empty stub, so
 * further chaining is safe.
 */
export function isImageBuilder(value: ImageUrlSource): value is ImageUrlBuilder {
  return 'image' in value
}
