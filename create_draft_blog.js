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

async function createDraft() {
  const doc = {
    _id: 'test-blog-ui-published',
    _type: 'post',
    title: 'Mastering the Future: AI in Professional Certifications',
    slug: {
      _type: 'slug',
      current: 'test-blog-ui-published'
    },
    shortDescription: 'A comprehensive guide to understanding how AI is reshaping the landscape of professional certifications and what you need to know to stay ahead.',
    tldr: 'AI is fundamentally changing how we study and test for certifications, bringing adaptive testing and personalized learning paths to the forefront of professional development.',
    keyTakeaways: [
      'AI enhances study plans by identifying weak areas.',
      'Exams are becoming more adaptive and secure.',
      'Continuous learning is essential in the AI era.'
    ],
    author: {
      _type: 'reference',
      _ref: 'author-arpit-garg'
    },
    mainImage: {
      _type: 'image',
      alt: 'AI taking over certifications abstract illustration',
      asset: {
        _type: 'reference',
        _ref: 'image-bf3cb9f985b4c0597189f5d61e2008581474d729-1414x1217-jpg'
      }
    },
    contentType: 'pillar',
    articleType: 'guide',
    funnelStage: 'awareness',
    targetReader: 'Certification candidates and professionals',
    primaryKeyword: 'AI certifications',
    seoTitle: 'Mastering the Future: AI in Professional Certifications | GPC',
    metaDescription: 'Discover how AI is transforming professional certifications and learn how to adapt your study strategies for the modern era.',
    publishedAt: new Date().toISOString(),
    content: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Welcome to our demonstration draft! This post is created to test the new UI elements including the hero section, the TL;DR block, key takeaways, and mathematical rendering.',
            marks: []
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'The Impact of Artificial Intelligence',
            marks: []
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's3',
            text: 'Artificial Intelligence (AI) is no longer just a buzzword. It is actively redefining the parameters of professional growth. We are seeing major shifts in how content is delivered and consumed.',
            marks: []
          }
        ]
      },
      {
        _type: 'latex',
        _key: 'latex1',
        body: 'E = mc^2 \\\\ \\int_{a}^{b} x^2 dx',
      },
      {
        _type: 'inlineCTA',
        _key: 'cta1',
        title: 'Ready to take the next step?',
        description: 'Explore our comprehensive certification programs today.',
        buttonText: 'View Courses',
        link: '/courses',
        variant: 'gradient'
      }
    ]
  };

  try {
    const res = await client.createOrReplace(doc);
    console.log('Draft blog updated successfully:', res._id);
  } catch (err) {
    console.error('Error creating draft blog:', err);
  }
}

createDraft();
