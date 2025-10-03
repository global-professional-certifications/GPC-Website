import React, { useState } from 'react'
import uploadImage from "../../assets/upload_area.svg"


const AddVideo = () => {

    const [video, setVideo] = useState(false);
    const [thumbnail, setThumbnail] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex-1 h-full bg-brand-blue-50/50 text-gray-800 overflow-scroll'>
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
                <p>Upload Testimonial Video</p>
                <label htmlFor="video">
                    <img src={!video ? uploadImage : URL.createObjectURL(video)} alt="" className='mt-2 h-auto w-40 rounded cursor-pointer' />
                    <input onChange={e => setVideo(e.target.files[0])} type="file" id="video" className="hidden" />
                </label>

                <p className='mt-8'>Upload Thumbnail</p>
                <label htmlFor="thumbnail">
                    <img src={!thumbnail ? uploadImage : URL.createObjectURL(thumbnail)} alt="" className='mt-2 h-auto w-40 rounded cursor-pointer' />
                    <input onChange={e => setThumbnail(e.target.files[0])} type="file" id="thumbnail" className="hidden" />
                </label>

                <p className='mt-8'>Name of the person</p>
                <input type="text" placeholder='Enter the name' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setName(e.target.value)} value={name} />

                <p className='mt-8'>Video Display Category</p>
                <select name="category" className='mt-2 px-3 py-2 border text-gray-600 border-gray-300 outline-none rounded' onChange={e => setCategory(e.target.value)} value={category}>
                    <option value="">Select a category</option>
                    <option value="CIA">CIA</option>
                    <option value="CISA">CISA</option>
                    <option value="CRMA">CRMA</option>
                    <option value="IAP">IAP</option>
                </select>

                <button type="submit" className='flex items-center justify-center gap-4 mt-8 w-40 h-10 bg-brand-blue text-white rounded cursor-pointer hover:bg-brand-blue/80 transition-all'>Upload Video</button>
            </div>
        </form>
    )
}

export default AddVideo