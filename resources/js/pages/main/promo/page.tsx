'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '@/layouts/main-layout'
import { Promo, SEO } from '@/types'
import PromoOne from '../../../../../public/assets/promo1.png'
import PromoCard from '@/components/promo-card'
import { usePage } from '@inertiajs/react'
import SeoHead from '@/components/seo-head'

interface PromoPageProps {
  promos: Promo[]
  seo?: SEO
}

export default function PromoPage({ promos, seo }: PromoPageProps) {
  const [current, setCurrent] = useState(0)
  const autoLoop = true // ← ubah ini jadi false kalau nggak mau auto geser
  const delay = 5000 // 5 detik tiap slide
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  const sliders = [PromoOne, PromoOne, PromoOne] // bisa ganti dengan promos nanti

  useEffect(() => {
    if (!autoLoop) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length)
    }, delay)

    return () => clearInterval(timer)
  }, [sliders.length, autoLoop])

  return (
    <>
      <SeoHead
        url="/promo"
        seo={seo}
        fallbackTitle={{
          id: 'Promo',
          en: 'Promo',
        }}
        fallbackDescription={{
          id: 'Nikmati berbagai promo menarik yang kami tawarkan untuk Anda.',
          en: 'Enjoy our exciting promotional offers just for you.',
        }}
        fallbackKeywords={{
          id: 'promo, diskon, penawaran',
          en: 'promo, discount, offers',
        }}
      />

      <MainLayout>
        <div className="bg-[#F0F4FF] min-h-screen">
          <div className="container mx-auto py-[24px]">
            <h1 className="text-center text-primary text-5xl font-semibold">
              Promo Spesial
            </h1>
            <p className="w-full max-w-[621px] text-center mx-auto text-[#3F4145] text-lg mt-[15px]">
              Hemat lebih mudah bersama PT. BPR Aruna. Temukan berbagai promo
              menarik yang sedang berlangsung di sini!
            </p>

            <div className="relative w-full mx-auto mt-10 overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <img
                    src={sliders[current]}
                    alt={`Promo ${current + 1}`}
                    className="w-full h-full object-cover rounded-xl shadow"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Optional: Manual Controls */}
            <div className="flex justify-center mt-4 gap-2">
              {sliders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === current ? 'bg-primary' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-6 gap-[40px] mt-[25px]">
              {promos.map((promo, i) => {
                if (i < 2) {
                  return (
                    <div key={promo.id} className="col-span-3">
                      <PromoCard {...promo} lang={lang} />
                    </div>
                  )
                } else {
                  return (
                    <div key={promo.id} className="col-span-2">
                      <PromoCard {...promo} lang={lang} />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
