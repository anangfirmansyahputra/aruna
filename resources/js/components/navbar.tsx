import { Link, router, usePage } from '@inertiajs/react'
import Logo from '../../../public/assets/logo.svg'
import { Category, Product, ProductTranslation } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import React, { Fragment } from 'react'
import { getTranslate } from '@/lib/lang'

export default function Navbar() {
  const { locale, categories, navbar } = usePage().props
  const { url } = usePage()
  const [isHover, setIsHover] = React.useState(false)
  const lang = locale as 'id' | 'en'

  return (
    <div className="fixed z-[5] w-full">
      <div className="bg-white">
        <div className="flex container mx-auto justify-between py-2.5 font-medium text-base text-[#736E6E]">
          <Link href="/" className="hover:text-primary transition-colors">
            {getTranslate(lang, 'home_nav')}
          </Link>
          <div className="space-x-[25px]">
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              {getTranslate(lang, 'contact_nav')}
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
          <div className="space-x-[11px]">
            <Link
              href="/lang/en"
              preserveScroll
              preserveState
              className={`${locale === 'en' && 'text-primary'} hover:text-primary transition-colors`}
            >
              EN
            </Link>
            <Link
              href="/lang/id"
              preserveScroll
              preserveState
              className={`${locale === 'id' && 'text-primary'} hover:text-primary transition-colors`}
            >
              ID
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className=" container mx-auto flex justify-between py-2.5 items-center">
          <Link href="/">
            <img src={Logo} alt="Logo" className="w-[238px]" />
          </Link>

          <div className="text-white font-semibold text-lg space-x-[84px] flex">
            <Link
              href="/about"
              className="hover:text-[#83AAFF] transition-colors"
            >
              {getTranslate(lang, 'about_nav')}
            </Link>

            <div
              role="link"
              className={`relative group hover:text-[#83AAFF] transition-colors cursor-pointer`}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <span onClick={() => router.visit('/products')}>
                {getTranslate(lang, 'product_nav')}
              </span>

              {/* Dropdown */}
              <AnimatePresence>
                {isHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-[3]"
                  >
                    {/* Triangle */}
                    <motion.div
                      initial={{ rotateX: 90 }}
                      animate={{ rotateX: 0 }}
                      exit={{ rotateX: 90 }}
                      transition={{ duration: 0.2 }}
                      className="mt-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"
                    />

                    {/* Dropdown Content */}
                    <motion.div className="bg-white py-[42px] px-[78px] shadow rounded-[10px] grid grid-cols-3 w-[928px] max-w-[928px] gap-5">
                      {(
                        categories as (Category & {
                          products: (Product & {
                            translations: ProductTranslation[]
                          })[]
                        })[]
                      ).map((category) => (
                        <div key={category.id} className="space-y-2.5">
                          <p className="text-primary text-lg font-semibold">
                            {category.translations[0].name}
                          </p>
                          {category.products.map((product) => (
                            <Fragment key={product.id}>
                              <a
                                href={`/products/${product.translations[0].slug}`}
                                className={`${
                                  url ===
                                  `/products/${product.translations[0].slug}`
                                    ? 'text-primary'
                                    : 'text-black'
                                } text-base font-normal hover:text-primary transition-colors`}
                                key={product.id}
                              >
                                {product.translations[0].name}
                              </a>
                              <p className="text-xs text-slate-600 font-normal mt-1">
                                {(product.translations[0].description?.length ||
                                  0) > 50
                                  ? product.translations[0].description?.substring(
                                      0,
                                      80
                                    ) + '...'
                                  : product.translations[0].description}
                              </p>
                            </Fragment>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/articles"
              className="hover:text-[#83AAFF] transition-colors"
            >
              {getTranslate(lang, 'news_nav')}
            </Link>
            <Link
              href="/careers"
              className="hover:text-[#83AAFF] transition-colors"
            >
              {getTranslate(lang, 'career_nav')}
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              {getTranslate(lang, 'promo_nav')}
            </Link>
            <Link
              href="/credit"
              className="hover:text-[#83AAFF] transition-colors"
            >
              {getTranslate(lang, 'proposal_nav')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
