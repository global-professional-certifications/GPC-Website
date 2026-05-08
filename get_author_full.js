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
  const author = await client.fetch('*[_type == "author"][0]');
  console.log(JSON.stringify(author, null, 2));
}
run();
