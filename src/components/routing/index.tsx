/**
 * Routing compatibility layer for the Next.js migration.
 *
 * Components import Link/NavLink from here instead of 'react-router-dom'. The
 * two exports below preserve react-router's prop API on top of next/link so the
 * framework swap lands as an import-line change rather than a rewrite of every
 * anchor in the codebase.
 *
 * Hooks are intentionally NOT re-exported. Their Next.js equivalents differ
 * enough that a shim would hide the differences rather than resolve them, and
 * there are few enough call sites to convert each by hand:
 *
 *   useLocation()    -> usePathname() from next/navigation           (5 sites)
 *   useParams()      -> the `params` prop, or useParams()            (1 site)
 *   useSearchParams()-> next/navigation's, which returns a READ-ONLY
 *                       URLSearchParams rather than react-router's
 *                       [params, setParams] tuple                    (2 sites)
 *   useNavigate()    -> useRouter().push() from next/navigation      (0 live sites)
 *
 * The useSearchParams difference is the one that bites: destructuring
 * `const [searchParams, setSearchParams] = useSearchParams()` against the Next
 * version does not throw, it just yields undefined. Any page using it also
 * needs a <Suspense> boundary or Next opts the whole route out of static
 * rendering.
 */

export { default as Link } from './Link';
export { default as NavLink } from './NavLink';
