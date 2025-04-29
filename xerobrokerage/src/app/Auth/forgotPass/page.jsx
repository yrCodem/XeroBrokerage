'use client'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import AuthLayout from '../layout/page'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({
        type: 'success',
        text: 'Password reset link has been sent to your email if it exists in our system.',
      })
    }, 1500)
  }

  return (
    <AuthLayout>
      <StyledForm onSubmit={handleSubmit}>
        <h2 className='form-title'>Forgot Password</h2>
        <p className='form-subtitle'>Enter your email to reset your password</p>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className='input-group'>
          <label>Email</label>
          <div className='inputForm'>
            <svg
              height={20}
              viewBox='0 0 32 32'
              width={20}
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='Layer_3' data-name='Layer 3'>
                <path d='m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z' />
              </g>
            </svg>
            <input
              type='email'
              className='input'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          className={`button-submit ${isSubmitting ? 'submitting' : ''}`}
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? <span className='spinner'></span> : 'Reset Password'}
        </button>

        <p className='login-link'>
          Remember your password?{' '}
          <Link href='../login' className='span'>
            Log in
          </Link>
        </p>
      </StyledForm>
    </AuthLayout>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    text-align: center;
    color: #151717;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .form-subtitle {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .message {
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 10px;

    &.success {
      background-color: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    &.error {
      background-color: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    color: #151717;
    font-weight: 600;
    font-size: 14px;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    background-color: #f9fafb;

    &:hover {
      border-color: #c0c0c0;
    }
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background-color: transparent;
    font-size: 14px;
    color: #333;

    &:focus {
      outline: none;
    }
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
    box-shadow: 0 0 0 3px rgba(45, 121, 243, 0.1);
  }

  .span {
    font-size: 14px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      background-color: #252727;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &.submitting {
      background-color: #252727;
      cursor: not-allowed;
    }
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: ${spin} 1s ease-in-out infinite;
  }

  .login-link {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    margin: 5px 0;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`

export default ForgotPasswordForm
