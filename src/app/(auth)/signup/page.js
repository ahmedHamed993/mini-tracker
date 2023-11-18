import React  from 'react'
import Image from 'next/image'
import SignupForm from '@/components/forms/SignupForm'

const signup = () => {
  return (
    <main className='py-24 min-h-screen bg-slate-100'>
      <div className='container mx-auto'>
        <div className='flex max-w-[420px] md:max-w-[800px] shadow-md mx-auto rounded-lg border-2 overflow-hidden  bg-white '>
          <Image src='/signup_img.jpg' width={400} height={600} alt='login' className='hidden md:block' />
          <SignupForm />
        </div>
      </div>
    </main>
  )
}

export default signup