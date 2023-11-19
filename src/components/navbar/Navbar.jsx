import React from 'react';

import Link from 'next/link';
import Image from "next/image"
import { headers } from "next/headers";
import LogoutButton from '../buttons/LogoutButton';
const Navbar = () => {
    const heads = headers()
    const pathname = heads.get('next-url')

    return (
        <nav className='p-2 bg-slate-100'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link href="/">
                    <Image src='/logo.webp' alt='tracker logo' width={50} height={50} /> 
                </Link>
                <LogoutButton />
            </div>
        </nav>
  )
}

export default Navbar