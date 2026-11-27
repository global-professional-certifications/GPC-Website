/**
 * GROQ queries used by /success.
 */

const EXCEPTIONAL_FIELDS = `{
    _id,
    name,
    photo,
    certification,
    partsCleared,
    monthsToClear,
    country,
    company,
    designation,
    quote
}`;

/** Fast-track achievers ("Some exceptional performances by our candidates"). */
export const EXCEPTIONAL_QUERY = `*[_type == "exceptionalPerformer"] | order(order asc, monthsToClear asc) ${EXCEPTIONAL_FIELDS}`;


/** "Our Global Candidates": first 8 by display order (first one is featured). */
export const GLOBAL_CANDIDATES_QUERY = `*[_type == "globalCandidate"] | order(order asc, _createdAt asc) [0...8] {
    _id,
    name,
    photo,
    company,
    designation,
    country,
    certification
}`;
