# GPC Website - Structured Data Schema Implementation Plan

## Overview

This document outlines a comprehensive plan for implementing JSON-LD structured data schemas across all pages and sections of the **Global Professional Certifications (GPC) Website**. Structured data helps search engines understand content better, enabling rich snippets and improved SEO visibility.

---

## Schema.org Types to Implement

| Schema Type | Description | Pages/Sections |
|-------------|-------------|----------------|
| `Organization` | Company information | All pages (global) |
| `WebSite` | Website with search action | Homepage |
| `Course` | Educational course details | All course pages |
| `FAQPage` | Frequently asked questions | FAQ sections across pages |
| `BreadcrumbList` | Navigation path | All inner pages |
| `Article` / `BlogPosting` | Blog content | Blog pages |
| `Event` | Event information | Events page |
| `Review` / `AggregateRating` | Testimonials and reviews | Testimonial sections |
| `Person` | Mentor/Faculty info | About/Mentor sections |
| `LocalBusiness` / `EducationalOrganization` | Business contact info | Contact page |
| `Product` / `Offer` | Course pricing | Course pages with pricing |
| `DefinedTermSet` | Glossary terms | Glossary page |
| `VideoObject` | Video content | Video sections |
| `ContactPage` | Contact information | Contact page |

---

## Page-by-Page Schema Implementation

### 1. Homepage (`/`)
**File:** `src/components/Home/Home.jsx`

#### Required Schemas:

##### 1.1 Organization Schema (Global - in Layout)
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Global Professional Certifications",
  "alternateName": "GPC",
  "url": "https://globalprofessionalcertifications.com",
  "logo": "https://globalprofessionalcertifications.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/gpc",
    "https://www.youtube.com/@globalprofessionalcertifications"
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
  }
}
```

##### 1.2 WebSite Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Global Professional Certifications",
  "url": "https://globalprofessionalcertifications.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://globalprofessionalcertifications.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

##### 1.3 FAQPage Schema (for FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What certifications or training does Global Professional Certifications offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Global Professional Certifications specializes in globally recognized certifications..."
      }
    }
    // ... additional FAQ items
  ]
}
```

##### 1.4 VideoObject Schema (for YouTube embeds)
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "One Year of GPC | A Journey of Growth, Learning & Creativity",
  "description": "Celebration of one year of success...",
  "thumbnailUrl": "https://img.youtube.com/vi/WgA9VzD06kY/maxresdefault.jpg",
  "uploadDate": "2024-01-01",
  "embedUrl": "https://www.youtube.com/embed/WgA9VzD06kY"
}
```

##### 1.5 AggregateRating (for testimonials section)
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Global Professional Certifications",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1500",
    "bestRating": "5"
  }
}
```

---

### 2. About Us Page (`/about`)
**File:** `src/components/About/AboutUs.jsx`

#### Required Schemas:

##### 2.1 Person Schema (for Mentor - Arpit Garg)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Arpit Garg",
  "jobTitle": "Founding Partner, Lead Faculty",
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
  ],
  "description": "India's top faculty for CIA, CISA, CRMA, and IAP training"
}
```

##### 2.2 AboutPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Us - Global Professional Certifications",
  "description": "Learn about GPC's mission, vision, and world-class faculty",
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications"
  }
}
```

##### 2.3 BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://globalprofessionalcertifications.com" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://globalprofessionalcertifications.com/about" }
  ]
}
```

---

### 3. CIA Course Page (`/courses/cia`)
**File:** `src/components/Courses/Cia.jsx`

#### Required Schemas:

##### 3.1 Course Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Certified Internal Auditor (CIA) Certification Course",
  "description": "Master the complete CIA exam with expert guidance and comprehensive study materials. All 3 parts with Gleim content.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications",
    "sameAs": "https://globalprofessionalcertifications.com"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "instructor": {
      "@type": "Person",
      "name": "Arpit Garg"
    },
    "courseWorkload": "PT60-70H (Part 1), PT80-90H (Part 2), PT40-50H (Part 3)"
  },
  "offers": {
    "@type": "Offer",
    "price": "58999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://rzp.io/rzp/CIASessions"
  },
  "educationalCredentialAwarded": "Certified Internal Auditor (CIA)",
  "occupationalCategory": "Internal Auditor, Risk Management Professional"
}
```

##### 3.2 FAQPage Schema (CIA-specific FAQs)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is earning CIA certification beneficial in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the CIA Certification is highly valued in India..."
      }
    }
    // ... additional CIA FAQ items
  ]
}
```

##### 3.3 BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://globalprofessionalcertifications.com" },
    { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://globalprofessionalcertifications.com/courses" },
    { "@type": "ListItem", "position": 3, "name": "CIA", "item": "https://globalprofessionalcertifications.com/courses/cia" }
  ]
}
```

---

### 4. CISA Course Page (`/courses/cisa`)
**File:** `src/components/Courses/Cisa.jsx`

#### Required Schemas:

##### 4.1 Course Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Certified Information Systems Auditor (CISA) Certification Course",
  "description": "Become a certified expert in IT auditing and risk management with our comprehensive CISA course",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications"
  },
  "offers": {
    "@type": "Offer",
    "price": "17700",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "educationalCredentialAwarded": "Certified Information Systems Auditor (CISA)",
  "occupationalCategory": "IT Auditor, Cybersecurity Professional"
}
```

##### 4.2 FAQPage Schema (CISA-specific)
##### 4.3 BreadcrumbList

---

### 5. CRMA Course Page (`/courses/crma`)
**File:** `src/components/Courses/Crma.jsx`

#### Required Schemas:

##### 5.1 Course Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Certification in Risk Management Assurance (CRMA)",
  "description": "Advance your risk career with our CRMA course on assurance, governance, and mitigation",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications"
  },
  "offers": {
    "@type": "Offer",
    "price": "29500",
    "priceCurrency": "INR"
  },
  "educationalCredentialAwarded": "Certification in Risk Management Assurance (CRMA)"
}
```

##### 5.2 FAQPage Schema
##### 5.3 BreadcrumbList

---

### 6. IAP Course Page (`/courses/iap`)
**File:** `src/components/Courses/Iap.jsx`

#### Required Schemas:

##### 6.1 Course Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Internal Audit Practitioner (IAP)",
  "description": "Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications"
  },
  "offers": {
    "@type": "Offer",
    "price": "23600",
    "priceCurrency": "INR"
  },
  "educationalCredentialAwarded": "Internal Audit Practitioner (IAP)"
}
```

##### 6.2 FAQPage Schema
##### 6.3 BreadcrumbList

---

### 7. Courses Overview Page (`/courses`)
**File:** `src/components/CoursesOverview/CoursesOverview.jsx`

#### Required Schemas:

##### 7.1 ItemList Schema (Collection of Courses)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Certification Courses at GPC",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "CIA All 3 Parts with Gleim Content",
        "url": "https://globalprofessionalcertifications.com/courses/cia"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "CISA Certification",
        "url": "https://globalprofessionalcertifications.com/courses/cisa"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "name": "IAP Certification",
        "url": "https://globalprofessionalcertifications.com/courses/iap"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Course",
        "name": "CRMA Certification",
        "url": "https://globalprofessionalcertifications.com/courses/crma"
      }
    }
  ]
}
```

##### 7.2 BreadcrumbList

---

### 8. Contact Page (`/contact`)
**File:** `src/components/Contact/ContactUs.jsx`

#### Required Schemas:

##### 8.1 ContactPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us - Global Professional Certifications",
  "description": "Reach out to our team for queries, support, or course guidance"
}
```

##### 8.2 LocalBusiness/EducationalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Global Professional Certifications",
  "telephone": "+91-87360-83099",
  "email": "cia@globalprofessionalcertifications.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Innov8 Building, Orchid Centre, Golf course road",
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
  "hasMap": "https://maps.app.goo.gl/iJx6qe41EeEeG1vY8"
}
```

##### 8.3 BreadcrumbList

---

### 9. FAQ Page (`/faq`)
**File:** `src/components/FaqPage/FaqPage.jsx`

#### Required Schemas:

##### 9.1 FAQPage Schema (All FAQs)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What certifications or training does Global Professional Certifications offer for global professionals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPC provides training for CIA, CISA, CRMA, and IAP certifications..."
      }
    }
    // ... all 18+ FAQ items from the page
  ]
}
```

##### 9.2 BreadcrumbList

---

### 10. Events Page (`/events`)
**File:** `src/components/Events/Events.jsx`

#### Required Schemas:

##### 10.1 Event Schema (for each event)
```json
{
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "name": "CIA Orientation Webinar",
  "description": "Free orientation session for CIA certification aspirants",
  "startDate": "2026-01-20T10:00:00+05:30",
  "endDate": "2026-01-20T12:00:00+05:30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://zoom.us/meeting/..."
  },
  "organizer": {
    "@type": "EducationalOrganization",
    "name": "Global Professional Certifications"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
```

##### 10.2 FAQPage Schema (Events FAQs)
##### 10.3 BreadcrumbList

---

### 11. Blog List Page (`/blogs`)
**File:** `src/components/Blogs/BlogList.jsx`

#### Required Schemas:

##### 11.1 CollectionPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Blog - Global Professional Certifications",
  "description": "Insights, tips, and updates on CIA, CISA, CRMA, IAP certifications and audit industry trends"
}
```

##### 11.2 BreadcrumbList

---

### 12. Individual Blog Page (`/blogs/:slug`)
**File:** `src/components/Blogs/BlogPage.jsx`

#### Required Schemas:

##### 12.1 Article/BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Blog Title]",
  "description": "[Blog Description]",
  "image": "[Featured Image URL]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Global Professional Certifications",
    "logo": {
      "@type": "ImageObject",
      "url": "https://globalprofessionalcertifications.com/logo.png"
    }
  },
  "datePublished": "[Publish Date]",
  "dateModified": "[Modified Date]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[Blog URL]"
  }
}
```

##### 12.2 BreadcrumbList

---

### 13. Success Stories Page (`/success`)
**File:** `src/components/SuccessStories/SuccessStories.jsx`

#### Required Schemas:

##### 13.1 Review Schema (for each testimonial)
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Pinky Agarwal",
    "jobTitle": "Head Internal Audit | Emami Limited"
  },
  "reviewBody": "For anyone preparing for the CIA Challenge Exam, I cannot recommend the Prep Course enough...",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "itemReviewed": {
    "@type": "Course",
    "name": "CIA Certification Course",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Global Professional Certifications"
    }
  }
}
```

##### 13.2 AggregateRating Schema
##### 13.3 BreadcrumbList

---

### 14. Our Journey Page (`/our-journey`)
**File:** `src/components/Journey/Journey.jsx`

#### Required Schemas:

##### 14.1 Organization with History
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Global Professional Certifications",
  "foundingDate": "2024",
  "description": "Celebrating 1 year of success helping professionals achieve CIA, CISA, CRMA, and IAP certifications"
}
```

##### 14.2 BreadcrumbList

---

### 15. Corporate - QAIP Page (`/corporate/qaip`)
**File:** `src/components/Corporate/Qaip.jsx`

#### Required Schemas:

##### 15.1 Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Quality Assurance and Improvement Program (QAIP)",
  "description": "Professional QAIP consulting and implementation services for internal audit functions",
  "provider": {
    "@type": "Organization",
    "name": "Global Professional Certifications"
  },
  "serviceType": "Internal Audit Consulting"
}
```

##### 15.2 BreadcrumbList

---

### 16. Corporate - GTM Trainings Page (`/corporate/gtm-trainings`)
**File:** `src/components/Corporate/GtmTrainings.jsx`

#### Required Schemas:

##### 16.1 Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Corporate Training Programs",
  "description": "Go-to-Market corporate training solutions for internal audit teams",
  "provider": {
    "@type": "Organization",
    "name": "Global Professional Certifications"
  },
  "serviceType": "Corporate Training"
}
```

##### 16.2 BreadcrumbList

---

### 17. Glossary Page (`/glossary`)
**File:** `src/components/Glossary/Glossary.jsx`

#### Required Schemas:

##### 17.1 DefinedTermSet Schema
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Audit and Risk Management Glossary",
  "description": "Comprehensive glossary of terms used in internal audit, risk management, and IT audit",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Audit",
      "description": "Systematic review of records and controls to ensure compliance, accuracy, and integrity in an organization."
    },
    {
      "@type": "DefinedTerm",
      "name": "CIA (Certified Internal Auditor)",
      "description": "A globally recognized certification for internal audit professionals issued by IIA."
    }
    // ... all glossary terms
  ]
}
```

##### 17.2 BreadcrumbList

---

### 18. Terms & Conditions Page (`/terms`)
**File:** `src/components/Terms/Terms.jsx`

#### Required Schemas:

##### 18.1 WebPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions",
  "description": "Terms and conditions for using Global Professional Certifications services",
  "publisher": {
    "@type": "Organization",
    "name": "Global Professional Certifications"
  }
}
```

##### 18.2 BreadcrumbList

---

### 19. Privacy Policy Page (`/privacy`)
**File:** `src/components/Privacy/PrivacyPolicy.jsx`

#### Required Schemas:

##### 19.1 WebPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "Privacy policy for Global Professional Certifications website"
}
```

##### 19.2 BreadcrumbList

---

### 20. Refund Policy Page (`/refund`)
**File:** `src/components/Refund/RefundPolicy.jsx`

#### Required Schemas:

##### 20.1 WebPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Refund Policy",
  "description": "Refund policy for Global Professional Certifications courses"
}
```

##### 20.2 BreadcrumbList

---

## Implementation Strategy

### Phase 1: Create Schema Utility Components
1. Create a reusable `SchemaMarkup.jsx` component that injects JSON-LD
2. Create individual schema generator functions for each type

### Phase 2: Global Schemas (Layout Level)
1. Add Organization schema to `Layout.jsx`
2. Add WebSite schema to the root

### Phase 3: Page-Specific Schemas
1. Implement schemas in each page component
2. Use dynamic data where applicable (e.g., blog posts from Sanity)

### Phase 4: Dynamic Schemas for CMS Content
1. Update Sanity blog fetching to include schema data
2. Implement dynamic event schemas

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/Schema/SchemaMarkup.jsx` | **CREATE** | Reusable component for JSON-LD injection |
| `src/components/Schema/schemas.js` | **CREATE** | Schema generator functions |
| `src/Layout.jsx` | **MODIFY** | Add global Organization schema |
| `src/components/Home/Home.jsx` | **MODIFY** | Add homepage schemas |
| `src/components/About/AboutUs.jsx` | **MODIFY** | Add about page schemas |
| `src/components/Courses/Cia.jsx` | **MODIFY** | Add CIA course schema |
| `src/components/Courses/Cisa.jsx` | **MODIFY** | Add CISA course schema |
| `src/components/Courses/Crma.jsx` | **MODIFY** | Add CRMA course schema |
| `src/components/Courses/Iap.jsx` | **MODIFY** | Add IAP course schema |
| `src/components/CoursesOverview/CoursesOverview.jsx` | **MODIFY** | Add courses list schema |
| `src/components/Contact/ContactUs.jsx` | **MODIFY** | Add contact page schema |
| `src/components/FaqPage/FaqPage.jsx` | **MODIFY** | Add FAQ schema |
| `src/components/Events/Events.jsx` | **MODIFY** | Add events schema |
| `src/components/Blogs/BlogList.jsx` | **MODIFY** | Add collection schema |
| `src/components/Blogs/BlogPage.jsx` | **MODIFY** | Add article schema |
| `src/components/SuccessStories/SuccessStories.jsx` | **MODIFY** | Add review schemas |
| `src/components/Journey/Journey.jsx` | **MODIFY** | Add organization history schema |
| `src/components/Corporate/Qaip.jsx` | **MODIFY** | Add service schema |
| `src/components/Corporate/GtmTrainings.jsx` | **MODIFY** | Add service schema |
| `src/components/Glossary/Glossary.jsx` | **MODIFY** | Add glossary schema |
| `src/components/Terms/Terms.jsx` | **MODIFY** | Add page schema |
| `src/components/Privacy/PrivacyPolicy.jsx` | **MODIFY** | Add page schema |
| `src/components/Refund/RefundPolicy.jsx` | **MODIFY** | Add page schema |

---

## Verification Plan

### Automated Testing
1. **Google Rich Results Test**: Test each page URL after deployment
   - URL: https://search.google.com/test/rich-results
   
2. **Schema Markup Validator**: Validate JSON-LD syntax
   - URL: https://validator.schema.org/

### Manual Testing
1. Deploy to staging/preview environment
2. Test each major page type with Google Rich Results Test
3. Verify no console errors related to schema markup
4. Check that schemas are properly rendered in page source (View Source → search for "application/ld+json")

### Browser Dev Tools Verification
1. Inspect page source to confirm JSON-LD scripts are present
2. Use browser extensions like "Structured Data Testing Tool" or "Schema Builder for SEO"

---

## Priority Order for Implementation

1. **High Priority** (Immediate SEO impact):
   - Organization schema (global)
   - Course schemas (CIA, CISA, CRMA, IAP)
   - FAQPage schemas
   - BreadcrumbList (all pages)

2. **Medium Priority**:
   - Blog/Article schemas
   - Event schemas
   - Review/Testimonial schemas
   - Contact/LocalBusiness schema

3. **Lower Priority**:
   - Glossary DefinedTermSet
   - Service schemas (Corporate pages)
   - Video schemas
