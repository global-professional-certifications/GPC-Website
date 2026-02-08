import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faUser,
    faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import { client } from "../../lib/sanity/client";
import { getRecentPosts } from "../../lib/sanity/queries";
import { urlFor } from "../../lib/sanity/imageBuilder";

const BlogCall = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await client.fetch(getRecentPosts);
                setLatestBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="px-6 md:px-16 w-full py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-blue/20 border-t-brand-blue"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 md:px-16 w-full py-12">
            {/* Heading */}
            <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start p-4 mb-12">
                <Link
                    to="/blogs"
                    aria-label="View Learning Resources and Blogs"
                    className="text-2xl md:text-4xl lg:text-4xl text-center font-bold hover:underline hover:text-brand-blue transition-colors"
                >
                    <h2>
                        Learning Resources &{" "}
                        <span className="text-brand-blue font-normal italic">Blogs</span>
                    </h2>
                </Link>

                <p className="text-xs md:text-base text-center md:text-left lg:text-base font-poppins leading-relaxed max-w-lg text-gray-600 mt-6">
                    Explore expert insights and latest trends in audit, risk, and
                    professional certification on our blog
                </p>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs.map((blog) => (
                    <Link
                        key={blog._id}
                        to={`/blogs/${blog.slug.current || blog.slug}`}
                        aria-label={`Read blog: ${blog.title}`}
                        className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 h-[380px] md:h-[520px]"
                    >
                        <div className="relative">
                            <img
                                src={blog.mainImage ? urlFor(blog.mainImage).url() : ""}
                                alt={blog.title}
                                className="w-full h-36 md:h-56 object-cover"
                            />
                            {/* Category Badge */}
                            {blog.categories?.[0] && (
                                <span
                                    className="absolute top-3 left-3 px-2.5 py-1 text-[10px] md:text-xs font-semibold rounded-full text-white shadow-md"
                                    style={{ backgroundColor: blog.categories[0].color || '#4F46E5' }}
                                >
                                    {blog.categories[0].title}
                                </span>
                            )}
                        </div>

                        <div className="w-full flex justify-between items-center p-4 md:p-6">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="text-blue-400"
                                />
                                <span className="text-xs md:text-sm text-gray-600">
                                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                                <span className="text-xs md:text-sm text-gray-600">
                                    {blog.author}
                                </span>
                            </div>
                        </div>

                        <div className="px-4 md:px-6 flex flex-col justify-center pb-6 h-[150px] md:h-[220px]">
                            <div>
                                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-brand-blue group-hover:underline">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-500 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                                    {blog.excerpt || blog.description}
                                </p>
                            </div>

                            {/* Tags */}
                            {blog.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {blog.tags.slice(0, 2).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 rounded"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="inline-flex items-center gap-2 p-1 border border-brand-purple rounded-full w-fit mt-4">
                                <span className="text-sm md:text-base pl-2 text-gray-700">
                                    Read Full Blog
                                </span>
                                <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                    className="text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center items-center mt-12">
                <NavLink to="/blogs">
                    <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                        Read More Blogs
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default BlogCall;
