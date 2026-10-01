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

/*
 * Static asset imports resolve to a URL string.
 *
 * These must match the webpack rule in next.config.js, which handles images as
 * `asset/resource` because next-image-loader is disabled
 * (images.disableStaticImages). Next's own next/image-types/global would
 * declare them as StaticImageData objects, which is what silently produced
 * src="[object Object]" on every <img> in the site.
 *
 * Keep the two in step: if the webpack rule changes, change these.
 */
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.avif' {
  const src: string
  export default src
}
declare module '*.ico' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.pdf' {
  const src: string
  export default src
}
