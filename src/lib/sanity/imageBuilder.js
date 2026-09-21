// Named export, not the default. The default is deprecated in @sanity/image-url
// v2 and logged a warning on every server render during the Next.js build.
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return { url: () => '' };
  return builder.image(source).auto('format').format('webp').quality(75)
}
