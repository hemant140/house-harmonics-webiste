import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between  max-w-6xl mx-auto p-3 items-center'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>House</span>
                    <span className='text-slate-700'>harmonics</span>
                </h1>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className="text-slate-600" />
                </form>
                <ul className='flex gap-4 items-center'>
                    <Link to="/">
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {
                            currentUser ? (<img className='rounded-full h-12 w-12 object-cover' src={currentUser.avatar} alt='profile' />) : (
                                <li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>
                            )
                        }

                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
