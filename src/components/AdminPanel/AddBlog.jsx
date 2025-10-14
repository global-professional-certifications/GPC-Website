import React, { useState } from "react";
import uploadImage from "../../assets/upload_area.svg";

const AddBlog = () => {
    const [blogThumbnail, setBlogThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [blogCategory, setBlogCategory] = useState("");

    // Load env variables
    const API_URL = import.meta.env.VITE_STRAPI_URL;
    const API_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!title || !blog || !blogCategory) {
            alert("Please fill all fields!");
            return;
        }

        try {
            const formData = new FormData();

            // JSON string for non-file fields
            formData.append(
                "data",
                JSON.stringify({
                    title: title,
                    content: blog,
                    category: blogCategory,
                })
            );

            // File field
            if (blogThumbnail) {
                formData.append("files.thumbnail", blogThumbnail); 
            }

            // Fetch request
            const response = await fetch(`${API_URL}/api/blogs`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: formData,
            });


            if (response.ok) {
                alert("Blog published successfully!");
                setTitle("");
                setBlog("");
                setBlogCategory("");
                setBlogThumbnail(null);
            } else {
                const errorData = await response.json();
                console.error("Error publishing blog:", errorData);
                alert("Failed to publish blog. Check console for details.");
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Something went wrong while publishing!");
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex-1 h-full bg-brand-blue-50/50 text-gray-800 overflow-scroll"
        >
            <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
                <p>Upload Thumbnail</p>
                <label htmlFor="blogThumbnail">
                    <img
                        src={!blogThumbnail ? uploadImage : URL.createObjectURL(blogThumbnail)}
                        alt="thumbnail"
                        className="mt-2 h-auto w-40 rounded cursor-pointer"
                    />
                    <input
                        onChange={(e) => setBlogThumbnail(e.target.files[0])}
                        type="file"
                        id="blogThumbnail"
                        className="hidden"
                    />
                </label>

                <p className="mt-8">Blog Title</p>
                <input
                    type="text"
                    placeholder="Enter the title"
                    required
                    className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <p className="mt-8">Blog Content</p>
                <textarea
                    placeholder="Write here..."
                    required
                    rows="10"
                    className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
                    onChange={(e) => setBlog(e.target.value)}
                    value={blog}
                />

                <p className="mt-8">Blog Category</p>
                <select
                    className="mt-2 px-3 py-2 border text-gray-600 border-gray-300 outline-none rounded"
                    onChange={(e) => setBlogCategory(e.target.value)}
                    value={blogCategory}
                >
                    <option value="">Select a category</option>
                    <option value="CIA">CIA</option>
                    <option value="CISA">CISA</option>
                    <option value="CRMA">CRMA</option>
                    <option value="IAP">IAP</option>
                </select>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-4 mt-8 w-40 h-10 bg-brand-blue text-white rounded cursor-pointer hover:bg-brand-blue/80 transition-all"
                >
                    Publish Blog
                </button>
            </div>
        </form>
    );
};

export default AddBlog;
