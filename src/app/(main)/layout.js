import { Inter } from 'next/font/google'
// styles 
import '../globals.css'
// components 
import Navbar from '@/components/navbar/Navbar'
import ClientSessionProvider from '@/components/providers/ClientSessionProvider'
// font instance 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tracker',
  description: 'Track your expense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <ClientSessionProvider>

        <Navbar />
        {children}
        </ClientSessionProvider>
      </body>
    </html>
  )
}
