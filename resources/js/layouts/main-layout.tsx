import CrispChat from '@/components/crisp-chat'
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
      <div className="pt-[142px]">{children}</div>
      <CrispChat />
      <Footer />
    </>
  )
}
