"use client";
import React from 'react' 
// next auth 
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    const logout = async ()=>{
        const res =  await signOut();
        router.push("/login")
    }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default LogoutButton