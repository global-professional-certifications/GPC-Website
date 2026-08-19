import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) => {
    const { getClient } = context
    const client = getClient({ apiVersion: '2024-01-01' })

    return S.list()
        .title('Content')
        .items([
            // Blogs Folder
            S.listItem()
                .title('Blogs')
                .icon(() => '📝')
                .child(
                    S.list()
                        .title('Blogs')
                        .items([
                            S.listItem()
                                .title('Blog Posts')
                                .icon(() => '📰')
                                .schemaType('post')
                                .child(S.documentTypeList('post').title('Blog Posts')),

                            S.listItem()
                                .title('Authors')
                                .icon(() => '✍️')
                                .schemaType('author')
                                .child(S.documentTypeList('author').title('Authors')),

                            S.listItem()
                                .title('Categories')
                                .icon(() => '🏷️')
                                .schemaType('category')
                                .child(S.documentTypeList('category').title('Categories')),
                        ])
                ),

            S.divider(),

            // Success Stories - Hierarchical Structure
            S.listItem()
                .title('Success Stories')
                .icon(() => '🌟')
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
                                    .icon(() => '🏅')
                                    .id('wall-of-excellence')
                                    .child(
                                        S.list()
                                            .title('Wall of Excellence')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Wall Courses')
                                                    .icon(() => '📚')
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
                                                    .icon(() => '➕')
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
                                                    .icon(() => '📑')
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
                                                        .icon(() => '🎓')
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
                                                    .icon(() => '⚠️')
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
                                    .icon(() => '🎥')
                                    .id('video-testimonials-category')
                                    .child(
                                        S.list()
                                            .title('Video Testimonials by Course')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Video Courses')
                                                    .icon(() => '📚')
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
                                                    .icon(() => '⚠️')
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
                                                        .icon(() => '🎬')
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
                                    .icon(() => '💬')
                                    .id('written-testimonials-category')
                                    .child(
                                        S.list()
                                            .title('Written Testimonials by Course')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Written Courses')
                                                    .icon(() => '📚')
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
                                                    .icon(() => '⚠️')
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
                                                        .icon(() => '📖')
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
                                    .icon(() => '📱')
                                    .id('mobile-screenshots-category')
                                    .child(
                                        S.list()
                                            .title('Mobile Screenshots')
                                            .items([
                                                // Add New Course shortcut
                                                S.listItem()
                                                    .title('+ Add/Manage Mobile Courses')
                                                    .icon(() => '📚')
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
                                                    .icon(() => '🖼️')
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
                                                    .icon(() => '⚠️')
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

            // Upcoming Page Section
            S.listItem()
                .title('Upcoming Page')
                .icon(() => '📅')
                .child(
                    S.list()
                        .title('Upcoming Page')
                        .items([
                            S.listItem()
                                .title('Important Announcements')
                                .icon(() => '📢')
                                .child(
                                    S.documentTypeList('upcomingAnnouncement')
                                        .title('Important Announcements')
                                        .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                            S.listItem()
                                .title('Upcoming Batches')
                                .icon(() => '🎓')
                                .child(
                                    S.documentTypeList('upcomingBatch')
                                        .title('Upcoming Batches')
                                        .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                        ])
                ),

            S.divider(),

            // Events - Hierarchical Structure
            S.listItem()
                .title('Events')
                .icon(() => '🎉')
                .child(() =>
                    // Fetch years from past event documents (including legacy 'event' type)
                    client.fetch(`*[_type in ["pastEvent", "event"] && defined(year)] { year } | order(year desc)`).then((events: { year: number }[]) => {
                        const years: number[] = [...new Set(events.map((e) => e.year).filter((y): y is number => y !== null && y !== undefined))].sort((a, b) => b - a)

                        return S.list()
                            .title('Events')
                            .items([
                                // 1. Upcoming Events
                                S.listItem()
                                    .title('Upcoming Events')
                                    .icon(() => '⏳')
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
                                    .icon(() => '📜')
                                    .id('past-events')
                                    .child(
                                        S.list()
                                            .title('Past Events')
                                            .items([
                                                // Add new past event option
                                                S.listItem()
                                                    .title('+ Add New Past Event')
                                                    .icon(() => '➕')
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
                                                        .icon(() => '📁')
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

            // Notification Banner
            S.listItem()
                .title('Notification Banner')
                .icon(() => '🔔')
                .schemaType('notificationBanner')
                .child(
                    S.documentTypeList('notificationBanner')
                        .title('Notification Banner')
                        .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),

            S.divider(),

            // Company Marquees
            S.listItem()
                .title('Company Marquees')
                .icon(() => '🏢')
                .schemaType('marqueeLine')
                .child(S.documentTypeList('marqueeLine').title('Company Marquees')),

            S.divider(),

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
                .title('Data Maintenance')
                .icon(() => '🛠️')
                .child(
                    S.list()
                        .title('Data Maintenance')
                        .items([
                            S.listItem()
                                .title('Legacy Wall Formats (Needs Fix)')
                                .icon(() => '⚠️')
                                .child(
                                    S.documentList()
                                        .title('Entries with Single Reference (Fix by re-selecting course)')
                                        .schemaType('wallOfExcellence')
                                        .filter('_type == "wallOfExcellence" && defined(course._ref)')
                                ),
                            S.listItem()
                                .title('Stories Missing Thumbnail')
                                .icon(() => '🖼️')
                                .child(
                                    S.documentList()
                                        .title('Missing Thumbnails')
                                        .schemaType('successStory')
                                        .filter('_type == "successStory" && !defined(thumbnail)')
                                ),
                            S.listItem()
                                .title('Broken Course References')
                                .icon(() => '🔗')
                                .child(
                                    S.documentList()
                                        .title('Broken References')
                                        .filter('defined(course._ref) && !defined(*[_id == ^.course._ref][0])')
                                )
                        ])
                ),
        ])
}
