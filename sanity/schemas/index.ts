import author from './author'
import post from './post'
import successStory from './successStory'
import testimonialCourse from './testimonialCourse'
import category from './category'
import ebook from './ebook'
import course from './course'
import courseCategory from './courseCategory'
import popup from './popup'
import upcomingEvent from './upcomingEvent'
import pastEvent from './pastEvent'
import event from './event'


// Custom block content types
import inlineCTA from './blockContent/inlineCTA'
import youtube from './blockContent/youtube'
import table from './blockContent/table'
import faqSection from './blockContent/faqSection'

export const schemaTypes = [
    // Documents
    post,
    author,
    successStory,
    testimonialCourse,
    category,
    ebook,
    course,
    courseCategory,
    popup,
    upcomingEvent,
    pastEvent,
    event,

    // Custom block content
    inlineCTA,
    youtube,
    table,
    faqSection,
]


