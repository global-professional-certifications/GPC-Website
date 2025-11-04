import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { blogs } from "../Blogs/BlogContent.jsx";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const BlogList = () => {
    // const [blogs, setBlogs] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:1338/api/blogs?populate=*')
    //         .then((res) => {
    //             setBlogs(res.data.data || [])
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             console.error('Error fetching blogs:', err)
    //             setError(err)
    //             setLoading(false)
    //         })
    // }, [])

    // const getImage = (blog) => {
    //     const url = blog.cover?.url
    //     return url ? `http://localhost:1338${url}` : cover
    // }

    // if (loading)
    //     return (
    //         <p className="text-center mt-32 text-2xl font-semibold text-purple-600">
    //             Loading...
    //         </p>
    //     )

    // if (error)
    //     return (
    //         <p className="text-center mt-32 text-2xl font-semibold text-red-600">
    //             Error fetching blogs
    //         </p>
    //     )


    const featured = blogs[0]
    const right = blogs.slice(1, 4)
    const others = blogs.slice(4)



    return (
        <div className='relative min-h-screen w-full'>
            <div class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            <div className="mt-20 pt-32 px-6 lg:px-52 mx-auto">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        Blog & Expert Insights
                    </h1>
                    <p className="text-lg text-gray-500 max-w-lg mt-3 mb-20 text-poppins">
                        Stay updated with the latest tips, trends, and success stories in audit, risk management, and professional certifications.
                    </p>
                </div>

                <div className='flex justify-start items-stretch gap-6 w-full h-full'>


                    {/* Featured Blog */}
                    <div className='w-[50%] flex flex-col justify-between'>
                        {featured && (
                            <div className="bg-white h-full overflow-hidden p-4 rounded-2xl border-gray-300 border shadow-xl">
                                <img
                                    src={featured.cover}
                                    alt={featured.title}
                                    className="w-full h-80 object-cover rounded-xl"
                                />
                                <div className='flex flex-col justify-between h-auto'>
                                    <div className="pt-8 flex-1 pb-0 flex flex-col justify-between">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4 line-clamp-4">
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
                        )}
                    </div>

                    {/* Right Blogs */}
                    <div className='w-[50%] flex flex-col justify-between h-full'>
                        <div className="flex flex-col justify-between gap-4 ">
                            {right.map((blogs) => (
                                <div
                                    key={blogs.id}
                                    className="bg-white flex justify-start h-1/2 p-4 rounded-2xl border-gray-300 border shadow-xl"
                                >
                                    <img
                                        src={blogs.cover}
                                        alt={blogs.title}
                                        className="w-44 h-44 object-cover rounded-xl"
                                    />
                                    <div className="pl-6 flex flex-col justify-between h-44">
                                        <div>
                                            <h3 className="text-lg leading-tight font-semibold text-gray-800 mb-2 line-clamp-3">
                                                {blogs.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2">
                                                {blogs.content}
                                            </p>
                                        </div>
                                        <Link
                                            key={blogs.id}
                                            to={`/blogs/${blogs.slug}`}
                                            className="inline-flex justify-start items-center gap-1.5 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                                        >
                                            <span className="text-base pl-2 text-gray-700">
                                                Learn More
                                            </span>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-sm bg-brand-blue h-4 w-4 rounded-full p-2' />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom blogs */}
                <div className="mt-6 grid grid-cols-3 gap-6 pb-20 ">
                    {others.map((blogs) => (
                        <div
                            key={blogs.id}
                            className="bg-white flex flex-col p-4 rounded-2xl border-gray-300 border shadow-xl"
                        >
                            <img
                                src={blogs.cover}
                                alt={blogs.title}
                                className="w-full h-44 object-cover rounded-xl"
                            />
                            <div className='flex flex-col justify-between h-52'>
                                <div className="pt-6 flex flex-col">
                                    <h3 className="text-lg font-semibold leading-tight text-gray-800 mb-2 line-clamp-3">
                                        {blogs.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2">
                                        {blogs.content}
                                    </p>

                                </div>
                                <Link
                                    key={blogs.id}
                                    to={`/blogs/${blogs.slug}`}
                                    className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300"
                                >
                                    <span className="text-base pl-2 text-gray-700">
                                        Learn More
                                    </span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-white text-sm bg-brand-blue h-4 w-4 rounded-full p-2' />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogList

