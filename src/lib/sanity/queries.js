export const getAllPosts = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "authorImage": author->image,
  "categories": categories[]->{title, slug, color},
  tags,
  keyTakeaways,
  contentFunnelStage,
  meta
}`

export const getPostBySlug = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "authorImage": author->image,
  "authorBio": author->bio,
  "categories": categories[]->{title, slug, color},
  tags,
  keyTakeaways,
  contentFunnelStage,
  body,
  meta
}`

export const getRecentPosts = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  description,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->{title, slug, color},
  tags
}`

export const getAllSlugs = `*[_type == "post"] {
  "slug": slug.current
}`

export const getPostsByCategory = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->{title, slug, color},
  tags
}`

export const getPostsByTag = `*[_type == "post" && $tag in tags] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->{title, slug, color},
  tags
}`

export const getAllCategories = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color,
  "postCount": count(*[_type == "post" && references(^._id)])
}`

export const getAllTags = `array::unique(*[_type == "post"].tags[])`
