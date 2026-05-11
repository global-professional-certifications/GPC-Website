import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return { url: () => '' };
  return builder.image(source).auto('format').format('webp').quality(75)
}
