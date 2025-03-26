import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import HomeImage from '../../../../public/assets/home-image.png'

interface HomePageProps {
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

export default function HomePage({ products }: HomePageProps) {
  return (
    <MainLayout>
      <div className="flex container mx-auto py-[36px]">
        <div className="w-[40%]">
          <img src={HomeImage} alt="" />
        </div>
        <div className="flex-1">
          <h2 className="text-primary font-semibold text-5xl">
            Percayakan Kebutuhan Anda Oleh Kami
          </h2>
          <p>
            Mulai dari pendidikan, kesehatan, hingga modal usaha. BPR Aruna siap
            membantu Anda.
          </p>
          <div>
            <button className="text-pri">Mulai Sekarang</button>
            <button>Jelajahi Produk</button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
