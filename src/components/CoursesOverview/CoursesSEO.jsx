import React from "react";
import { Helmet } from "react-helmet-async";

const CoursesSEO = () => {
    const coursesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "Course",
                "name": "Certified Internal Auditor (CIA)",
                "description": "Professional certification for internal auditors to enhance auditing skills.",
                "provider": {
                    "@type": "Organization",
                    "name": "Global Professional Certifications",
                    "sameAs": "https://globalprofessionalcertifications.com"
                }
            },
            {
                "@type": "Course",
                "name": "Certified Risk Management Auditor (CRMA)",
                "description": "Certification for auditors specializing in risk management and internal controls.",
                "provider": {
                    "@type": "Organization",
                    "name": "Global Professional Certifications",
                    "sameAs": "https://globalprofessionalcertifications.com"
                }
            },
            {
                "@type": "Course",
                "name": "Certified Information Systems Auditor (CISA)",
                "description": "Certification for auditing, control, and security of information systems.",
                "provider": {
                    "@type": "Organization",
                    "name": "Global Professional Certifications",
                    "sameAs": "https://globalprofessionalcertifications.com"
                }
            },
            {
                "@type": "Course",
                "name": "Internal Audit Practitioner (IAP)",
                "description": "Entry-level certification for aspiring internal auditors.",
                "provider": {
                    "@type": "Organization",
                    "name": "Global Professional Certifications",
                    "sameAs": "https://globalprofessionalcertifications.com"
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(coursesSchema, null, 2)}
            </script>
        </Helmet>
    );
};

export default CoursesSEO;
