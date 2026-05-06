/**
 * Schema Generator Functions for GPC Website
 * Provides factory functions for creating JSON-LD structured data
 */

// Base URL for the website
const BASE_URL = "https://globalprofessionalcertifications.com";

/**
 * Organization Schema - Used globally across all pages
 */
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications",
    "alternateName": "GPC",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": [
        "https://www.linkedin.com/company/global-professional-certifications",
        "https://www.youtube.com/@globalprofessionalcertifications",
        "https://www.instagram.com/globalprofessionalcertifications"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-87360-83099",
        "contactType": "customer service",
        "email": "cia@globalprofessionalcertifications.com",
        "availableLanguage": ["English", "Hindi"]
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Innov8 Building, Orchid Centre, Golf course road",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122022",
        "addressCountry": "IN"
    },
    "foundingDate": "2024",
    "founder": {
        "@type": "Person",
        "name": "Arpit Garg"
    }
});

/**
 * WebSite Schema - For Homepage
 */
export const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Professional Certifications",
    "url": BASE_URL,
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
});

/**
 * Breadcrumb Schema Generator
 * @deprecated Use BreadcrumbsSEO component instead which generates this dynamically.
 * @param {Array} items - Array of {name, url} objects
 */
export const getBreadcrumbSchema = (items) => null;

/**
 * Course Schema Generator
 * @param {Object} course - Course details
 */
export const getCourseSchema = (course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
        "@type": "EducationalOrganization",
        "name": "Global Professional Certifications",
        "sameAs": BASE_URL
    },
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "instructor": {
            "@type": "Person",
            "name": "Arpit Garg",
            "jobTitle": "Lead Faculty, CIA, CA, CISA, CRMA"
        },
        ...(course.courseWorkload && { "courseWorkload": course.courseWorkload })
    },
    "offers": {
        "@type": "Offer",
        "price": course.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        ...(course.enrollUrl && { "url": course.enrollUrl })
    },
    "educationalCredentialAwarded": course.credential,
    ...(course.occupationalCategory && { "occupationalCategory": course.occupationalCategory })
});

/**
 * FAQPage Schema Generator
 * @param {Array} faqs - Array of {question, answer} objects
 */
export const getFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

/**
 * Person Schema - For Mentor/Faculty
 * @param {Object} person - Optional person details
 */
export const getPersonSchema = (person = {}) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name || "Arpit Garg",
    "jobTitle": person.title || "Founding Partner, Lead Faculty",
    ...(person.description && { "description": person.description }),
    ...(person.image && { "image": person.image }),
    "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Global Professional Certifications"
    },
    "hasCredential": [
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Certification",
            "name": "Chartered Accountant (CA)"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Certification",
            "name": "Certified Internal Auditor (CIA)"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Certification",
            "name": "Certified Information Systems Auditor (CISA)"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Certification",
            "name": "Certification in Risk Management Assurance (CRMA)"
        }
    ]
});

/**
 * Event Schema Generator
 * @param {Object} event - Event details
 */
export const getEventSchema = (event) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": event.isOnline
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    "location": event.isOnline
        ? { "@type": "VirtualLocation", "url": event.locationUrl }
        : {
            "@type": "Place",
            "name": event.locationName,
            "address": event.locationAddress
        },
    "organizer": {
        "@type": "EducationalOrganization",
        "name": "Global Professional Certifications"
    },
    "offers": {
        "@type": "Offer",
        "price": event.price || "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
    }
});

/**
 * BlogPosting Schema Generator
 * @param {Object} post - Blog post details
 */
export const getBlogPostingSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
        "@type": "Person",
        "name": post.author || "Arpit Garg"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Global Professional Certifications",
        "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`
        }
    },
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate || post.publishedDate,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": post.url
    }
});

/**
 * Review Schema Generator
 * @param {Object} review - Review details
 */
export const getReviewSchema = (review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
        "@type": "Person",
        "name": review.name,
        "jobTitle": review.designation
    },
    "reviewBody": review.text,
    "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || "5",
        "bestRating": "5"
    },
    "itemReviewed": {
        "@type": "Course",
        "name": review.courseName || "CIA Certification Course",
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Global Professional Certifications"
        }
    }
});

/**
 * AggregateRating Schema
 * @param {Object} rating - Optional rating details
 */
export const getAggregateRatingSchema = (rating = {}) => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.ratingValue || "4.9",
        "reviewCount": rating.reviewCount || "1500",
        "bestRating": rating.bestRating || "5",
        "worstRating": rating.worstRating || "1"
    }
});

/**
 * Service Schema Generator
 * @param {Object} service - Service details
 */
export const getServiceSchema = (service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
        "@type": "Organization",
        "name": "Global Professional Certifications"
    },
    "serviceType": service.serviceType
});

/**
 * DefinedTermSet Schema Generator for Glossary
 * @param {Array} terms - Array of {term, definition} objects
 */
export const getDefinedTermSetSchema = (terms) => ({
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Audit and Risk Management Glossary",
    "description": "Comprehensive glossary of terms used in internal audit, risk management, and IT audit",
    "hasDefinedTerm": terms.map(item => ({
        "@type": "DefinedTerm",
        "name": item.term,
        "description": item.definition
    }))
});

// Alias for backward compatibility
export const getGlossarySchema = getDefinedTermSetSchema;

/**
 * VideoObject Schema Generator
 * @param {Object} video - Video details
 */
export const getVideoSchema = (video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "embedUrl": video.embedUrl
});

/**
 * ItemList Schema for Course Collection
 * @param {Array} courses - Array of course objects
 */
export const getCourseListSchema = (courses) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Certification Courses at GPC",
    "itemListElement": courses.map((course, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Course",
            "name": course.name,
            "url": course.url,
            "description": course.description,
            "offers": {
                "@type": "Offer",
                "price": course.price,
                "priceCurrency": "INR"
            }
        }
    }))
});

/**
 * ContactPage Schema
 * @param {Object} page - Optional page details
 */
export const getContactPageSchema = (page = {}) => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": page.name || "Contact Us - Global Professional Certifications",
    "description": page.description || "Reach out to our team for queries, support, or course guidance",
    ...(page.url && { "url": page.url })
});

/**
 * LocalBusiness Schema with geo coordinates
 * @param {Object} business - Optional business details
 */
export const getLocalBusinessSchema = (business = {}) => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": business.name || "Global Professional Certifications",
    "description": business.description || "Leading institute for CIA, CISA, CRMA, and IAP certification training",
    "telephone": business.phone || "+91-87360-83099",
    "email": business.email || "cia@globalprofessionalcertifications.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address || "Innov8 Building, Orchid Centre, Golf course road",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122022",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.4595",
        "longitude": "77.0266"
    },
    "hasMap": "https://maps.app.goo.gl/iJx6qe41EeEeG1vY8",
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
    }
});

/**
 * AboutPage Schema
 * @param {Object} page - Optional page details
 */
export const getAboutPageSchema = (page = {}) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": page.name || "About Us - Global Professional Certifications",
    "description": page.description || "Learn about GPC's mission, vision, and world-class faculty",
    ...(page.url && { "url": page.url }),
    "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "Global Professional Certifications"
    }
});

/**
 * WebPage Schema for generic pages
 * @param {Object} page - Page details
 */
export const getWebPageSchema = (page) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "publisher": {
        "@type": "Organization",
        "name": "Global Professional Certifications"
    }
});

/**
 * CollectionPage Schema
 * @param {Object} collection - Collection details
 */
export const getCollectionPageSchema = (collection) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "description": collection.description
});

// Export BASE_URL for use in other files
export { BASE_URL };
