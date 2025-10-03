import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    return (
        <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
            <NavLink end={true} to="/admin" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-brand-blue/20 border-r-2 border-brand-blue text-brand-blue"}`}>
                <FontAwesomeIcon icon={faFileVideo} />
                <p>Upload Video</p>
            </NavLink>
            <NavLink to="/admin/addBlog" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-brand-blue/20 border-r-2 border-brand-blue text-brand-blue"}`}>
                <FontAwesomeIcon icon={faPenToSquare} />
                <p>Upload Blog</p>
            </NavLink>
        </div>
    )
}

export default Sidebar