import { Product, ProductTranslation } from '@/types'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product & {
    translations: ProductTranslation[]
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.translations[0].slug}`}>
      <div className="group">
        <img
          src={product.image_url}
          className="w-full rounded-lg group-hover:scale-105 transition-transform aspect-square object-cover"
          alt={product.translations[0]?.name}
        />
        <h3 className="text-black text-lg lg:text-xl font-semibold mt-4">
          {product.translations[0]?.name}
        </h3>
        <p className="mt-1 text-[#777777] text-sm lg:text-base">
          {product.translations[0]?.meta_descriptions}
        </p>

        <div className="flex items-center mt-4 text-base text-[#777777] group-hover:text-primary transition-colors">
          Selengkapnya
          <ArrowRight className="w-5 h-5 ml-[10px] group-hover:ml-5 transition-all" />
        </div>
      </div>
    </Link>
  )
}
