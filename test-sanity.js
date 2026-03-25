import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'x48sh1kt',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const stories = await client.fetch(`*[_type == "successStory" && course->slug.current == "cisa"]{
    name,
    category,
    "courseSlug": course->slug.current
  }`);
  console.log("CISA Stories:", JSON.stringify(stories, null, 2));
  
  const cisaCourse = await client.fetch(`*[_type == "testimonialCourse" && slug.current == "cisa"]{
    name,
    isActive
  }`);
  console.log("CISA Course:", JSON.stringify(cisaCourse, null, 2));
}

run().catch(console.error);
