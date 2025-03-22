import { Link, router, usePage } from '@inertiajs/react'
import Logo from '../../../public/assets/logo.svg'
import { Category, Product, ProductTranslation } from '@/types'

export default function Navbar() {
  const { locale, categories } = usePage().props
  const { url } = usePage()

  return (
    <div>
      <div className="flex container mx-auto justify-between py-2.5 font-medium text-base text-[#736E6E]">
        <Link href="/" className="hover:text-primary transition-colors">
          Beranda
        </Link>
        <div className="space-x-[25px]">
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Kontak
          </Link>
          <Link href="/faq" className="hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>
        <div className="space-x-[11px]">
          <Link
            href="/lang/en"
            className={`${locale === 'en' && 'text-primary'} hover:text-primary transition-colors`}
          >
            EN
          </Link>
          <Link
            href="/lang/id"
            className={`${locale === 'id' && 'text-primary'} hover:text-primary transition-colors`}
          >
            ID
          </Link>
        </div>
      </div>
      <div className="bg-primary">
        <div className=" container mx-auto flex justify-between py-2.5 items-center">
          <Link href="/">
            <img src={Logo} alt="Logo" className="w-[238px]" />
          </Link>

          <div className="text-white font-semibold text-lg space-x-[84px] flex">
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Tentang
            </Link>
            <div
              role="link"
              className={`${url.includes('/products') && 'text-[#83AAFF]'} relative group hover:text-[#83AAFF] transition-colors group cursor-pointer`}
            >
              <span onClick={() => router.visit('/products')}>Produk</span>
              <div className="absolute cursor-auto hidden left-1/2 -translate-x-1/2 group-hover:flex flex-col items-center">
                <div className="mt-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />

                <div className="bg-white py-[42px] px-[78px] shadow rounded-[10px] grid grid-cols-3 w-[928px] max-w-[928px] gap-5">
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
                        <Link
                          href={`/products/${product.translations[0].slug}`}
                          className={`${url === `/products/${product.translations[0].slug}` ? 'text-primary' : 'text-black'}  text-base font-normal hover:text-primary transition-colors`}
                          key={product.id}
                        >
                          {product.translations[0].name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Berita
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Karir
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Promo
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Pengajuan
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
