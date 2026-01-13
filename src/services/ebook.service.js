import { client } from '../lib/sanity/client'

/**
 * Ebook Service - Handles all ebook data fetching
 */

// Get all published ebooks
export const getAllEbooks = async () => {
    const query = `*[_type == "ebook" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage {
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
    fileSize,
    pageCount
  }`

    return await client.fetch(query)
}

// Get single ebook by slug
export const getEbookBySlug = async (slug) => {
    const query = `*[_type == "ebook" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    description,
    coverImage {
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
    downloadUrl,
    fileSize,
    pageCount,
    body,
    meta
  }`

    return await client.fetch(query, { slug })
}

// Get ebooks by category
export const getEbooksByCategory = async (categorySlug) => {
    const query = `*[_type == "ebook" && references(*[_type=="category" && slug.current == $categorySlug]._id) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage {
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
    fileSize,
    pageCount
  }`

    return await client.fetch(query, { categorySlug })
}

// Get featured ebooks
export const getFeaturedEbooks = async (limit = 3) => {
    const query = `*[_type == "ebook" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    description,
    coverImage {
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
    fileSize,
    pageCount
  }`

    return await client.fetch(query)
}
