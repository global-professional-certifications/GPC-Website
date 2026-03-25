import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'x48sh1kt',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN || 'sk1AMvA8sAd0bZ5sInn8Pn55jhR2Maj7a8Pcagv1JojuKqw9weoNegYMukNsqPfSDgZ3DsX8Bu6gUB514wBmKUIsxFnIevU7ynCLcJZTOfIniyccGjMjaTVRMan4MgXJokT4ONT1e5NsZhUizcIZ4gZDB4xaQJTb9LZ8PhBC5hQ4c1AMhAKm'
});

async function migrate() {
  console.log("Starting migration...");
  
  // 1. Fetch all courses
  const courses = await client.fetch(`*[_type == "testimonialCourse"]`);
  console.log(`Found ${courses.length} courses to process.`);

  const sharedCourses = courses.filter(c => !c.category);
  console.log(`Found ${sharedCourses.length} shared (legacy) courses.`);

  if (sharedCourses.length === 0) {
    console.log("No shared courses found to migrate. Exiting.");
    return;
  }

  // Categories to split into
  const categories = ['video', 'written', 'image', 'wallOfExcellence'];
  
  // Mapping of old Course ID -> { video: newId, written: newId, ... }
  const mapping = {};

  for (const course of sharedCourses) {
    mapping[course._id] = {};
    
    for (const cat of categories) {
      const newCourseDoc = {
        _type: 'testimonialCourse',
        name: course.name,
        fullName: course.fullName,
        slug: course.slug ? { _type: 'slug', current: `${course.slug.current}-${cat}` } : undefined,
        isActive: course.isActive,
        order: course.order,
        category: cat
      };
      
      const created = await client.create(newCourseDoc);
      mapping[course._id][cat] = created._id;
      console.log(`Created new ${cat} course for ${course.name} -> ID: ${created._id}`);
    }
    
    // Assign the old original course to 'global' so it stops showing up in standard lists, 
    // or just delete it if all references are updated successfully.
    // For safety, let's just mark it category: 'legacy'
    await client.patch(course._id).set({ category: 'legacy' }).commit();
  }

  // 2. Fetch all success stories and update references
  const stories = await client.fetch(`*[_type == "successStory"]`);
  for (const story of stories) {
    if (story.course && story.course._ref && mapping[story.course._ref]) {
      const storyCat = story.category; // video, written, image
      const newCourseId = mapping[story.course._ref][storyCat];
      
      if (newCourseId) {
        await client.patch(story._id).set({
          course: { _type: 'reference', _ref: newCourseId }
        }).commit();
        console.log(`Updated Success Story ${story.name} to use new isolated course ${newCourseId}`);
      }
    }
  }

  // 3. Fetch all wallOfExcellence entries and update references
  const wallEntries = await client.fetch(`*[_type == "wallOfExcellence"]`);
  for (const entry of wallEntries) {
    if (entry.course && entry.course._ref && mapping[entry.course._ref]) {
      const newCourseId = mapping[entry.course._ref]['wallOfExcellence'];
      if (newCourseId) {
        await client.patch(entry._id).set({
          course: { _type: 'reference', _ref: newCourseId }
        }).commit();
        console.log(`Updated Wall of Excellence entry ${entry.name} to use new isolated course ${newCourseId}`);
      }
    }
  }

  console.log("Migration complete!");
}

migrate().catch(console.error);
