import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  token: process.env.VITE_SANITY_API_TOKEN,
  apiVersion: '2024-12-05',
  useCdn: false,
})

const ASSETS_DIR = path.join(__dirname, 'src/assets')

async function uploadImage(imageName) {
  try {
    const imagePath = path.join(ASSETS_DIR, imageName)
    if (!fs.existsSync(imagePath)) {
      console.warn(`Image not found: ${imagePath}`)
      return null
    }
    const buffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', buffer, {
      filename: imageName
    })
    return asset
  } catch (error) {
    console.error(`Failed to upload image ${imageName}:`, error)
    return null
  }
}

function markdownToBlocks(markdown) {
  if (!markdown) return []
  
  const blocks = []
  const lines = markdown.split('\n')
  
  lines.forEach(line => {
    const trimmed = line.trim()
    if (!trimmed) return

    if (trimmed.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: trimmed.replace('### ', '') }]
      })
    } else if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: trimmed.replace('## ', '') }]
      })
    } else if (trimmed.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: trimmed.replace('# ', '') }]
      })
    } else if (trimmed.startsWith('- ')) {
       blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: trimmed.replace('- ', '') }]
      })
    } else {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: trimmed }]
      })
    }
  })
  
  return blocks
}

async function migrate() {
  console.log('Starting migration...')

  // 1. Create Author
  console.log('Creating Author...')
  const authorImageName = 'arpit-garg.png'
  const authorImageAsset = await uploadImage(authorImageName)
  
  const authorDoc = {
    _type: 'author',
    name: 'Arpit Garg',
    slug: { _type: 'slug', current: 'arpit-garg' },
    bio: 'Arpit Garg (CA, CIA, CRMA, CISA) is an IIA-recognized faculty and partner at RiskMan. He has pioneered CIA education in India, training over 1,500 audit professionals and students in the last 5 years.',
    image: authorImageAsset ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: authorImageAsset._id }
    } : undefined
  }

  const createdAuthor = await client.createOrReplace({
    _id: 'author-arpit-garg',
    ...authorDoc
  })
  console.log('Author created:', createdAuthor._id)

  // 2. Read and Parse Blog Content
  const blogContentPath = path.join(__dirname, 'src/components/Blogs/BlogContent.jsx')
  let content = fs.readFileSync(blogContentPath, 'utf-8')

  // Remove imports
  content = content.replace(/import .*/g, '')
  // Remove export
  content = content.replace('export const blogs', 'const blogs')
  
  // Mock variables
  const mocks = `
    const authorImage = 'arpit-garg.png';
    const blog1 = 'Blog-1.png';
    const blog2 = 'Blog-2.png';
    const blog3 = 'Blog-3.png';
    const blog4 = 'Blog-4.png';
    const blog5 = 'Blog-5.png';
    const blog6 = 'Blog-6.png';
    const blog7 = 'Blog-7.png';
    const blog8 = 'Blog-8.png';
    const blog9 = 'Blog-9.png';
    const blog10 = 'Blog-10.png';
  `
  
  // Eval to get data
  const getBlogs = new Function(`
    ${mocks}
    ${content}
    return blogs;
  `)
  
  const blogs = getBlogs()
  console.log(`Found ${blogs.length} blogs to migrate.`)

  for (const blog of blogs) {
    console.log(`Processing blog: ${blog.title}`)
    
    const coverAsset = await uploadImage(blog.cover)
    
    const postDoc = {
      _type: 'post',
      title: blog.title,
      slug: { _type: 'slug', current: blog.slug },
      publishedAt: new Date(blog.date).toISOString(),
      author: {
        _type: 'reference',
        _ref: createdAuthor._id
      },
      mainImage: coverAsset ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: coverAsset._id }
      } : undefined,
      excerpt: blog.content.substring(0, 150) + '...',
      body: markdownToBlocks(blog.content),
      meta: {
        metaTitle: blog.meta?.title || blog.title,
        metaDescription: blog.meta?.description || '',
        keywords: blog.meta?.keywords || '',
        primaryKeyword: blog.meta?.primaryKeyword || '',
        lsiKeywords: blog.meta?.lsiKeywords || []
      }
    }

    // Create post
    const docId = `post-${blog.slug}`
    const createdPost = await client.createOrReplace({
      _id: docId,
      ...postDoc
    })
    console.log(`Created/Updated post: ${createdPost.title}`)
  }

  console.log('Migration complete!')
}

migrate().catch(console.error)
