import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import HomeImage from '../../../../public/assets/home-image.png'
import ImageOne from '../../../../public/assets/image-about-one.png'
import ImageTwo from '../../../../public/assets/image-about-two.png'
import ArticleBig from '../../../../public/assets/article-big.png'
import ArticleOne from '../../../../public/assets/article-one.png'
import { ArrowRight, MoveUpRight } from 'lucide-react'
import ProductCard from '@/components/product-card'
import { Link } from '@inertiajs/react'

interface HomePageProps {
  products: (Product & {
    translations: ProductTranslation[]
  })[]
}

const articles = [
  {
    createdAt: new Date(),
    title:
      'Berkarya dengan Komitmen, BPR Aruna Buka Kantor di Denpasar Siap Bangun Ekonomi Kerakyatan',
    meta_description:
      'Kredit fasilitas pinjaman jangka pendek untuk pembiayaan modal kerja dengan jangka waktu maksimal 1 tahun',
    image_url: ArticleOne,
  },
  {
    createdAt: new Date(),
    title:
      'Berkarya dengan Komitmen, BPR Aruna Buka Kantor di Denpasar Siap Bangun Ekonomi Kerakyatan',
    meta_description:
      'Kredit fasilitas pinjaman jangka pendek untuk pembiayaan modal kerja dengan jangka waktu maksimal 1 tahun',
    image_url: ArticleOne,
  },
]

export default function HomePage({ products }: HomePageProps) {
  return (
    <MainLayout>
      <div className="flex container mx-auto py-[36px]">
        <div className="w-[40%]">
          <img src={HomeImage} alt="" className="w-full" />
        </div>
        <div className="flex-1 py-[75px]">
          <h2 className="text-primary font-semibold text-5xl leading-[70px] max-w-[650px]">
            Percayakan Kebutuhan Anda Oleh Kami
          </h2>
          <p className="mt-[27px] tracking-wide leading-[40px]">
            Mulai dari pendidikan, kesehatan, hingga modal usaha. BPR Aruna siap
            membantu Anda.
          </p>
          <div className="mt-[27px] space-x-5">
            <button className="cursor-pointer text-white bg-primary px-[30px] py-[17px] font-semibold text-lg rounded-xl">
              Mulai Sekarang
            </button>
            <button className="text-primary border border-primary text-lg px-[30px] py-[17px] font-semibold cursor-pointer rounded-xl">
              Jelajahi Produk
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#F5FAFF]">
        <div className="container mx-auto py-[50px] flex gap-[104px]">
          <div className="flex-1 flex justify-center flex-col items-start">
            <h1 className="text-primary text-5xl font-semibold">
              PT. BPR ARUNA
            </h1>
            <p className="text-lg text-[#413C3C] mt-[20px] tracking-wider">
              PT BPR Aruna (“BPR Aruna”) adalah bank perekonomian rakyat yang
              didirikan pada tahun 1992. Sejak awal berdirinya hingga saat ini,
              BPR Aruna secara konsisten terus berperan aktif dalam membantu dan
              meningkatkan usaha yang ditekuni oleh masyarakat khususnya untuk
              jenis usaha yang tergolong dalam Usaha Mikro Kecil Menengah
              (UMKM).
            </p>
            <button className="bg-primary flex items-center gap-2 rounded-xl mt-10 text-white px-[30px] py-[16px]">
              <span>Baca Selengkapnya</span>
              <MoveUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="w-[40%] space-y-5">
            <img
              src={ImageOne}
              alt=""
              className="aspect-video w-full rounded-2xl object-cover"
            />
            <img
              src={ImageTwo}
              alt=""
              className="aspect-video w-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

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

        <div className="flex items-center justify-center mt-[60px]">
          <Link
            href="/products"
            className="flex items-center text-primary text-lg font-semibold group"
          >
            Lihat selengkapnya{' '}
            <ArrowRight className="w-5 h-5 ml-[10px] group-hover:ml-5 transition-all" />
          </Link>
        </div>
      </div>

      <div className="bg-[#F0F4FF]">
        <div className="container mx-auto py-[50px]">
          <h2 className="text-5xl text-primary font-semibold text-center">
            Berita Terbaru
          </h2>
          <p className="text-lg text-[#3F4145] text-center mt-5">
            Dapatkan info terbaru seputar keuangan pribadi, mulai dari tips
            anggaran dan investasi hingga kabar perbankan digital dan teknologi
            finansial.
          </p>

          <div className="grid grid-cols-5 gap-[56px] mt-[60px]">
            <div className="col-span-2 flex flex-col rounded-t-2xl bg-white">
              <img src={ArticleBig} alt="" className="w-full object-cover" />
              <div className="bg-white p-5">
                <div className="text-[#736E6E] space-x-2">
                  <span>21 Feb 2025</span>
                  <span>|</span>
                  <span>Berita</span>
                </div>

                <h5 className="text-2xl mt-[15px]">
                  Digitalisasi Bank Aruna bersama Komunal Deposito BPR
                </h5>
              </div>
            </div>

            <div className="col-span-3 flex-1 space-y-[38px]">
              {articles.map((article, index) => (
                <div key={index} className="flex bg-white h-fit">
                  <img
                    src={article.image_url}
                    alt=""
                    className="w-[30%] object-cover rounded-2xl"
                  />
                  <div className="p-5 h-fit">
                    <div className="text-[#736E6E] space-x-2">
                      <span>21 Feb 2025</span>
                      <span>|</span>
                      <span>Berita</span>
                    </div>

                    <h5 className="text-2xl mt-[15px]">{article.title}</h5>
                    <p className="mt-[15px] text-[#736E6E]">
                      {article.meta_description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
