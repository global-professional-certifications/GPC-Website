export { default as SchemaMarkup } from './SchemaMarkup';
export { default as BreadcrumbsSEO } from './BreadcrumbsSEO';

// Re-exported from ./breadcrumbs rather than ./BreadcrumbsSEO. That file is
// marked 'use client', and re-exporting a plain function through it would make
// this barrel a client module -- so every server component importing anything
// from '../Schema' would fail with "Attempted to call generateBreadcrumbSchema()
// from the server". Keep pure helpers out of the client-marked file.
export { generateBreadcrumbSchema, formatSlug } from './breadcrumbs';

export * from './schemas';
