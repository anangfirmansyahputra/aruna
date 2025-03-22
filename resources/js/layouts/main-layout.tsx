import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  )
}
