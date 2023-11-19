import React from 'react'
import Image from 'next/image'
// components 
import LoginForm from '@/components/forms/LoginForm'
import { redirect } from 'next/navigation';
// auth options 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Login = async () => {
  const session = await getServerSession(authOptions);
  if(session?.user) redirect("/");

  return (
    <main className='py-8 px-4 min-h-screen bg-slate-50'>
      <div className='container mx-auto '>
        <div className='flex max-w-[420px] md:max-w-[800px] shadow-md mx-auto rounded-lg border-2 overflow-hidden bg-white'>
          <Image src='/login_img.jpg' width={400} height={600} alt='login' className='hidden md:block' />
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default Login