"use client"
import React from 'react';
import Link from 'next/link';
// react hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemes/auth/loginSchema';
// components 
import InputField from '@/components/inputs/InputField';
// alerts 
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { useRouter } from 'next/navigation';
// next auth 
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit =  async (values) => {
    const res = await signIn('user-login',{...values, redirect:false});
    if(res.status == 200) {
      enqueueSnackbar("Welcome back",{variant:'success'});
      router.push("/")
    } else if(res.status === 401) {
      enqueueSnackbar("Wrong email or password",{variant:'error'})
    } else {
      enqueueSnackbar("something went wrong, try again later",{variant:'error'})
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-12 flex-1 max-w-[400px] flex flex-col items-center justify-center mx-auto'>
      <SnackbarProvider />
      <h2 className='text-center mb-8 font-bold text-2xl'>Login</h2>
      <div className='w-full flex flex-col gap-2'>
        <InputField 
          id="email" 
          label="Email" 
          register={{...register("email")}} 
          placeholder='Enter your email' 
          errorMessage={errors?.email?.message } 
        />
        <InputField 
          id="password" 
          label="Password" 
          placeholder='Enter your password' 
          type="password"
          register={{...register("password")}} 
          errorMessage={errors?.password?.message } 
        />
        <button 
          type='submit' 
          className='bg-primary text-slate-50 mt-2 py-2 px-4 block rounded-md w-full'
        >
          Login
        </button>
        <Link href='/signup' className='text-sm text-left block w-full text-blue-600 mt-2'>Don't have and account?</Link>
      </div>
    </form>
  )
}

export default LoginForm