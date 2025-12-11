import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
<<<<<<< HEAD
import { client } from '../../lib/sanity/client'
import { getAllPosts } from '../../lib/sanity/queries'
import { urlFor } from '../../lib/sanity/imageBuilder'
=======
import { blogs } from "../Blogs/BlogContent.jsx";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
import iiaBlog from '../../assets/iia-blog-thumbnail.jpg'



const BlogList = () => {

<<<<<<< HEAD
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch(getAllPosts)
                setPosts(data)
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className='relative min-h-screen w-full flex justify-center items-center'>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple"></div>
            </div>
        )
    }

    const featured = posts[0]
    const right = posts.slice(1, 4)
    const others = posts.slice(4)
=======
    const featured = blogs[0]
    const right = blogs.slice(1, 4)
    const others = blogs.slice(4)
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1



    return (
        <div className='relative min-h-screen w-full'>
            <div class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            <div className="mt-20 pb-20 pt-32 px-6 lg:px-52 mx-auto">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="md:text-5xl lg:text-5xl text-3xl font-extrabold text-gray-900 mb-6">
                        Blog & Expert Insights
                    </h1>
                    <p className="md:text-lg lg:text-lg text-base text-gray-500 max-w-lg mt-3 mb-20 text-poppins">
                        Stay updated with the latest tips, trends, and success stories in audit, risk management, and professional certifications.
                    </p>
                </div>

                {/* Featured */}

                <p className='text-3xl font-semibold px-6 mb-4'>Featured Blog</p>

                <div className='flex flex-col justify-center items-start gap-6 p-4 bg-white rounded-2xl border-gray-300 border shadow-xl mb-20'>

                    <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10'>

                        <img src={iiaBlog} alt="" className='h-44 lg:h-56 w-full  md:object-cover rounded-xl' />

                        <div className='flex flex-col gap-4 justify-start items-start'>
                            <p className='text-xl lg:text-2xl leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 line-clamp-4'>
                                Accelerate Your Audit Career with the CIA Challenge Exam: A Strategic Guide for Internal Audit Professionals
                            </p>

                            <p className='text-gray-500 lg:text-base text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-2'>
                                In today’s dynamic corporate environment, internal auditors are expected to be more than compliance checkers — they’re strategic advisors, risk managers, and governance experts. For qualified professionals in India, the CIA Challenge Exam offers a fast-track route to earn the Certified Internal Auditor (CIA) designation, the only globally recognized certification for internal auditors.
                            </p>
                            <Link
                                to="https://delhi.iiaindia.co/accelerate-your-audit-career-with-the-cia-challenge-exam-a-strategic-guide-for-internal-audit-professionals/"
                                target='_blank'
                                className="inline-flex justify-start items-center gap-1.5 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                            >
                                <span className="md:text-base text-sm pl-2 text-gray-700">
                                    Learn More
                                </span>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2' />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row lg:flex-row justify-start items-stretch gap-6 w-full h-full'>

                    {/* Featured Blog */}
                    <div className='w-full md:w-[50%] lg:w-[50%] flex flex-col justify-between'>
                        {featured && (
<<<<<<< HEAD
                            <Link to={`/blogs/${featured.slug?.current || featured.slug}`} className="group block bg-white h-full overflow-hidden p-4 rounded-2xl border-gray-300 border shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                                <img
                                    src={featured.mainImage ? urlFor(featured.mainImage).url() : ''}
=======
                            <div className="bg-white h-full overflow-hidden p-4 rounded-2xl border-gray-300 border shadow-xl">
                                <img
                                    src={featured.cover}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                    alt={featured.title}
                                    className="w-full md:h-80 lg:h-80 h-44 object-cover rounded-xl"
                                />
                                <div className='flex flex-col justify-between h-auto'>
                                    <div className="pt-8 flex-1 pb-0 flex flex-col justify-between">
<<<<<<< HEAD
                                        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-4 group-hover:text-brand-blue group-hover:underline">
                                            {featured.title}
                                        </h2>
                                        <div className="text-gray-500 text-base line-clamp-3 mb-8">
                                            {featured.excerpt}
                                        </div>
                                    </div>
                                    <div className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit">
                                        <span className="text-base pl-2 text-gray-700">
                                            Read Full Blog
                                        </span>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-sm bg-brand-blue h-4 w-4 rounded-full p-2' />
                                    </div>
                                </div>
                            </Link>
=======
                                        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-4">
                                            {featured.title}
                                        </h2>
                                        <div className="text-gray-500 text-base line-clamp-3 mb-8">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {featured.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    <Link
                                        key={featured.id}
                                        to={`/blogs/${featured.slug}`}
                                        className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                                    >
                                        <span className="text-base pl-2 text-gray-700">
                                            Learn More
                                        </span>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-sm bg-brand-blue h-4 w-4 rounded-full p-2' />
                                    </Link>
                                </div>
                            </div>
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                        )}
                    </div>

                    {/* Right Blogs */}
                    <div className='w-full md:w-[50%] lg:w-[50%] flex flex-col justify-between h-full'>
                        <div className="flex flex-col justify-between gap-4 ">
                            {right.map((blogs) => (
<<<<<<< HEAD
                                <Link
                                    key={blogs._id}
                                    to={`/blogs/${blogs.slug.current || blogs.slug}`}
                                    className="group bg-white flex justify-start h-1/2 p-4 rounded-2xl border-gray-300 border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <img
                                        src={blogs.mainImage ? urlFor(blogs.mainImage).url() : ''}
=======
                                <div
                                    key={blogs.id}
                                    className="bg-white flex justify-start h-1/2 p-4 rounded-2xl border-gray-300 border shadow-xl"
                                >
                                    <img
                                        src={blogs.cover}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                        alt={blogs.title}
                                        className="md:w-44 md:h-44 lg:w-44 lg:h-44 w-24 h-24 object-cover rounded-xl"
                                    />
                                    <div className="pl-6 flex flex-col justify-start gap-2 md:gap-0 lg:gap-0 md:justify-between lg:justify-between h-28 md:h-44 lg:h-44">
                                        <div>
<<<<<<< HEAD
                                            <h3 className="text-sm md:text-lg lg:text-lg leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-brand-blue group-hover:underline">
                                                {blogs.title}
                                            </h3>
                                            <div className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-1 md:line-clamp-2 lg:line-clamp-2">
                                                {blogs.excerpt}
                                            </div>
                                        </div>
                                        <div className="inline-flex justify-start items-center gap-1.5 p-1 border border-brand-purple rounded-full w-fit">
                                            <span className="md:text-base text-sm pl-2 text-gray-700">
                                                    Read Full Blog
                                                </span>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2' />
                                        </div>
                                    </div>
                                </Link>
=======
                                            <h3 className="text-sm md:text-lg lg:text-lg leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3">
                                                {blogs.title}
                                            </h3>
                                            <div className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-1 md:line-clamp-2 lg:line-clamp-2">
                                                {blogs.content}
                                            </div>
                                        </div>
                                        <Link
                                            key={blogs.id}
                                            to={`/blogs/${blogs.slug}`}
                                            className="inline-flex justify-start items-center gap-1.5 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                                        >
                                            <span className="md:text-base text-sm pl-2 text-gray-700">
                                                Learn More
                                            </span>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2' />
                                        </Link>
                                    </div>
                                </div>
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom blogs */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 pb-20 ">
                    {others.map((blogs) => (
<<<<<<< HEAD
                        <Link
                            key={blogs._id}
                            to={`/blogs/${blogs.slug.current || blogs.slug}`}
                            className="group bg-white flex flex-col p-4 rounded-2xl border-gray-300 border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <img
                                src={blogs.mainImage ? urlFor(blogs.mainImage).url() : ''}
=======
                        <div
                            key={blogs.id}
                            className="bg-white flex flex-col p-4 rounded-2xl border-gray-300 border shadow-xl"
                        >
                            <img
                                src={blogs.cover}
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                                alt={blogs.title}
                                className="w-full h-24 md:h-44 object-cover rounded-xl"
                            />
                            <div className='flex flex-col justify-between h-38 md:h-52 lg:h-52 gap-2 md:gap-0 lg:gap-0'>
                                <div className="pt-6 flex flex-col">
<<<<<<< HEAD
                                    <h3 className="text-sm md:text-lg lg:text-lg leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-brand-blue group-hover:underline">
                                        {blogs.title}
                                    </h3>
                                    <p className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-2 md:line-clamp-2 lg:line-clamp-2">
                                        {blogs.excerpt}
                                    </p>

                                </div>
                                <div className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit">
                                    <span className="md:text-base text-sm pl-2 text-gray-700">
                                        Read Full Blog
                                    </span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2' />
                                </div>
                            </div>
                        </Link>
=======
                                    <h3 className="text-sm md:text-lg lg:text-lg leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3">
                                        {blogs.title}
                                    </h3>
                                    <p className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-2 md:line-clamp-2 lg:line-clamp-2">
                                        {blogs.content}
                                    </p>

                                </div>
                                <Link
                                    key={blogs.id}
                                    to={`/blogs/${blogs.slug}`}
                                    className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                                >
                                    <span className="md:text-base text-sm pl-2 text-gray-700">
                                        Learn More
                                    </span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2' />
                                </Link>
                            </div>
                        </div>
>>>>>>> d77435c043d0530e142937c431fe8582c041fcd1
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogList

