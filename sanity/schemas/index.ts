import author from './author'
import post from './post'
import successStory from './successStory'
import category from './category'
import ebook from './ebook'
import course from './course'
import courseCategory from './courseCategory'
import popup from './popup'

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
    category,
    ebook,
    course,
    courseCategory,
    popup,

    // Custom block content
    inlineCTA,
    youtube,
    table,
    faqSection,
]


