'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const url = 'http://localhost:3000/api/auth/login'
    const values = { email, password }

    try {
      const response = await axios.post(url, values, { withCredentials: true })
      if (response.data.success) {
        login(response.data.token, response.data.user)
        toast.success('Logged in successfully!', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 3000,
        })
      }
      router.push('/')
    } catch (err) {
      toast.error(err.response.data.message, {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex fixed justify-center items-center h-screen w-screen bg-gray-50 p-5 overflow-hidden inset-0'>
      <div className='w-full max-w-md max-h-[calc(100vh-40px)] overflow-y-auto'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 bg-white p-10 rounded-xl shadow-lg animate-fade-in'
        >
          <h2 className='text-center text-2xl font-bold text-gray-800 mb-2'>
            XeroBrokerage
          </h2>

          {/* Email Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-800'>Email</label>
            <div className='flex items-center border border-gray-200 rounded-lg h-12 px-3 bg-gray-50 hover:border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'>
              <svg
                className='w-5 h-5 text-gray-400'
                viewBox='0 0 32 32'
                fill='currentColor'
              >
                <path d='m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z' />
              </svg>
              <input
                type='email'
                className='ml-2 w-full h-full bg-transparent outline-none text-sm text-gray-700'
                placeholder='Enter your Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-800'>
              Password
            </label>
            <div className='flex items-center border border-gray-200 rounded-lg h-12 px-3 bg-gray-50 hover:border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'>
              <svg
                className='w-5 h-5 text-gray-400'
                viewBox='-64 0 512 512'
                fill='currentColor'
              >
                <path d='m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0' />
                <path d='m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0' />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className='ml-2 w-full h-full bg-transparent outline-none text-sm text-gray-700'
                placeholder='Enter your Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='text-gray-400 hover:text-gray-600 focus:outline-none'
              >
                {showPassword ? (
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z' />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className='flex justify-between items-center mt-1'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
              />
              <label
                htmlFor='rememberMe'
                className='text-sm text-gray-600 cursor-pointer select-none'
              >
                Remember me
              </label>
            </div>
            <Link
              href='../../Auth/forgotPass'
              className='text-sm text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors'
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`mt-3 w-full h-12 rounded-lg font-medium text-white transition-all ${
              isSubmitting
                ? 'bg-gray-800 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800 active:translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <div className='flex justify-center items-center'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Sign Up Link */}
          <p className='text-center text-sm text-gray-600 mt-1'>
            Don't have an account?{' '}
            <Link
              href='../../Auth/signup'
              className='text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors'
            >
              Sign Up
            </Link>
          </p>

          {/* Divider */}
          <div className='flex items-center my-2'>
            <div className='flex-1 h-px bg-gray-200'></div>
            <span className='px-3 text-xs text-gray-500 uppercase'>
              Or With
            </span>
            <div className='flex-1 h-px bg-gray-200'></div>
          </div>

          {/* Social Buttons */}
          <div className='flex gap-3'>
            <button
              type='button'
              className='flex-1 flex justify-center items-center gap-2 h-12 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors'
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 512 512'
                fill='currentColor'
              >
                <path
                  fill='#FBBB00'
                  d='M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z'
                />
                <path
                  fill='#518EF8'
                  d='M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z'
                />
                <path
                  fill='#28B446'
                  d='M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z'
                />
                <path
                  fill='#F14336'
                  d='M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z'
                />
              </svg>
              Google
            </button>
            <button
              type='button'
              className='flex-1 flex justify-center items-center gap-2 h-12 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors'
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 22.773 22.773'
                fill='currentColor'
              >
                <path d='M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z' />
                <path d='M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z' />
              </svg>
              Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
