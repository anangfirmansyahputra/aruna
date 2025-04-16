import { Link, router, usePage } from '@inertiajs/react'
import Logo from '../../../public/assets/logo.svg'
import { Category, Product, ProductTranslation } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import React, { Fragment, useState } from 'react'
import { getTranslate } from '@/lib/lang'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { locale, categories, navbar } = usePage().props
  const { url } = usePage()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const [isHover, setIsHover] = React.useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)

  const [isHoverProposal, setIsHoverProposal] = React.useState(false)
  const [showAllProposals, setShowAllProposals] = useState(false)

  const lang = locale as 'id' | 'en'

  return (
    <div
      className={`${isMenuOpen && 'h-screen'} fixed z-[50] w-full flex flex-col`}
    >
      <div>
        <div className="bg-white">
          <div className="flex px-10 lg:px-0 lg:container mx-auto md:text-base text-sm justify-between py-2.5 font-medium text-base text-[#736E6E]">
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
              <Link
                href="/faq"
                className="hover:text-primary transition-colors"
              >
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
          <div className="px-10 lg:px-0 lg:container mx-auto justify-between py-2.5 items-center flex">
            <Link href="/">
              <img src={Logo} alt="Logo" className="md:w-[238px] w-[167px]" />
            </Link>

            <div className="text-white font-semibold xl:text-lg space-x-8 xl:space-x-[84px] lg:flex hidden">
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
                                  className={`${url ===
                                    `/products/${product.translations[0].slug}`
                                    ? 'text-primary'
                                    : 'text-black'
                                    } text-base font-normal hover:text-primary transition-colors`}
                                  key={product.id}
                                >
                                  {product.translations[0].name}
                                </a>
                                <p className="text-xs text-slate-600 font-normal mt-1">
                                  {(product.translations[0].description
                                    ?.length || 0) > 50
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
              <Link
                href="/promo"
                className="hover:text-[#83AAFF] transition-colors"
              >
                {getTranslate(lang, 'promo_nav')}
              </Link>
              {/* <Link
                href="/credit"
                className="hover:text-[#83AAFF] transition-colors"
              >
                {getTranslate(lang, 'proposal_nav')}
              </Link> */}

              <div
                role="link"
                className={`relative group hover:text-[#83AAFF] transition-colors cursor-pointer`}
                onMouseEnter={() => setIsHoverProposal(true)}
                onMouseLeave={() => setIsHoverProposal(false)}
              >
                <span>
                  {getTranslate(lang, 'proposal_nav')}
                </span>

                {/* Dropdown */}
                <AnimatePresence>
                  {isHoverProposal && (
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
                      <motion.div className="max-w-fit bg-white py-[42px] px-12 shadow rounded-[10px] flex flex-col gap-5">
                        <div className="flex flex-col gap-y-2.5">
                          <Link href="/credit" className="text-primary text-lg font-semibold w-full truncate">
                            Kredit
                          </Link>
                          <Link href="/e-deposito" className="text-primary text-lg font-semibold w-full truncate">
                            e-Deposito
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:hidden z-10 relative">
              {isMenuOpen ? (
                <X
                  className="text-white cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <Menu
                  className="text-white cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-white flex-1"
          >
            <div className="flex flex-col py-6 px-6 text-sm font-semibold text-[#736E6E]">
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="mb-1"
              >
                {getTranslate(lang, 'about_nav')}
              </Link>
              <div
                className="cursor-pointer relative mb-1"
                onClick={() => setShowAllProducts((prev) => !prev)}
              >
                <div className="flex items-center gap-2 justify-between">
                  <p>{getTranslate(lang, 'product_nav')}</p>
                  <motion.button
                    className="p-3 rounded-full w-fit cursor-pointer"
                    animate={{ rotate: showAllProducts ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showAllProducts && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-[10px] space-y-5 mb-4"
                    >
                      {(
                        categories as (Category & {
                          products: (Product & {
                            translations: ProductTranslation[]
                          })[]
                        })[]
                      ).map((category) => (
                        <div key={category.id} className="space-y-2.5">
                          <p className="text-primary text-xs font-semibold">
                            {category.translations[0].name}
                          </p>
                          {category.products.map((product) => (
                            <Fragment key={product.id}>
                              <Link
                                onClick={(e) => e.stopPropagation()}
                                href={`/products/${product.translations[0].slug}`}
                                className={`${url ===
                                  `/products/${product.translations[0].slug}`
                                  ? 'text-primary'
                                  : 'text-black'
                                  } text-base font-normal text-xs hover:text-primary transition-colors`}
                                key={product.id}
                              >
                                {product.translations[0].name}
                              </Link>
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
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/articles"
                onClick={() => setIsMenuOpen(false)}
                className="mb-4"
              >
                {getTranslate(lang, 'news_nav')}
              </Link>
              <Link
                href="/careers"
                onClick={() => setIsMenuOpen(false)}
                className="mb-4"
              >
                {getTranslate(lang, 'career_nav')}
              </Link>
              <Link
                href="/promo"
                onClick={() => setIsMenuOpen(false)}
                className="mb-1"
              >
                {getTranslate(lang, 'promo_nav')}
              </Link>
              {/* <Link href="/credit" onClick={() => setIsMenuOpen(false)}>
                {getTranslate(lang, 'proposal_nav')}
              </Link> */}
              <div
                className="cursor-pointer relative mb-1"
                onClick={() => setShowAllProposals((prev) => !prev)}
              >
                <div className="flex items-center gap-2 justify-between">
                  <p>{getTranslate(lang, 'proposal_nav')}</p>
                  <motion.button
                    className="p-3 rounded-full w-fit cursor-pointer"
                    animate={{ rotate: showAllProposals ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showAllProposals && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-[10px] space-y-5 mb-4"
                    >
                      <div className="flex flex-col gap-y-2.5">
                        <Link href="/credit" className="text-primary text-xs font-semibold truncate">
                          Kredit
                        </Link>
                        <Link href="/e-deposito" className="text-primary text-xs font-semibold truncate">
                          e-Deposito
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
