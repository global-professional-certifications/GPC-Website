import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.trim().replace(/\/$/, "");

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const apiUrl = `${STRAPI_URL}/api/blogs?populate=*`;
                console.log("Fetching blogs from:", apiUrl);
                const res = await fetch(apiUrl);
                const data = await res.json();
                setBlogs(data.data || []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading)
        return <p className="text-center mt-20 text-gray-600">Loading blogs...</p>;
    if (!blogs.length)
        return <p className="text-center mt-20 text-gray-600">No blogs available right now.</p>;

    return (
        <div className="min-h-screen mt-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
                    Our Latest Blogs
                </h1>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((item) => {
                        // Use optional chaining and fallback values
                        const title = item?.attributes?.title || item?.title || "Untitled Blog";
                        const slug = item?.attributes?.slug || item?.slug;
                        const content = item?.attributes?.content || item?.content || [];
                        const cover = item?.attributes?.cover || item?.cover;
                        const author = item?.attributes?.author || item?.author || "Unknown Author";
                        const publishedDate =
                            item?.attributes?.publishedDate || item?.publishedDate;

                        if (!slug) return null; // skip if no slug

                        const imageUrl = cover?.data?.attributes?.url
                            ? `${STRAPI_URL}${cover.data.attributes.url}`
                            : "";

                        // Convert rich text content to plain text safely
                        let plainText = "";
                        if (Array.isArray(content)) {
                            content.forEach((block) => {
                                block?.children?.forEach((child) => {
                                    if (child?.text) plainText += child.text + " ";
                                });
                            });
                        } else if (typeof content === "string") {
                            plainText = content;
                        }

                        return (
                            <Link
                                to={`/blogs/${slug}`}
                                key={item.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
                                    <p className="text-gray-500 text-sm mb-3">
                                        {author} •{" "}
                                        {publishedDate
                                            ? new Date(publishedDate).toDateString()
                                            : "Unknown Date"}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {plainText.substring(0, 150)}...
                                    </p>
                                    <p className="text-indigo-600 font-semibold mt-4">
                                        Read more →
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
