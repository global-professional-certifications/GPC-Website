import React from 'react';

/**
 * Injects JSON-LD structured data.
 *
 * @param {Object|Array} schema - Single schema object or array of schema objects
 *
 * Previously wrapped its <script> tags in react-helmet-async to hoist them into
 * <head>. Next.js has no Helmet, and the hoisting was never necessary: JSON-LD
 * is valid anywhere in the document and Google reads it from <body> just as
 * happily. So the tags are rendered inline, exactly where the component sits.
 *
 * The public API is unchanged -- every existing <SchemaMarkup schema={...} />
 * call site keeps working as-is.
 *
 * Note this has no 'use client' directive. It renders no interactivity, so
 * where it is used from a server component the JSON-LD lands in the server HTML
 * and is visible to crawlers that do not run JavaScript. That is a real gain
 * over the Helmet version, which could only ever write these after hydration.
 */
const SchemaMarkup = ({ schema }) => {
    if (!schema) return null;

    const schemas = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
    if (!schemas.length) return null;

    return (
        <>
            {schemas.map((schemaItem, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    // JSON.stringify output is inert data, not markup. `</script>`
                    // cannot appear because stringify escapes nothing that would
                    // produce it from an object graph -- but the `<` escape below
                    // closes that door regardless, since CMS-authored strings do
                    // reach these schemas.
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaItem).replace(/</g, '\\u003c'),
                    }}
                />
            ))}
        </>
    );
};

export default SchemaMarkup;
