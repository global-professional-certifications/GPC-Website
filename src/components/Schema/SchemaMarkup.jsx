import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SchemaMarkup Component
 * Reusable component for injecting JSON-LD structured data into pages
 * 
 * @param {Object|Array} schema - Single schema object or array of schema objects
 */
const SchemaMarkup = ({ schema }) => {
    if (!schema) return null;

    // Handle array of schemas and filter out falsy values
    const schemas = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);

    return (
        <Helmet>
            {schemas.map((schemaItem, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                >
                    {JSON.stringify(schemaItem)}
                </script>
            ))}
        </Helmet>
    );
};

export default SchemaMarkup;
