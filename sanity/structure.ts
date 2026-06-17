import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) => {
    const { getClient } = context
    const client = getClient({ apiVersion: '2024-01-01' })

    return S.list()
        .title('Content')
        .items([
            // Blog Post
            S.listItem()
                .title('Blog Posts')
                .schemaType('post')
                .child(S.documentTypeList('post').title('Blog Posts')),

            // Author
            S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),

            S.divider(),

            // Success Stories - Hierarchical Structure
            S.listItem()
                .title('Success Stories')
                .child(() =>
                    client.fetch(`*[_type == "testimonialCourse"] | order(order asc) { _id, name, sections, category }`).then((courses) =>
                        S.list()
                            .title('Success Stories')
                            .items([
                                // ─── Page Settings ───
                                S.listItem()
                                    .title('Edit Section Titles')
                                    .icon(() => '⚙️')
                                    .child(
                                        S.document()
                                            .schemaType('successPageSettings')
                                            .documentId('successPageSettings')
                                            .title('Edit Section Titles')
                                    ),

                                // ─── Hero Section (carousel + caption) ───
                                S.listItem()
                                    .title('Hero Section')
                                    .icon(() => '🖼️')
                                    .child(
                                        S.document()
                                            .schemaType('successHero')
                                            .documentId('successHero')
                                            .title('Hero Section')
                                    ),

                                S.divider(),

                                // ─── Wall of Excellence Section ───
                                S.listItem()
                                    .title('Wall of Excellence')
                                    .id('wall-of-excellence')
                                    .child(
                                        S.list()
                                            .title('Wall of Excellence')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Wall Courses')
                                                    .child(
                                                        S.documentList()
                                                            .title('Manage Wall Courses')
                                                            .schemaType('testimonialCourse')
                                                            .filter('_type == "testimonialCourse" && category == "wallOfExcellence"')
                                                            .initialValueTemplates([
                                                                S.initialValueTemplateItem('testimonialCourse-wall')
                                                            ])
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),

                                                S.divider(),

                                                // + Add New Entry (all courses)
                                                S.listItem()
                                                    .title('+ Add New Entry')
                                                    .id('wall-add-new')
                                                    .schemaType('wallOfExcellence')
                                                    .child(
                                                        S.documentTypeList('wallOfExcellence')
                                                            .title('All Wall of Excellence Entries')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),

                                                // All Entries
                                                S.listItem()
                                                    .title('All Entries')
                                                    .id('wall-all')
                                                    .child(
                                                        S.documentList()
                                                            .title('All Wall of Excellence Entries')
                                                            .schemaType('wallOfExcellence')
                                                            .filter('_type == "wallOfExcellence"')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),

                                                S.divider(),

                                                // Course-wise sub-sections
                                                ...courses.filter((c: any) => c.category === 'wallOfExcellence' || (!c.category && (!c.sections || c.sections.includes('wallOfExcellence')))).map((course: { _id: string; name: string }) =>
                                                    S.listItem()
                                                        .title(course.name)
                                                        .id(`wall-${course._id}`)
                                                        .child(
                                                            S.documentList()
                                                                .title(`${course.name} — Wall of Excellence`)
                                                                .schemaType('wallOfExcellence')
                                                                .filter('_type == "wallOfExcellence" && ($courseId == course._ref || $courseId in course[]._ref)')
                                                                .params({ courseId: course._id })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                                .initialValueTemplates([
                                                                    S.initialValueTemplateItem('wallOfExcellence-with-course', {
                                                                        courseId: course._id,
                                                                    })
                                                                ])
                                                        )
                                                ),
                                                
                                                S.divider(),

                                                // Drafts / Unassigned
                                                S.listItem()
                                                    .title('⚠️ Drafts / Unassigned')
                                                    .id('wall-unassigned')
                                                    .child(
                                                        S.documentList()
                                                            .title('Unassigned Wall Entries')
                                                            .schemaType('wallOfExcellence')
                                                            .filter('_type == "wallOfExcellence" && !defined(course._ref) && (!defined(course) || count(course) == 0)')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                            ])
                                    ),

                                S.divider(),

                                // ─── Video Testimonials (Video Vault) ───
                                S.listItem()
                                    .title('Video Testimonials (Video Vault)')
                                    .id('video-testimonials-category')
                                    .child(
                                        S.list()
                                            .title('Video Testimonials by Course')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Video Courses')
                                                    .child(
                                                        S.documentList()
                                                            .title('Manage Video Courses')
                                                            .schemaType('testimonialCourse')
                                                            .filter('_type == "testimonialCourse" && category == "video"')
                                                            .initialValueTemplates([
                                                                S.initialValueTemplateItem('testimonialCourse-video')
                                                            ])
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                                S.divider(),
                                                // Drafts / Unassigned
                                                S.listItem()
                                                    .title('⚠️ Drafts / Unassigned')
                                                    .id('video-unassigned')
                                                    .child(
                                                        S.documentList()
                                                            .title('Unassigned Video Testimonials')
                                                            .schemaType('successStory')
                                                            .filter('_type == "successStory" && category == "video" && !defined(course._ref)')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                                ...courses.filter((c: any) => c.category === 'video' || (!c.category && (!c.sections || c.sections.includes('video')))).map((course: { _id: string; name: string }) =>
                                                    S.listItem()
                                                        .title(course.name)
                                                        .id(`video-${course._id}`)
                                                        .child(
                                                            S.documentList()
                                                                .title(`${course.name} - Video Testimonials`)
                                                                .schemaType('successStory')
                                                                .filter('_type == "successStory" && course._ref == $courseId && category == "video"')
                                                                .params({ courseId: course._id })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                                .initialValueTemplates([
                                                                    S.initialValueTemplateItem('successStory-with-course-and-category', {
                                                                        courseId: course._id,
                                                                        category: 'video'
                                                                    })
                                                                ])
                                                        )
                                                )
                                            ])
                                    ),

                                // ─── Written Testimonials (Read Journey) ───
                                S.listItem()
                                    .title('Written Testimonials (Read Journey)')
                                    .id('written-testimonials-category')
                                    .child(
                                        S.list()
                                            .title('Written Testimonials by Course')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Written Courses')
                                                    .child(
                                                        S.documentList()
                                                            .title('Manage Written Courses')
                                                            .schemaType('testimonialCourse')
                                                            .filter('_type == "testimonialCourse" && category == "written"')
                                                            .initialValueTemplates([
                                                                S.initialValueTemplateItem('testimonialCourse-written')
                                                            ])
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                                S.divider(),
                                                // Drafts / Unassigned
                                                S.listItem()
                                                    .title('⚠️ Drafts / Unassigned')
                                                    .id('written-unassigned')
                                                    .child(
                                                        S.documentList()
                                                            .title('Unassigned Written Testimonials')
                                                            .schemaType('successStory')
                                                            .filter('_type == "successStory" && category == "written" && !defined(course._ref)')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                                ...courses.filter((c: any) => c.category === 'written' || (!c.category && (!c.sections || c.sections.includes('written')))).map((course: { _id: string; name: string }) =>
                                                    S.listItem()
                                                        .title(course.name)
                                                        .id(`written-${course._id}`)
                                                        .child(
                                                            S.documentList()
                                                                .title(`${course.name} - Written Testimonials`)
                                                                .schemaType('successStory')
                                                                .filter('_type == "successStory" && course._ref == $courseId && category == "written"')
                                                                .params({ courseId: course._id })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                                .initialValueTemplates([
                                                                    S.initialValueTemplateItem('successStory-with-course-and-category', {
                                                                        courseId: course._id,
                                                                        category: 'written'
                                                                    })
                                                                ])
                                                        )
                                                )
                                            ])
                                    ),

                                // ─── Mobile Screenshots ───
                                S.listItem()
                                    .title('Mobile Screenshots')
                                    .id('mobile-screenshots-category')
                                    .child(
                                        S.list()
                                            .title('Mobile Screenshots')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Mobile Courses')
                                                    .child(
                                                        S.documentList()
                                                            .title('Manage Mobile Courses')
                                                            .schemaType('testimonialCourse')
                                                            .filter('_type == "testimonialCourse" && category == "image"')
                                                            .initialValueTemplates([
                                                                S.initialValueTemplateItem('testimonialCourse-image')
                                                            ])
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                                
                                                S.divider(),

                                                // All Entries
                                                S.listItem()
                                                    .title('All Mobile Screenshots')
                                                    .id('mobile-all')
                                                    .schemaType('successStory')
                                                    .child(
                                                        S.documentList()
                                                            .title('All Mobile Screenshots')
                                                            .schemaType('successStory')
                                                            .filter('_type == "successStory" && category == "image"')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),

                                                S.divider(),

                                                // Drafts / Unassigned
                                                S.listItem()
                                                    .title('⚠️ Drafts / Unassigned')
                                                    .id('image-unassigned')
                                                    .child(
                                                        S.documentList()
                                                            .title('Unassigned Mobile Screenshots')
                                                            .schemaType('successStory')
                                                            .filter('_type == "successStory" && category == "image" && !defined(course._ref)')
                                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                    ),
                                            ])
                                    ),
                            ])
                    )
                ),

            S.divider(),

            // Events - Hierarchical Structure
            S.listItem()
                .title('Events')
                .child(() =>
                    // Fetch years from past event documents
                    client.fetch(`*[(_type == "pastEvent" || _type == "event") && defined(year)] { year } | order(year desc)`).then((events: { year: number }[]) => {
                        const years: number[] = [...new Set(events.map((e) => e.year).filter((y): y is number => y !== null && y !== undefined))].sort((a, b) => b - a)

                        return S.list()
                            .title('Events')
                            .items([
                                // 1. Upcoming Events
                                S.listItem()
                                    .title('Upcoming Events')
                                    .id('upcoming-events')
                                    .schemaType('upcomingEvent')
                                    .child(
                                        S.documentTypeList('upcomingEvent')
                                            .title('Upcoming Events')
                                            .defaultOrdering([{ field: 'eventStartDateTime', direction: 'asc' }])
                                    ),

                                // 2. Past Events - with year subfolders
                                S.listItem()
                                    .title('Past Events')
                                    .id('past-events')
                                    .child(
                                        S.list()
                                            .title('Past Events')
                                            .items([
                                                // Add new past event option
                                                S.listItem()
                                                    .title('+ Add New Past Event')
                                                    .id('add-past-event')
                                                    .schemaType('pastEvent')
                                                    .child(
                                                        S.documentTypeList('pastEvent')
                                                            .title('Add Past Event')
                                                    ),

                                                S.divider(),

                                                // Year folders
                                                ...years.map((year: number) =>
                                                    S.listItem()
                                                        .title(`${year}`)
                                                        .id(`past-events-${year}`)
                                                        .child(
                                                            S.documentList()
                                                                .title(`${year} Events`)
                                                                .filter('(_type == "pastEvent" || _type == "event") && year == $year')
                                                                .params({ year })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                        )
                                                )
                                            ])
                                    ),
                            ])
                    })
                ),

            S.divider(),

            // Category
            S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),

            // Ebook
            S.listItem()
                .title('Ebooks')
                .schemaType('ebook')
                .child(S.documentTypeList('ebook').title('Ebooks')),

            // Course
            S.listItem()
                .title('Courses')
                .schemaType('course')
                .child(S.documentTypeList('course').title('Courses')),

            // Course Category
            S.listItem()
                .title('Course Categories')
                .schemaType('courseCategory')
                .child(S.documentTypeList('courseCategory').title('Course Categories')),

            // Popup
            S.listItem()
                .title('Popups')
                .schemaType('popup')
                .child(S.documentTypeList('popup').title('Popups')),

            // Company Marquees
            S.listItem()
                .title('Company Marquees')
                .schemaType('marqueeLine')
                .child(S.documentTypeList('marqueeLine').title('Company Marquees')),

            // Brochures (Parent Folder)
            S.listItem()
                .title('Brochures')
                .icon(() => '📁')
                .child(
                    S.list()
                        .title('Brochures')
                        .items([
                            S.listItem()
                                .title('CIA Brochure')
                                .icon(() => '📄')
                                .child(
                                    S.document()
                                        .schemaType('brochure')
                                        .documentId('cia-brochure')
                                        .title('CIA Brochure')
                                ),
                            S.listItem()
                                .title('CISA Brochure')
                                .icon(() => '📄')
                                .child(
                                    S.document()
                                        .schemaType('brochure')
                                        .documentId('cisa-brochure')
                                        .title('CISA Brochure')
                                ),
                            S.listItem()
                                .title('IAP Brochure')
                                .icon(() => '📄')
                                .child(
                                    S.document()
                                        .schemaType('brochure')
                                        .documentId('iap-brochure')
                                        .title('IAP Brochure')
                                ),
                            S.divider(),
                            S.listItem()
                                .title('All Brochures')
                                .icon(() => '📚')
                                .child(
                                    S.documentTypeList('brochure')
                                        .title('All Course Brochures')
                                )
                        ])
                ),

            S.divider(),

            // ─── Data Maintenance (Future Proofing) ───
            S.listItem()
                .title('🛠️ Data Maintenance')
                .child(
                    S.list()
                        .title('Data Maintenance')
                        .items([
                            S.listItem()
                                .title('Legacy Wall Formats (Needs Fix)')
                                .child(
                                    S.documentList()
                                        .title('Entries with Single Reference (Fix by re-selecting course)')
                                        .schemaType('wallOfExcellence')
                                        .filter('_type == "wallOfExcellence" && defined(course._ref)')
                                ),
                            S.listItem()
                                .title('Stories Missing Thumbnail')
                                .child(
                                    S.documentList()
                                        .title('Missing Thumbnails')
                                        .schemaType('successStory')
                                        .filter('_type == "successStory" && !defined(thumbnail)')
                                ),
                            S.listItem()
                                .title('Broken Course References')
                                .child(
                                    S.documentList()
                                        .title('Broken References')
                                        .filter('defined(course._ref) && !defined(*[_id == ^.course._ref][0])')
                                )
                        ])
                ),
        ])
}
