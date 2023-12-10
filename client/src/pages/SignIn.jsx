import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/User/userSlice.js';
import OAuth from '../components/OAuth.jsx';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (data.Status === 0) {
        dispatch(signInFailure(data.Message))
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" required placeholder='xyz@gmail.com' onChange={handleChange} className='border p-3 rounded-lg' name='email' />
        <input type="password" required placeholder='password' onChange={handleChange} className='border p-3 rounded-lg' name='password' autoComplete="current-password" />
        <button disabled={loading} className='bg-slate-700 text-white p-3
                rounded-lg uppercase hover:opacity-95
                disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-700'>{error}</p>}
    </div>
  )
}

export default SignIn
