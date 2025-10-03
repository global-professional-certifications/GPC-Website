import React, { useState } from 'react'
import logo from "../../assets/logo-2.png"

const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-brand-blue/30 shadow-xl shadow-brand-blue/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <img src={logo} alt="" className='mx-auto block w-40 h-auto mb-4' />
                        <h1 className='text-2xl font-bold'><span className='text-brand-blue'>Admin</span> Login</h1>
                        <p className='font-light text-sm'>Enter your credentials to access the admin panel</p>
                    </div>
                    <form onSubmit={handleSubmit} className='m-6 w-full sm:max-w-md text-gray-600'>
                        <div className='flex flex-col'>
                            <label >Email</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder='Enter your email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                        </div>
                        <div className='flex flex-col'>
                            <label >Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder='Enter your password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                        </div>
                        <button type='submit' className='w-full py-3 font-medium bg-brand-blue text-white rounded cursor-pointer hover:bg-brand-blue/80 transition-all '>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin