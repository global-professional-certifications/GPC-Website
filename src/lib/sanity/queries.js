export const getAllPosts = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "authorImage": author->image,
  categories,
  meta
}`

export const getPostBySlug = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "authorImage": author->image,
  "authorBio": author->bio,
  categories,
  body,
  meta
}`

export const getRecentPosts = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  categories
}`

export const getAllSlugs = `*[_type == "post"] {
  "slug": slug.current
}`
