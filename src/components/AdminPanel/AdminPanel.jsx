import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-2.png'
import Sidebar from './Sidebar.jsx'


const AdminPanel = () => {

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <>
            <div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-300'>
                <img src={logo} alt="" className=' w-32 sm:w-40 cursor-pointer transform scale-130' onClick={() => navigate('/')} />
                <button className='text-sm px-8 py-1 bg-brand-blue text-white rounded-full cursor-pointer' onClick={logout}>Logout</button>
            </div>
            <div className='flex h-calc[(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default AdminPanel