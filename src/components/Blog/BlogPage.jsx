import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.trim().replace(/\/$/, "");

const BlogPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const apiUrl = `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
                console.log("Fetching blog from:", apiUrl);

                const res = await fetch(apiUrl);
                const data = await res.json();
                console.log("Full API response:", data);

                if (!data?.data || data.data.length === 0) {
                    setError("Blog not found.");
                    return;
                }

                const blogItem = data.data[0];
                const attributes = blogItem?.attributes || {};
                setBlog({ id: blogItem.id, ...attributes });
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError("Error loading blog.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchBlog();
    }, [slug]);

    if (loading) return <p className="text-center mt-20 text-gray-600">Loading blog...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
    if (!blog) return <p className="text-center mt-20 text-gray-600">Blog not found.</p>;

    const { title, content, author, publishedDate, cover } = blog;
    const imageUrl = cover?.data?.attributes?.url ? `${STRAPI_URL}${cover.data.attributes.url}` : "";

    return (
        <div className="min-h-screen mt-24 bg-gray-50 pb-16">
            <div className="max-w-4xl mx-auto px-6 py-16 bg-white shadow-md rounded-2xl">
                <Link
                    to="/"
                    className="text-indigo-600 font-semibold hover:underline mb-6 inline-block"
                >
                    ← Back to Blogs
                </Link>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title || "Blog Image"}
                        className="w-full h-96 object-cover rounded-xl mb-6"
                    />
                )}

                <h1 className="text-4xl font-bold text-gray-900 mb-3">{title || "Untitled Blog"}</h1>
                <p className="text-gray-500 mb-8">
                    By {author || "Unknown Author"} • {publishedDate ? new Date(publishedDate).toDateString() : "Unknown Date"}
                </p>

                <div
                    className="prose max-w-none text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content || "<p>No content available.</p>" }}
                />
            </div>
        </div>
    );
};

export default BlogPage;
