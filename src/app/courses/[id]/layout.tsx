import Footer from '@/app/(publicly)/_components/FooterBase'
import Navbar from '@/app/(publicly)/_components/Navbar'
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div>
        <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">
                {children}
            </main>

            <Footer/>
    </div>
  )
}
