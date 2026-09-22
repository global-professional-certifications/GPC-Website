/**
 * Ambient types for build-tool globals.
 *
 * `import.meta.env` is a Vite construct. The Next.js app never uses it, but
 * sanity/env.ts still reads it because the Sanity CLI (`sanity dev`,
 * `sanity deploy`) bundles the Studio with Vite and injects SANITY_STUDIO_*
 * variables there. TypeScript has no built-in declaration for it, so without
 * this the Studio config fails to type-check.
 *
 * Declared as optional and index-signature-typed, matching how it is actually
 * read: through a defensive `typeof import.meta !== 'undefined'` guard with a
 * dynamic key.
 */
interface ImportMetaEnv {
  readonly [key: string]: string | undefined
}

interface ImportMeta {
  readonly env?: ImportMetaEnv
}
