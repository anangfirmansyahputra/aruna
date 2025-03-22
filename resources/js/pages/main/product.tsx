import MainLayout from '@/layouts/main-layout'
import ProductImage from '../../../../public/assets/product.png'
import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    title: 'Deposito Aruna',
    description:
      'Simpanan berjangka waktu tertentu dengan tingkat suku bunga yang sangat kompetitif, dimana penarikannya hanya dapat dilakukan berdasarkan tanggal jatuh tempo.',
    image_url: ProductImage,
  },
  {
    title: 'Deposito Aruna',
    description:
      'Simpanan berjangka waktu tertentu dengan tingkat suku bunga yang sangat kompetitif, dimana penarikannya hanya dapat dilakukan berdasarkan tanggal jatuh tempo.',
    image_url: ProductImage,
  },
  {
    title: 'Deposito Aruna',
    description:
      'Simpanan berjangka waktu tertentu dengan tingkat suku bunga yang sangat kompetitif, dimana penarikannya hanya dapat dilakukan berdasarkan tanggal jatuh tempo.',
    image_url: ProductImage,
  },
  {
    title: 'Deposito Aruna',
    description:
      'Simpanan berjangka waktu tertentu dengan tingkat suku bunga yang sangat kompetitif, dimana penarikannya hanya dapat dilakukan berdasarkan tanggal jatuh tempo.',
    image_url: ProductImage,
  },
  {
    title: 'Deposito Aruna',
    description:
      'Simpanan berjangka waktu tertentu dengan tingkat suku bunga yang sangat kompetitif, dimana penarikannya hanya dapat dilakukan berdasarkan tanggal jatuh tempo.',
    image_url: ProductImage,
  },
]

export default function ProductPage() {
  return (
    <MainLayout>
      <div className="pt-10 pb-[84px]">
        <h2 className="text-primary text-5xl font-semibold text-center">
          Produk Dari Kami
        </h2>
        <p className="text-center mt-5 text-lg text-[#3F4145]">
          Anda Selalu bisa berhemat dengan produk - produk yang kami miliki
        </p>

        <div className="grid grid-cols-3 mt-10 gap-[50px]">
          {products.map((product, index) => (
            <div key={index}>
              <img
                src={product.image_url}
                className="w-full rounded-lg"
                alt={product.title}
              />
              <h3 className="text-black text-xl font-semibold mt-4">
                {product.title}
              </h3>
              <p className="mt-1 text-[#777777] text-base">
                {product.description}
              </p>

              <Link
                href=""
                className="flex items-center mt-4 text-base text-[#777777] group hover:text-primary transition-colors"
              >
                Selengkapnya
                <ArrowRight className="w-5 h-5 ml-[10px] group-hover:ml-5 transition-all" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
