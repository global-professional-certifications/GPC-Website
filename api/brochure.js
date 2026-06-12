import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

function getSanityClient() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production';
  const apiVersion = process.env.VITE_SANITY_API_VERSION || process.env.SANITY_STUDIO_API_VERSION || '2024-12-05';

  if (!projectId) {
    throw new Error('Sanity Project ID is not configured. Please define VITE_SANITY_PROJECT_ID in your environment variables.');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}

export default async function handler(req, res) {
  try {
    const client = getSanityClient();
    const course = (req.query.course || 'cia').toLowerCase();
    const slug1 = course;
    const slug2 = `${course}-brochure`;
    const slug3 = `${course}-course-brochure`;

    const query = `*[_type == "brochure" && (
      slug.current == $slug1 ||
      slug.current == $slug2 ||
      slug.current == $slug3 ||
      _id == $slug1 ||
      _id == $slug2
    )][0] {
      "url": pdfFile.asset->url
    }`;

    const result = await client.fetch(query, { slug1, slug2, slug3 });

    if (result && result.url) {
      res.writeHead(302, { Location: result.url });
      res.end();
    } else {
      res.status(404).send(`Brochure file for "${course}" not found in Sanity. Please ensure you have created a Brochure document with ID or slug matching "${course}", "${course}-brochure", or "${course}-course-brochure".`);
    }
  } catch (error) {
    console.error('Error fetching brochure:', error);
    res.status(500).send(`Error fetching brochure: ${error.message}`);
  }
}

