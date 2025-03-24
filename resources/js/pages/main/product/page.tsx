import ProductCard from '@/components/product-card'
import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

interface ProductPageProps {
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

export default function ProductPage({ products }: ProductPageProps) {
  return (
    <MainLayout>
      <div className="pt-10 pb-[84px] container mx-auto">
        <h2 className="text-primary text-5xl font-semibold text-center">
          Produk Dari Kami
        </h2>
        <p className="text-center mt-5 text-lg text-[#3F4145]">
          Anda Selalu bisa berhemat dengan produk - produk yang kami miliki
        </p>

        <div className="grid grid-cols-3 mt-10 gap-[50px]">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
