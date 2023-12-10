import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({})
    const handleChange = (e) => {
        const fname = e.target.name;
        const fvalue = e.target.value;
        setFormData({
            ...formData,
            [fname]: fvalue
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            if (data.Status === 0) {
                setLoading(false);
                setError(data.Message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');

        } catch (error) {
            setLoading(false);
            setError(error.message)
        }

    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" required placeholder='fullname' onChange={handleChange} className='border p-3 rounded-lg' name='fullName' />
                <input type="email" required placeholder='xyz@gmail.com' onChange={handleChange} className='border p-3 rounded-lg' name='email' />
                <input type="number" required placeholder='mobile' onChange={handleChange} className='border p-3 rounded-lg' name='mobile' />
                <input type="text" required placeholder='username' onChange={handleChange} className='border p-3 rounded-lg' name='username' />
                <input type="password" required placeholder='password' onChange={handleChange} className='border p-3 rounded-lg' name='password' autoComplete="current-password" />
                <button disabled={loading} className='bg-slate-700 text-white p-3
                rounded-lg uppercase hover:opacity-95
                disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>
            {error && <p className='text-red-700'>{error}</p>}
        </div>
    )
}

export default SignUp
