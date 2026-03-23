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
                    client.fetch(`*[_type == "testimonialCourse"] | order(order asc) { _id, name }`).then((courses) =>
                        S.list()
                            .title('Success Stories')
                            .items([
                                // Add New Course
                                S.listItem()
                                    .title('Add New Course')
                                    .child(
                                        S.documentTypeList('testimonialCourse')
                                            .title('Manage Courses')
                                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
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
                                                ...courses.map((course: { _id: string; name: string }) =>
                                                    S.listItem()
                                                        .title(course.name)
                                                        .id(`wall-${course._id}`)
                                                        .child(
                                                            S.documentList()
                                                                .title(`${course.name} — Wall of Excellence`)
                                                                .schemaType('wallOfExcellence')
                                                                .filter('_type == "wallOfExcellence" && course._ref == $courseId')
                                                                .params({ courseId: course._id })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                                .initialValueTemplates([
                                                                    S.initialValueTemplateItem('wallOfExcellence-with-course', {
                                                                        courseId: course._id,
                                                                    })
                                                                ])
                                                        )
                                                ),
                                            ])
                                    ),

                                S.divider(),

                                // Dynamic Course Items (existing testimonials)
                                ...courses.map((course: { _id: string; name: string }) =>
                                    S.listItem()
                                        .title(course.name)
                                        .id(course._id)
                                        .child(
                                            S.list()
                                                .title(course.name)
                                                .items([
                                                    // Video Testimonials
                                                    S.listItem()
                                                        .title('Video Testimonials')
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
                                                        ),

                                                    // Written Testimonials
                                                    S.listItem()
                                                        .title('Written Testimonials')
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
                                                        ),

                                                    // Mobile Screenshots
                                                    S.listItem()
                                                        .title('Mobile Screenshots')
                                                        .child(
                                                            S.documentList()
                                                                .title(`${course.name} - Mobile Screenshots`)
                                                                .schemaType('successStory')
                                                                .filter('_type == "successStory" && course._ref == $courseId && category == "image"')
                                                                .params({ courseId: course._id })
                                                                .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                                                .initialValueTemplates([
                                                                    S.initialValueTemplateItem('successStory-with-course-and-category', {
                                                                        courseId: course._id,
                                                                        category: 'image'
                                                                    })
                                                                ])
                                                        ),
                                                ])
                                        )
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
        ])
}
