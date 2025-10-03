import React, { useState } from 'react'
import uploadImage from "../../assets/upload_area.svg"


const AddBlog = () => {

    const [blogThumbnail, setBlogThumbnail] = useState(false);
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [blogCategory, setBlogCategory] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex-1 h-full bg-brand-blue-50/50 text-gray-800 overflow-scroll'>
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

                <p>Upload Thumbnail</p>
                <label htmlFor="blogThumbnail">
                    <img src={!blogThumbnail ? uploadImage : URL.createObjectURL(blogThumbnail)} alt="" className='mt-2 h-auto w-40 rounded cursor-pointer' />
                    <input onChange={e => setBlogThumbnail(e.target.files[0])} type="file" id="blogThumbnail" className="hidden" />
                </label>

                <p className='mt-8'>Blog Title</p>
                <input type="text" placeholder='Enter the title' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setTitle(e.target.value)} value={title} />

                <p className='mt-8'>Blog</p>
                <textarea type="text" placeholder='Write here' required rows="10" className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setBlog(e.target.value)} value={blog} />

                <p className='mt-8'>Blog Category</p>
                <select name="category" className='mt-2 px-3 py-2 border text-gray-600 border-gray-300 outline-none rounded' onChange={e => setBlogCategory(e.target.value)} value={blogCategory}>
                    <option value="">Select a category</option>
                    <option value="CIA">CIA</option>
                    <option value="CISA">CISA</option>
                    <option value="CRMA">CRMA</option>
                    <option value="IAP">IAP</option>
                </select>

                <button type="submit" className='flex items-center justify-center gap-4 mt-8 w-40 h-10 bg-brand-blue text-white rounded cursor-pointer hover:bg-brand-blue/80 transition-all'>Publish Blog</button>
            </div>
        </form>
    )
}

export default AddBlog