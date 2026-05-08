import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'x48sh1kt',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-12-05',
});

async function run() {
  const query = `*[_type == "wallOfExcellence"] { company }`;
  const data = await client.fetch(query);
  const companies = data.map(doc => doc.company).filter(Boolean);
  const uniqueCompanies = [...new Set(companies)];
  console.log(uniqueCompanies.join(', '));
}

run();
