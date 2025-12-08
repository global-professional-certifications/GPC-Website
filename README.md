# Global Professional Certifications

## What We Do
At **Global Professional Certifications (GPC)**, we are dedicated to empowering professionals worldwide by providing top-tier certification programs that unlock career growth, enhance expertise, and elevate industry standards.

## Tech Stack Used for This Project
- React -> Javascript library
- Tailwind -> CSS framework

## Watch This Video to Learn More About Global Professional Certifications
[![Watch the video](https://img.youtube.com/vi/2FWaO_Cf0eg/maxresdefault.jpg)](https://www.youtube.com/watch?v=2FWaO_Cf0eg)

### 🚀 Get Started
To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/global-professional-certifications/GPC-Website.git

# Navigate to the project folder
cd GPC-Website

# Install dependencies
npm install

# Start the development server
npm run dev

## Sanity CMS Integration

This project uses Sanity CMS for blog content management.

### Setup

1. Install dependencies: `npm install`
2. Ensure `.env` file has the correct Sanity credentials.

### Running Sanity Studio

To edit content, run the Sanity Studio locally:

```bash
npm run sanity
```

The Studio will be available at `http://localhost:3333`.

### Deployment

To deploy the Sanity Studio to a live URL:

```bash
npm run sanity:deploy
```

### Content Migration

A migration script `migrate.js` was used to migrate content from `BlogContent.jsx` to Sanity.
