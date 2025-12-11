<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { client } from '../../lib/sanity/client'
import { getPostBySlug, getRecentPosts } from '../../lib/sanity/queries'
import { urlFor } from '../../lib/sanity/imageBuilder'
import PortableTextRenderer from './PortableTextRenderer'

const BlogPage = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const postData = await client.fetch(getPostBySlug, { slug })
                setPost(postData)
                
                // Fetch related posts (recent posts for now, excluding current)
                const recent = await client.fetch(getRecentPosts)
                setRelatedPosts(recent.filter(p => p.slug.current !== slug))
            } catch (error) {
                console.error("Error fetching blog data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [slug])

    if (loading) {
        return (
            <div className='relative min-h-screen w-full flex justify-center items-center'>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple"></div>
            </div>
        )
    }

    if (!post) {
=======
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogs } from '../Blogs/BlogContent.jsx'
import { NavLink } from 'react-router-dom'



const BlogPage = () => {
    const { slug } = useParams()
    const blog = blogs.find((b) => b.slug === slug)

    if (!blog) {
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
        return (
            <p className="text-center mt-32 text-2xl font-semibold text-red-600">
                Blog not found
            </p>
        )
    }

<<<<<<< HEAD
    const {
        title,
        author = '',
        mainImage,
        publishedAt,
        body,
        authorImage,
        authorBio
    } = post

    const date = new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    })
=======
    const bannerHeight = 20
    const {
        title,
        author = '',
        cover = '',
        date = '',
        content = '',
        authorImage
    } = blog
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1

    return (
        <>
            <div className="relative min-h-screen w-full">
                <div class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                <div className='flex flex-col justify-start mt-36 mx-6 md:mx-52 lg:mx-52 px-4 md:px-24 lg:px-24'>

                    {/* Blog Title */}
                    <h1 className='text-3xl font-bold py-4'>{title}</h1>

                    {/* Date And Author */}
                    <div className='flex justify-start items-center gap-12 mt-4'>
                        <div className='flex justify-center items-center gap-2'>
                            <FontAwesomeIcon icon={faCalendarDays} className='text-blue-400' />
                            <div className='text-gray-600'>{date}</div>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <FontAwesomeIcon icon={faUser} className='text-blue-400' />
                            <div className='text-gray-600'>{author}</div>
                        </div>
                    </div>

                    {/* Blog Cover Image */}
                    <div className='mt-4'>
<<<<<<< HEAD
                        {mainImage && <img src={urlFor(mainImage).url()} alt="Blog Cover" className='w-full max-h-[480px] object-cover rounded-xl' />}
=======
                        {cover && <img src={cover} alt="Blog Cover" className='w-full max-h-[480px] object-cover rounded-xl' />}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                    </div>

                    {/* Blog Content */}
                    <div className='text-lg md:text-xl lg:text-xl text-gray-800 mt-12'>
<<<<<<< HEAD
                        <PortableTextRenderer value={body} />
=======
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-6" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-5" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold my-4" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-lg font-semibold my-3" {...props} />,
                                p: ({ node, ...props }) => <p className="text-lg leading-relaxed my-3" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-8 my-4 space-y-2" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal pl-8 my-4 space-y-2" {...props} />,
                                li: ({ node, ...props }) => <li className="text-lg" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                a: ({ node, ...props }) => (
                                    <a className="text-brand-blue underline" target="_blank" rel="noopener noreferrer" {...props} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                    </div>

                    {/* Author Details */}
                    <div className='my-6 md:my-12 lg:my-12 bg-gray-200 rounded-lg px-6 md:px-16 lg:px-16 py-10 flex flex-col md:flex-row lg:flex-row justify-center items-center gap-12'>
                        <div className='w-20 h-20 md:w-28 md:h-28 lg:w-28 lg:h-28 rounded-full overflow-hidden flex-shrink-0'>
<<<<<<< HEAD
                            {authorImage && <img src={urlFor(authorImage).url()} alt={author} className='w-full h-full object-cover' />}
=======
                            <img src={authorImage} alt={author} className='w-full h-full object-cover' />
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                        </div>

                        <div className='flex flex-col justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start gap-1'>
                            <p className='text-base text-gray-600'>Written By</p>
                            <p className='text-xl font-semibold'>{author}</p>
                            <p className='text-xs md:text-sm lg:text-sm text-center md:text-left lg:text-left text-gray-600 mt-6'>
<<<<<<< HEAD
                                {authorBio || "Arpit Garg (CA, CIA, CRMA, CISA) is an IIA-recognized faculty and partner at RiskMan. He has pioneered CIA education in India, training over 1,500 audit professionals and students in the last 5 years."}
=======
                                Arpit Garg (CA, CIA, CRMA, CISA) is an IIA-recognized faculty and partner at RiskMan.
                                He has pioneered CIA education in India, training over 1,500 audit professionals and students in the last 5 years.
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                            </p>
                        </div>
                    </div>


                </div>

                {/* Related Blogs */}
                <div className='mt-12 px-24 hidden md:block lg:block'>
                    <h3 className='text-3xl font-bold'>Related Blogs</h3>
                    <div className='grid grid-cols-3 gap-4 my-12'>
<<<<<<< HEAD
                        {relatedPosts
                            .slice(0, 3)
                            .map((related) => (
                                <div
                                    key={related._id}
                                    className="bg-white flex flex-col p-4 rounded-2xl border-gray-300 border shadow-xl"
                                >
                                    <img
                                        src={related.mainImage ? urlFor(related.mainImage).url() : ''}
=======
                        {blogs
                            .filter((b) => b.slug !== slug)
                            .slice(0, 3)
                            .map((related) => (
                                <div
                                    key={related.id}
                                    className="bg-white flex flex-col p-4 rounded-2xl border-gray-300 border shadow-xl"
                                >
                                    <img
                                        src={related.cover}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                        alt={related.title}
                                        className="w-full h-44 object-cover rounded-xl"
                                    />
                                    <div className='flex flex-col justify-between h-52'>
                                        <div className="pt-6 flex flex-col">
                                            <h3 className="text-lg font-semibold leading-tight text-gray-800 mb-2 line-clamp-3">
                                                {related.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2">
<<<<<<< HEAD
                                                {related.excerpt}
=======
                                                {related.content}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                            </p>

                                        </div>
                                        <Link
<<<<<<< HEAD
                                            key={related._id}
                                            to={`/blogs/${related.slug.current || related.slug}`}
                                            className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit"
                                        >
                                            <span className="text-base pl-2 text-gray-700">
                                                Read Full Blog
=======
                                            key={related.id}
                                            to={`/blogs/${related.slug}`}
                                            className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit"
                                        >
                                            <span className="text-base pl-2 text-gray-700">
                                                Learn More
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                            </span>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-sm bg-brand-blue h-4 w-4 rounded-full p-2' />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <NavLink to="/blogs" className="flex justify-center items-center mb-12">
                    <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                        Read More Blogs
                    </button>
                </NavLink>
            </div>
        </>
    )
}

export default BlogPage
