import { BASE_URL } from './schemas';

/**
 * Breadcrumb JSON-LD generation.
 *
 * Split out of BreadcrumbsSEO.jsx during the Next.js migration. That file needs
 * 'use client' because it reads the current path via usePathname(), and the
 * directive marks the whole *module* as client code -- which made this pure
 * function unreachable from server components:
 *
 *   Attempted to call generateBreadcrumbSchema() from the server but
 *   generateBreadcrumbSchema is on the client.
 *
 * Seven server-rendered pages (Contact, Terms, Privacy, Refund, AboutUs, Qaip,
 * GtmTrainings) call it directly, so it lives here where both sides can reach
 * it. Logic is unchanged.
 */

// Mapping known paths to SEO-friendly, readable names
const routeNamesMap = {
    'courses': 'Courses',
    'cia': 'Certified Internal Auditor (CIA)',
    'crma': 'Certification in Risk Management Assurance (CRMA)',
    'cisa': 'Certified Information Systems Auditor (CISA)',
    'iap': 'Internal Audit Practitioner (IAP)',
    'about': 'About Us',
    'contact': 'Contact Us',
    'faq': 'FAQ',
    'glossary': 'Glossary',
    'success': 'Success Stories',
    'events': 'Events',
    'corporate': 'Corporate Trainings',
    'qaip': 'QAIP',
    'gtm-trainings': 'GTM Trainings',
    'blogs': 'Blogs',
    'upcoming': 'Upcoming',
    'video-gallery': 'Video Gallery',
    'written-gallery': 'Written Gallery',
    'terms': 'Terms & Conditions',
    'privacy': 'Privacy Policy',
    'refund': 'Refund Policy',
    'our-journey': 'Our Journey',
    'studio': 'Sanity Studio'
};

/**
 * Transforms a slug or URL segment into a human-readable name.
 */
export const formatSlug = (slug) => {
    if (!slug) return '';

    // Check if it's a known static route
    const lowerSlug = slug.toLowerCase();
    if (routeNamesMap[lowerSlug]) {
        return routeNamesMap[lowerSlug];
    }

    // Otherwise, convert dashes to spaces and capitalize words
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Generates the BreadcrumbList JSON-LD schema based on the current URL path.
 *
 * @param {string} pathname - Current URL path
 * @param {string} baseUrl - Base URL of the website
 * @returns {Object|null} - JSON-LD Schema object or null if on homepage
 */
export const generateBreadcrumbSchema = (pathname, baseUrl = BASE_URL) => {
    // usePathname() can briefly return null during the first client render,
    // and server callers pass a literal. Guard so a null never becomes the
    // string "null" inside a breadcrumb URL.
    if (!pathname) return null;

    // Ignore trailing slashes
    const cleanPathname = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

    const pathSegments = cleanPathname.split('/').filter(Boolean);

    // Start with Home
    const itemListElement = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
        }
    ];

    let currentUrl = baseUrl;

    pathSegments.forEach((segment, index) => {
        // Strip out query params or hashes just in case they slipped in
        const cleanSegment = segment.split('?')[0].split('#')[0];

        currentUrl = `${currentUrl}/${cleanSegment}`;

        itemListElement.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": formatSlug(cleanSegment),
            "item": currentUrl
        });
    });

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };
};
