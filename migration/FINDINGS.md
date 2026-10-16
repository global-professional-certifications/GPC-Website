# Pre-migration findings

Measured against production on 2026-09-18 via `migration/capture-baseline.js`.
Raw capture: `migration/baseline/prod.json`.

These are behaviours the Vite + React Router site has *today* that a default
Next.js install would change. Each one is a way ad traffic can die without
throwing an error anywhere we'd notice.

---

## 1. CRITICAL — URLs are case-insensitive today, and would not be

React Router matches case-insensitively by default (`caseSensitive: false`).
Verified directly against the installed `react-router-dom` using the real route
tree, not inferred from docs:

```
/about                 -> AboutUs
/About                 -> AboutUs
/ABOUT                 -> AboutUs
/Courses/CIA           -> Cia
/CIA-Enrollment        -> CiaEnrolmentLandingPage   <-- campaign route
```

Next.js filesystem routing is **case-sensitive**. Every one of the above becomes
a hard 404 on cutover.

The campaign line is the dangerous one. `/CIA-Enrollment` is a paid landing page.
We do not control the creative that links to it and cannot re-issue live ads, so
if any of it uses non-lowercase, that spend lands on a 404 page and nothing in
the build, the tests, or the deploy logs would say so.

**Mitigation:** `middleware.js` that 308-redirects any path containing uppercase
to its lowercase form. A 308 preserves both the request method and the query
string, so UTM/gclid parameters survive the hop. This turns today's
`200 render` into `308 -> 200 render`, which is safe and additionally
consolidates SEO link equity onto one canonical casing.

**Do not** solve this by creating duplicate uppercase route directories.

## 2. Trailing slashes resolve today

`/about/`, `/courses/cia/` and `/cia-enrollment/` all render. Next.js with the
default `trailingSlash: false` 308-redirects these to the un-slashed form.

Verified that a 308 preserves the query string, so campaign parameters survive.
This is acceptable and needs no special handling — but it is a redirect where
there was none, so it must be confirmed in the preview rather than assumed.

## 3. Unmatched routes return 200 today, not 404

The Vercel SPA fallback serves `index.html` with a **200** for any unmatched
path; React Router then renders `NotFound` client-side. So every 404 on this site
is currently a soft 404.

Under Next.js, `not-found.js` returns a real **404**.

This is a genuine improvement for SEO, but it is a behaviour change worth naming:
any URL that is currently "working" in analytics only because the SPA fallback
returns 200 will start reporting as a hard 404. That is the correct outcome, but
it may show up as a spike in 404s in Search Console shortly after cutover. Not a
regression.

## 4. SEO is entirely client-side today

`react-helmet-async` writes the title, description, canonical, OG tags and
JSON-LD **after hydration**. The served HTML carries only the static
`index.html` head, identical on all 29 routes.

Consequence for the baseline: the `head` fields captured from production are
near-empty by design. When comparing against the Next.js build, those fields
getting *richer* is the win we are making, not a diff to fix. Only the status
codes, redirect chains and query handling are strict equality checks.

## 5. `/CRMA-Brochure.pdf` already 404s — pre-existing, not ours

The Vercel rewrite fires correctly and reaches our handler; the handler returns
its own message:

> Brochure file for "crma" not found in Sanity.

So the `/:course-Brochure.pdf` -> `/api/brochure?course=:course` rewrite chain
works. There is simply no `crma` brochure document in the CMS. `/CIA-Brochure.pdf`
and `/CISA-Brochure.pdf` both resolve and 302 to Sanity-hosted PDFs.

Flagged for the content team; explicitly **out of scope** for this migration. The
migration must preserve the mechanism, not fix the missing document.

## 6. Clean on React 19 compatibility

Scanned for every React 19 removal that would bite: no `defaultProps` on function
components, no `propTypes`, no `findDOMNode`, no legacy `ReactDOM.render`, no
string refs. The only `react-dom/client` usage is the `createRoot` call in
`main.jsx`, which the migration replaces anyway.

Upgrading React 18.3.1 -> 19 alongside Next.js 15 carries no identified blocker.

## 7. Four dependencies are installed but never imported

`react-quill`, `styled-components`, `dompurify`, `react-gtm-module` — zero import
sites across `src/`. Safe to drop; doing so during the migration since the
dependency list is being rewritten regardless.

(GTM is loaded by hand-rolled script in `index.html`, not via `react-gtm-module`.
That script must be carried over to `next/script`.)

---

## Browser-only code that needs a client boundary

| Library | Files | Note |
|---|---|---|
| `intl-tel-input` | `EnquireStickyDrawer`, both landing pages | Touches `window` on mount |
| `react-slick` | `EventCarousel`, both landing pages | Needs measured DOM |
| `canvas-confetti` | `CelebrationOverlay`, `Journey` | `document`-dependent |
| `motion` | app-wide via `LazyMotion` | Client provider |

30 files reference `window`/`document`/`localStorage`; 4 already guard with
`typeof window`.

## The Zoho forms are the most fragile thing here

The enquiry and both campaign forms submit via a **native form POST targeting a
hidden iframe** — deliberately not `fetch`. There is a comment in
`CiaEnrolmentLandingPage.jsx` recording why: Zoho's endpoint rejects XHR-style
submissions.

These must be ported **verbatim**. Do not "modernise" them into a fetch call or a
server action. They are lead capture for paid campaigns — a silent failure here
costs real money and would not surface as an error.

---

# Found during verification (Phase 6)

Both of these were caught by `compare.js` diffing the Next.js build against the
production capture. Neither would have failed a build, shown an error, or
looked wrong in a browser.

## 8. CRITICAL (fixed) — every brochure URL served the CIA brochure

A Next.js rewrite does **not** expose its destination's query string to a route
handler. Measured against a running production build, a request to
`/CISA-Brochure.pdf` rewritten to `/api/brochure?course=cisa` arrived as:

```
request.url                 "http://host/CISA-Brochure.pdf"
nextUrl.search              ""
searchParams.get('course')  null
```

So `course` fell through to its `'cia'` default on every request:

| URL | Production | Next.js (before fix) |
|---|---|---|
| `/CIA-Brochure.pdf` | `adf232c1…` | `adf232c1…` ok |
| `/CISA-Brochure.pdf` | `dc579a6d…` | `adf232c1…` **wrong PDF** |
| `/CRMA-Brochure.pdf` | 404 | `adf232c1…` **should 404** |

This differs from the pre-migration setup, where Vercel handled the rewrite at
the platform layer before the function ran, so the function did see the
rewritten query.

It is the nastiest class of bug this migration could produce: a healthy `302`,
a real PDF, no error anywhere. Someone requesting the CISA brochure silently
received the CIA one.

**Fix:** `app/api/brochure/route.js` now derives the course from the request
path (`/([^/]+)-Brochure\.pdf`) and falls back to `?course=` for direct API
calls. Independent of rewrite query behaviour. All four brochure URLs now match
production exactly, including the CRMA 404.

## 9. Blog metadata rendered after `</head>` — fixed by prerendering

Dynamically-rendered routes stream their metadata into the body. On
`/blogs/[slug]`, `</head>` closed at byte 5,073 while `<title>` arrived at byte
55,409.

React 19 and browsers hoist those tags, and Google executes JS so it sees them
— but link unfurlers (Slack, WhatsApp, LinkedIn, Facebook) parse `<head>` only
and never run scripts. Open Graph tags below the fold are invisible to exactly
the clients they exist for.

Not a regression — pre-migration these tags were client-only, so unfurlers
never saw them either — but it would have silently forfeited one of the main
wins of the migration.

**Fix:** `generateStaticParams()` prerenders every published post, so metadata
resolves at build time and lands in `<head>` (now byte 3,321, before `</head>`
at 6,842). `revalidate = 3600` refreshes it hourly; `dynamicParams` stays on so
posts published after a build still render on demand. Article content is still
fetched client-side on every load, so editors keep seeing changes immediately —
the hour applies only to the title and OG tags.

The capture script was also truncating at `</head>`, which reported these tags
as *absent* rather than *misplaced*. It now scans the whole document and records
an `inHead` flag per tag, so this class of problem is visible rather than
disguised as a different one.

## Verification result

`node migration/compare.js migration/baseline/prod.json migration/baseline/next-local.json`

```
REGRESSIONS      0
EXPECTED CHANGES 1   soft 404 -> real 404
WARNINGS         9   trailing-slash and lowercase redirects (findings #1, #2)
IMPROVEMENTS   147   metadata now server-rendered
```

Campaign path confirmed end to end:
`/CIA-Enrollment?utm_source=google&utm_medium=cpc&gclid=ABC123`
→ 308 → `/cia-enrollment?utm_source=google&utm_medium=cpc&gclid=ABC123` → 200,
every parameter intact.
