import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.VITE_SANITY_API_VERSION,
});
async function run() {
  const posts = await client.fetch('*[_type == "post"][0...2]{ title, author, "authorImage": author->image }');
  console.log(JSON.stringify(posts, null, 2));
}
run();
