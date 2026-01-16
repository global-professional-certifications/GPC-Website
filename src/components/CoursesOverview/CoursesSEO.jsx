import React from "react";
import { SchemaMarkup, getCourseListSchema, getBreadcrumbSchema } from "../Schema";

const CoursesSEO = () => {
    // Course List Schema with pricing
    const coursesSchema = getCourseListSchema([
        {
            name: "Certified Internal Auditor (CIA) - All 3 Parts with Gleim Content",
            url: "https://globalprofessionalcertifications.com/courses/cia",
            description: "Master internal auditing with comprehensive CIA certification training. All 3 parts with Gleim content and live weekend classes.",
            price: "58999"
        },
        {
            name: "Certified Information Systems Auditor (CISA)",
            url: "https://globalprofessionalcertifications.com/courses/cisa",
            description: "Become a certified IT audit expert with ISACA-aligned CISA certification training.",
            price: "17700"
        },
        {
            name: "Internal Audit Practitioner (IAP)",
            url: "https://globalprofessionalcertifications.com/courses/iap",
            description: "Start your internal audit career with foundational IAP certification. Gateway to CIA.",
            price: "23600"
        },
        {
            name: "Certification in Risk Management Assurance (CRMA)",
            url: "https://globalprofessionalcertifications.com/courses/crma",
            description: "Master risk management and assurance with IIA-aligned CRMA certification training.",
            price: "29500"
        }
    ]);

    // Breadcrumb Schema
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "Courses", url: "https://globalprofessionalcertifications.com/courses" }
    ]);

    return (
        <SchemaMarkup schema={[coursesSchema, breadcrumbSchema]} />
    );
};

export default CoursesSEO;

