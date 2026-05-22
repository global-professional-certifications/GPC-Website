import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-12-05',
  useCdn: false,
});

export default async function handler(req, res) {
  try {
    const course = (req.query.course || 'cia').toLowerCase();
    const slug1 = course;
    const slug2 = `${course}-brochure`;

    const query = `*[_type == "brochure" && (
      slug.current == $slug1 || 
      slug.current == $slug2 || 
      _id == $slug1 || 
      _id == $slug2
    )][0] {
      "url": pdfFile.asset->url
    }`;

    const result = await client.fetch(query, { slug1, slug2 });

    if (result && result.url) {
      res.writeHead(302, { Location: result.url });
      res.end();
    } else {
      res.status(404).send(`Brochure file for "${course}" not found in Sanity. Please ensure you have created a Brochure document with ID or slug matching "${course}" or "${course}-brochure".`);
    }
  } catch (error) {
    console.error('Error fetching brochure:', error);
    res.status(500).send('Error fetching brochure from Sanity.');
  }
}
