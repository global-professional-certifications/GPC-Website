/**
 * Sanity connection config, resolved once and shared by both builds.
 *
 * These MUST be literal, statically-analysable `process.env.NEXT_PUBLIC_*`
 * references. Next.js inlines client-side env vars by textual substitution at
 * build time, so a dynamic lookup like `process.env[key]` silently evaluates to
 * undefined in the browser bundle. That failure mode is nasty -- it builds
 * fine, renders fine on the server, and only blows up after hydration -- so the
 * repetition below is deliberate. Do not refactor it into a loop or a helper
 * that takes the name as a parameter.
 *
 * Neither build reads NEXT_PUBLIC_* from the environment directly:
 *   - Next.js  : next.config.js maps the existing VITE_* vars onto these names.
 *   - Vite     : vite.config.js `define` substitutes the same values.
 *
 * That indirection is what lets us migrate without touching the Vercel
 * dashboard. The deployment's existing VITE_SANITY_* variables keep working
 * exactly as they do today, so there is no window where a missing env var takes
 * the site down.
 */

/**
 * Narrows `string | undefined` to `string`, failing loudly at module load
 * rather than as an opaque 401 from the Sanity API several layers later.
 *
 * Needed because `process.env` is typed `string | undefined`, while
 * createClient requires `string`. Asserting here means every consumer gets a
 * plain `string` and none of them have to re-check.
 */
function required(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(
            `Sanity config is incomplete: ${name} is not set. Expected it to be ` +
            'provided by next.config.js (mapped from the VITE_SANITY_* vars) or ' +
            'by vite.config.js define.',
        );
    }
    return value;
}

export const projectId: string = required(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset: string = required(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'NEXT_PUBLIC_SANITY_DATASET',
);

export const apiVersion: string = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-05';

/**
 * Matches the pre-migration client exactly. The site reads freshly-published
 * CMS content immediately, which the content team relies on; turning this on
 * would be a behaviour change, not an optimisation. Revisit only alongside ISR.
 */
export const useCdn = false;
