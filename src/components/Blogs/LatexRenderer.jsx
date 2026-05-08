import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const LatexRenderer = ({ value }) => {
  if (!value || !value.formula) return null;

  const html = katex.renderToString(value.formula, {
    throwOnError: false,
    displayMode: value.displayMode === 'block',
  });

  return (
    <div className={`my-4 ${value.displayMode === 'block' ? 'text-center' : 'inline-block'}`}>
      <span dangerouslySetInnerHTML={{ __html: html }} />
      {value.caption && value.displayMode === 'block' && (
        <div className="text-sm text-gray-500 mt-2 italic">{value.caption}</div>
      )}
    </div>
  );
};

export default LatexRenderer;
