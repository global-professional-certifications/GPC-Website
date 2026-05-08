import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.VITE_SANITY_API_VERSION,
  token: process.env.VITE_SANITY_API_TOKEN,
});

async function run() {
  const author = await client.fetch('*[_type == "author"][0]');
  console.log('AUTHOR ID:', author ? author._id : 'NONE');

  const cat = await client.fetch('*[_type == "category"][0]');
  console.log('CAT ID:', cat ? cat._id : 'NONE');
}
run();
