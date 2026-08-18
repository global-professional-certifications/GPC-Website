import author from './author'
import post from './post'
import successStory from './successStory'
import testimonialCourse from './testimonialCourse'
import category from './category'
import upcomingEvent from './upcomingEvent'
import pastEvent from './pastEvent'
import wallOfExcellence from './wallOfExcellence'
import successPageSettings from './successPageSettings'
import successHero from './successHero'
import marqueeLine from './marqueeLine'
import brochure from './brochure'
import upcomingAnnouncement from './upcomingAnnouncement'
import upcomingBatch from './upcomingBatch'
import notificationBanner from './notificationBanner'


// Custom block content types
import inlineCTA from './blockContent/inlineCTA'
import youtube from './blockContent/youtube'
import table from './blockContent/table'
import faqSection from './blockContent/faqSection'
import tableOfContents from './blockContent/tableOfContents'
import latex from './blockContent/latex'

export const schemaTypes = [
    // Documents
    post,
    author,
    successStory,
    testimonialCourse,
    category,
    upcomingEvent,
    pastEvent,
    wallOfExcellence,
    successPageSettings,
    successHero,
    marqueeLine,
    brochure,
    upcomingAnnouncement,
    upcomingBatch,
    notificationBanner,

    // Custom block content
    inlineCTA,
    youtube,
    table,
    faqSection,
    tableOfContents,
    latex,
]



