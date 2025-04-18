import Faq from '@/components/faq'
import FaqProduct from '@/components/faq-product'
import MainLayout from '@/layouts/main-layout'
import { getTranslate } from '@/lib/lang'
import {
  InterestRate,
  Product,
  ProductFAQ,
  ProductFeature,
  ProductRequirement,
  ProductTranslation,
} from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { ArrowRight, ChevronRight, X } from 'lucide-react'
import React, { useState } from 'react'
import Calculator from '../../../../../public/assets/calculator.svg'
import CalendarIcon from '../../../../../public/assets/calendar.svg'
import Currency from '../../../../../public/assets/currency.svg'
import PercentIcon from '../../../../../public/assets/percent.svg'
import Timer from '../../../../../public/assets/timer.svg'
import WhiteCurrency from '../../../../../public/assets/white-currency.svg'
import DepositoTable from './components/deposito-table'

interface DetailProductPageProps {
  product: ProductTranslation & {
    product: Product & {
      features: ProductFeature[]
      faqs: ProductFAQ[]
      requirements: ProductRequirement[]
      interest_rates: InterestRate[]
    }
  }
}

const calculatorResults = [
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
]

export default function DetailProductPage({ product }: DetailProductPageProps) {
  const { locale, app_url } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <>
      <Head title={product.name}>
        {/* Meta Standar */}
        <meta name="description" content={product.meta_descriptions} />
        <meta name="keywords" content={product.keywords} />
        <meta name="author" content="BPR Aruna" />

        {/* Meta Open Graph (SEO + Social Media) */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.meta_descriptions} />
        <meta property="og:image" content={product.product.image_url} />
        <meta
          property="og:url"
          content={`${app_url}/products/${product.slug}`}
        />
        <meta property="og:site_name" content="Nama Website" />

        {/* Meta Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.meta_descriptions} />
        <meta name="twitter:image" content={product.product.image_url} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${app_url}/products/${product.slug}`} />
      </Head>

      <MainLayout>
        <div className="container mx-auto py-[52px] lg:px-0 px-5">
          <div className="flex gap-10 lg:gap-[112px] items-center justify-center md:flex-row flex-col">
            <img
              src={product.product.image_url}
              className="rounded-full object-cover w-[80%] lg:w-1/2 aspect-square 2xl:w-[474px] 2xl:h-[474px] border-[2px] border-[#1946B9] p-2 border-dashed"
            />

            <div>
              <div className="w-fit lg:text-base text-sm bg-[#83AAFF] text-[#FFFFFF] py-[5px] px-[15px] rounded-full md:mx-0 mx-auto">
                <h4>{product.name}</h4>
              </div>
              <h2 className=" text-xl md:text-2xl lg:text-4xl font-semibold text-primary mt-3 lg:max-w-[645px] lg:leading-11 md:text-start text-center">
                {product.heading_one}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#3F4145] mt-3 md:mt-[30px] lg:max-w-[645px] md:text-start text-center">
                {product.heading_two}
              </p>

              <div className="mt-[30px] lg:flex-row flex-col hidden md:flex gap-[25px]">
                <button className="bg-primary w-fit text-white rounded-2xl font-semibold py-3.5 px-[15px] lg:px-[34px] flex items-start cursor-pointer lg:text-base text-sm">
                  {getTranslate(lang as 'id' | 'en', 'apply_now')}
                  <ArrowRight className="ml-2" />
                </button>

                <button className="text-primary w-fit border border-primary bg-white rounded-2xl font-semibold py-3.5 px-[15px] lg:px-[34px] flex items-start cursor-pointer lg:text-base text-sm">
                  {getTranslate(lang, 'credit_simulation')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {product.product.features.length > 0 && (
          <div className="bg-[#F0F4FF] mt-10 py-10 lg:px-0 px-5">
            <h3 className="text-primary text-center text-xl md:text-2xl lg:text-4xl font-semibold">
              Fitur {product.name}
            </h3>
            <p className="text-base lg:text-lg text-[#141515] text-center mt-2">
              Beberapa fitur yang kami miliki pada produk {product.name}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto mt-10">
              {product.product.features.map((feature) => {
                // @ts-ignore
                const IconComponent = LucideIcons[feature.icon]

                return (
                  <div
                    key={feature.id}
                    className="bg-white rounded-[10px] flex flex-col justify-between items-center px-[52px] py-10"
                  >
                    <div className="p-[22px] bg-[#F8F9F9] rounded-full">
                      <IconComponent size={16} className="text-[#3387EC]" />
                    </div>
                    <p className="text-[#141515] font-medium text-base lg:text-xl mt-3.5 text-center">
                      {feature[`${lang}_title`]}
                    </p>
                    <p className="text-[#8F9090] mt-3.5 text-center lg:text-base text-sm">
                      {feature[`${lang}_description`]}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {product.product.type_calculation === 'deposit' && (
          <DepositoTable
            product={product}
          />
        )}

        {product.product.requirements.length > 0 && (
          <div className="bg-[#F0F4FF]">
            <div className="container mx-auto py-9">
              <h4 className="text-4xl font-semibold text-primary text-center">
                Persyaratan Yang Perlu Diketahui
              </h4>
              <p className="mt-5 text-center text-lg">
                Calon Debitur wajib memenuhi persyaratan yang ada untuk dapat
                diberikan fasilitas kredit, sebagai berikut
              </p>

              <div className="space-y-[25px] mt-[25px]">
                {product.product.requirements.map((requirement) => {
                  const items = JSON.parse(requirement.items) as {
                    en: string[]
                    id: string[]
                  }

                  return (
                    <FaqProduct
                      title={requirement[`${lang}_title`]}
                      items={items[lang]}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {product.product.faqs.length > 0 && (
          <div className="container mx-auto py-10">
            <h2 className="text-[#1946B9] text-4xl font-semibold text-center">
              Ada pertanyaan? Kami siap membantu Anda!
            </h2>
            <p className="text-center text-[#3F4145] text-lg mt-5">
              Butuh penjelasan lebih lanjut? Berikut pertanyaan yang paling
              sering diajukan.
            </p>

            <div className="space-y-5">
              {product.product.faqs.map((faq, i) => (
                <Faq
                  question={faq[`${lang}_question`]}
                  answer={faq[`${lang}_answer`]}
                  key={i}
                />
              ))}
            </div>
          </div>
        )}
      </MainLayout>
    </>
  )
}
