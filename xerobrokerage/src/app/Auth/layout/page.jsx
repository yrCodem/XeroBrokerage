'use client'

const AuthLayout = ({ children }) => {
  return (
    <div className='fixed inset-0 overflow-hidden bg-gray-50'>
      <div className='absolute inset-0 flex justify-center items-center p-5'>
        <div className='w-full max-w-[450px] max-h-[calc(100vh-40px)] overflow-y-auto py-5 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
