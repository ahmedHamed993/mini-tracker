import { Inter } from 'next/font/google'
// styles 
import './../globals.css'
import UserProvider from '@/context/UserContext'
// import { SessionProvider } from 'next-auth/react';
// font instance 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tracker',
  description: 'Track your expense',
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        {/* <SessionProvider> */}
          <UserProvider>
            {children}
          </UserProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
