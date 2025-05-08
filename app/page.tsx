import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <main className='flex h-screen flex-col items-center justify-center bg-stone-700'>
      <div className='space-y-4 text-center bg-gray-200 p-5 rounded-xl'>
        <h2 className='text-4xl font-semibold text-black'>Next Auth </h2>
        <p className='text-lg font-medium'>A simple authenticatin service</p>
        <div>
          <LoginButton>
            <Button size="lg">
              Sing in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}

export default Home