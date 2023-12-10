import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-center font-semibold text-3xl my-3'>
                Profile
            </h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.avatar} alt='profile'
                    className='rounded-full h-24 w-24 object-cover
            cursor-pointer self-center mt-2' />
                <h1 className='text-center font-semibold text-3xl text-slate-600'>{currentUser.fullName}</h1>
                <input type="text" placeholder='Fullname'
                    className='border p-3 rounded-lg' name='fullName' />
                <input type="text" placeholder='Username'
                    className='border p-3 rounded-lg' name='username' />
                <input type="text" placeholder='email'
                    className='border p-3 rounded-lg' name='email' />
                <input type="text" placeholder='Password'
                    className='border p-3 rounded-lg' name='password' />
                <button className='bg-slate-700 text-white rounded-lg
                    p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                    update
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>
                    Delete Account
                </span>
                <span className='text-red-700 cursor-pointer'>
                    Sign out
                </span>
            </div>
        </div>
    )
}

export default Profile
