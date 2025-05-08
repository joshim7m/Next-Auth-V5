import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-stone-700'>
      { children }
    </div>
  )
}

export default AuthLayout