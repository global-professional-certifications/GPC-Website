'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SchemaMarkup from './SchemaMarkup';
import { generateBreadcrumbSchema } from './breadcrumbs';

/**
 * BreadcrumbsSEO Component
 * Invisible component that automatically injects breadcrumb structured data
 * based on the current route.
 *
 * The schema-building logic lives in ./breadcrumbs so that server components
 * can call it too -- 'use client' here would otherwise make it unreachable from
 * the server. See the note in that file.
 */
const BreadcrumbsSEO = () => {
    const pathname = usePathname();

    const schema = generateBreadcrumbSchema(pathname);

    if (!schema) return null;

    return <SchemaMarkup schema={schema} />;
};

export default BreadcrumbsSEO;
