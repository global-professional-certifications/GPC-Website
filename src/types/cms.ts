/**
 * Loosely-typed CMS payloads.
 *
 * Sanity documents reach these components as plain JSON whose shape is defined
 * by a GROQ projection at the call site, not by any schema TypeScript can see.
 * Until those projections are typed (see below), component state that holds
 * them is annotated with `CmsData` rather than a guessed interface.
 *
 * It is deliberately `any`, and deliberately named. A hand-written interface
 * per projection would look stronger while being no more accurate -- and a
 * wrong interface is worse than an honest `any`, because it invites code to
 * trust fields that may not be there. Naming it makes every such site greppable
 * for the pass that tightens them.
 *
 * Why the annotation is needed at all: `useState([])` infers `never[]`, so any
 * later `posts.map(p => p._id)` fails with "Property '_id' does not exist on
 * type 'never'". The annotation restores the behaviour these components had as
 * .jsx without changing a line of their logic.
 *
 * To tighten: give the GROQ query a type parameter
 * (`client.fetch<Post[]>(query)`), derive the interface from the projection,
 * then replace `CmsData` at the call sites it feeds. Do it per query, not all
 * at once.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CmsData = any;

/** Convenience alias for state holding a list of CMS documents. */
export type CmsList = CmsData[];

/**
 * Permissive props bag for presentational components.
 *
 * Used where a component destructures props with literal defaults
 * (`({ items = [], active = null })`). TypeScript infers those defaults
 * structurally -- `[]` becomes `never[]` -- so `items[0].id` then fails with
 * "Property 'id' does not exist on type 'never'", even though the component
 * worked fine as .jsx and nothing about it changed.
 *
 * Annotating the parameter restores the original behaviour without editing the
 * destructuring or the defaults themselves.
 *
 * Same trade-off as CmsData: honest and greppable beats a guessed interface.
 * Replace per component when its real prop shape is worth writing down.
 */
export type ComponentProps = Record<string, CmsData>;
