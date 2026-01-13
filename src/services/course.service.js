import { client } from '../lib/sanity/client'

/**
 * Course Service - Handles all course data fetching
 */

// Get all published courses
export const getAllCourses = async () => {
    const query = `*[_type == "course" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      slug,
      icon
    },
    instructor->{
      name,
      slug,
      image {
        asset->{
          url
        }
      }
    },
    price,
    duration,
    level,
    publishedAt
  }`

    return await client.fetch(query)
}

// Get single course by slug
export const getCourseBySlug = async (slug) => {
    const query = `*[_type == "course" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      slug,
      icon,
      description
    },
    instructor->{
      name,
      slug,
      bio,
      image {
        asset->{
          url
        }
      }
    },
    price,
    duration,
    level,
    syllabus,
    features,
    publishedAt,
    meta
  }`

    return await client.fetch(query, { slug })
}

// Get courses by category
export const getCoursesByCategory = async (categorySlug) => {
    const query = `*[_type == "course" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      },
      alt
    },
    instructor->{
      name,
      slug
    },
    price,
    duration,
    level
  }`

    return await client.fetch(query, { categorySlug })
}

// Get courses by level
export const getCoursesByLevel = async (level) => {
    const query = `*[_type == "course" && level == $level && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      },
      alt
    },
    category->{
      title,
      slug
    },
    instructor->{
      name,
      slug
    },
    price,
    duration
  }`

    return await client.fetch(query, { level })
}

// Get all course categories
export const getAllCourseCategories = async () => {
    const query = `*[_type == "courseCategory"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    order,
    "courseCount": count(*[_type == "course" && references(^._id) && !(_id in path("drafts.**"))])
  }`

    return await client.fetch(query)
}

// Get featured courses
export const getFeaturedCourses = async (limit = 3) => {
    const query = `*[_type == "course" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      },
      alt
    },
    instructor->{
      name,
      slug
    },
    price,
    duration,
    level
  }`

    return await client.fetch(query)
}
