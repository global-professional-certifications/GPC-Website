import { client } from '../lib/sanity/client'

/**
 * Blog Service - Handles all blog post data fetching
 * All queries filter out drafts: !(_id in path("drafts.**"))
 */

// Get all published posts
export const getAllPosts = async () => {
    const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug,
      image {
        asset->{
          url
        }
      }
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags,
    contentFunnelStage
  }`

    return await client.fetch(query)
}

// Get single post by slug
export const getPostBySlug = async (slug) => {
    const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    description,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug,
      bio,
      image {
        asset->{
          url
        }
      }
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags,
    keyTakeaways,
    contentFunnelStage,
    body,
    meta
  }`

    return await client.fetch(query, { slug })
}

// Get posts by category
export const getPostsByCategory = async (categorySlug) => {
    const query = `*[_type == "post" && references(*[_type=="category" && slug.current == $categorySlug]._id) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug
    },
    categories[]->{
      title,
      slug
    },
    tags
  }`

    return await client.fetch(query, { categorySlug })
}

// Get posts by tag
export const getPostsByTag = async (tag) => {
    const query = `*[_type == "post" && $tag in tags && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug
    },
    categories[]->{
      title,
      slug
    },
    tags
  }`

    return await client.fetch(query, { tag })
}

// Get featured posts (you can add a featured field to schema if needed)
export const getFeaturedPosts = async (limit = 3) => {
    const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug
    },
    categories[]->{
      title,
      slug
    }
  }`

    return await client.fetch(query)
}

// Get related posts based on categories
export const getRelatedPosts = async (postId, categoryIds, limit = 3) => {
    const query = `*[_type == "post" && _id != $postId && count((categories[]._ref)[@ in $categoryIds]) > 0 && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    author->{
      name,
      slug
    }
  }`

    return await client.fetch(query, { postId, categoryIds })
}

// Get all categories
export const getAllCategories = async () => {
    const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id) && !(_id in path("drafts.**"))])
  }`

    return await client.fetch(query)
}

// Get all unique tags
export const getAllTags = async () => {
    const query = `array::unique(*[_type == "post" && !(_id in path("drafts.**"))].tags[])`

    return await client.fetch(query)
}
