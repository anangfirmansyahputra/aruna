import ProductCard from '@/components/product-card'
import SeoHead from '@/components/seo-head'
import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation, SEO } from '@/types'

interface ProductPageProps {
  products: (Product & {
    translations: ProductTranslation[]
  })[]
  seo: SEO | null
}

export default function ProductPage({ products, seo }: ProductPageProps) {
  return (
    <>
      <SeoHead
        url="/products"
        seo={seo}
        fallbackTitle={{
          id: 'Produk Kami',
          en: 'Our Products',
        }}
        fallbackDescription={{
          id: 'Lihat produk terbaik dari kami dan hemat lebih banyak.',
          en: 'Check out our best products and save more.',
        }}
        fallbackKeywords={{
          id: 'produk, hemat, belanja',
          en: 'products, save, shopping',
        }}
      />

      <MainLayout>
        <div className="pt-10 pb-[84px] container mx-auto md:px-0 px-5">
          <h2 className="text-primary text-2xl lg:text-5xl font-semibold text-center">
            Produk Dari Kami
          </h2>
          <p className="text-center mt-5 lg:text-lg text-[#3F4145]">
            Anda Selalu bisa berhemat dengan produk - produk yang kami miliki
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 md:gap-[50px]">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}
