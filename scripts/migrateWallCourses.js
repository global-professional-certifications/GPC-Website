// Run this script in your terminal:
// npx sanity exec scripts/migrateWallCourses.js --with-user-token

import { getCliClient } from 'sanity/cli'
import { randomUUID } from 'crypto'

const client = getCliClient()

const fixKeys = async () => {
  console.log('Fetching Wall of Excellence documents to fix missing array keys...')
  
  // Fetch documents that have a course array
  const docs = await client.fetch(`*[_type == "wallOfExcellence" && defined(course)]`)
  
  const docsToUpdate = docs.filter(doc => {
    if (Array.isArray(doc.course)) {
      // Only update if they are missing a _key
      return doc.course.some(item => !item._key)
    }
    return false
  })
  
  if (docsToUpdate.length === 0) {
    console.log('No documents are missing keys!')
    return
  }
  
  console.log(`Found ${docsToUpdate.length} documents needing keys. Fixing...`)
  
  const transaction = client.transaction()
  
  docsToUpdate.forEach(doc => {
    console.log(`Fixing keys for document ${doc._id}`)
    const updatedCourses = doc.course.map(item => {
      if (!item._key) {
        // Sanity requires _key to be a unique random string for each array item
        return { ...item, _key: randomUUID().replace(/-/g, '').slice(0, 12) }
      }
      return item
    })
    
    transaction.patch(doc._id, p => p.set({ course: updatedCourses }))
  })
  
  try {
    await transaction.commit()
    console.log('Successfully added all missing keys!')
  } catch (err) {
    console.error('Fix failed:', err)
  }
}

fixKeys()
