import MainLayout from '@/layouts/main-layout'
import { Article, Product, ProductTranslation, SEO } from '@/types'
import HomeImage from '../../../../public/assets/home-image.png'
import ImageOne from '../../../../public/assets/image-about-one.png'
import ImageTwo from '../../../../public/assets/image-about-two.png'
import ArticleBig from '../../../../public/assets/article-big.png'
import ArticleOne from '../../../../public/assets/article-one.png'
import { ArrowRight, MoveUpRight } from 'lucide-react'
import ProductCard from '@/components/product-card'
import { Link, usePage } from '@inertiajs/react'
import SeoHead from '@/components/seo-head'

interface HomePageProps {
  products: (Product & {
    translations: ProductTranslation[]
  })[]
  seo: SEO | null
  articles: Article[]
}

export default function HomePage({ products, seo, articles }: HomePageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <>
      <SeoHead
        seo={seo}
        fallbackTitle={{
          id: 'Beranda',
          en: 'Home',
        }}
        fallbackDescription={{
          id: 'Selamat datang di situs resmi kami. Temukan layanan dan informasi terbaik di sini.',
          en: 'Welcome to our official website. Discover our best services and information here.',
        }}
        fallbackKeywords={{
          id: 'beranda, layanan, informasi',
          en: 'home, services, information',
        }}
      />

      <MainLayout>
        <div className="flex lg:flex-row flex-col container mx-auto py-[36px] sm:px-0 px-5">
          <div className="w-[60%] xl:w-[40%] mx-auto lg:mx-0">
            <img src={HomeImage} alt="" className="w-full" />
          </div>
          <div className="flex-1 py-5 md:py-[75px]">
            <h2 className="text-primary lg:text-start text-center font-semibold text-2xl md:text-5xl md:leading-[70px] lg:max-w-[650px]">
              Percayakan Kebutuhan Anda Oleh Kami
            </h2>
            <p className="mt-[12px] md:mt-[27px] tracking-wide md:leading-[40px] lg:text-start text-center">
              Mulai dari pendidikan, kesehatan, hingga modal usaha. BPR Aruna
              siap membantu Anda.
            </p>
            <div className="mt-5 md:mt-[27px] space-x-5 flex items-center justify-center lg:justify-start">
              <button className="cursor-pointer text-white bg-primary px-[15px] py-[10px] md:px-[30px] md:py-[17px]  font-semibold text-sm md:text-lg rounded-xl">
                Mulai Sekarang
              </button>
              <button className="text-primary border border-primary text-sm md:text-lg px-[15px] py-[10px] md:px-[30px] md:py-[17px]  font-semibold cursor-pointer rounded-xl">
                Jelajahi Produk
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#F5FAFF]">
          <div className="container mx-auto py-[50px] flex md:flex-row flex-col gap-[50px] md:gap-[104px] sm:px-0 px-5">
            <div className="flex-1 flex justify-center flex-col items-center md:items-start md:order-1 order-2">
              <h1 className="text-primary text-2xl md:text-5xl font-semibold">
                PT. BPR ARUNA
              </h1>
              <p className="md:text-lg text-[#413C3C] mt-[20px] tracking-wider md:text-start text-center">
                PT BPR Aruna (“BPR Aruna”) adalah bank perekonomian rakyat yang
                didirikan pada tahun 1992. Sejak awal berdirinya hingga saat
                ini, BPR Aruna secara konsisten terus berperan aktif dalam
                membantu dan meningkatkan usaha yang ditekuni oleh masyarakat
                khususnya untuk jenis usaha yang tergolong dalam Usaha Mikro
                Kecil Menengah (UMKM).
              </p>
              <button className="md:text-base text-sm bg-primary flex items-center gap-2 rounded-xl mt-10 text-white px-[15px] md:px-[30px] py-[10px] md:py-[16px]">
                <span>Baca Selengkapnya</span>
                <MoveUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full md:w-[40%] space-y-5">
              <img
                src={ImageOne}
                alt=""
                className="aspect-video w-full rounded-3xl object-cover"
              />
              <img
                src={ImageTwo}
                alt=""
                className="aspect-video w-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="pt-10 pb-[84px] container mx-auto sm:px-0 px-5">
          <h2 className="text-primary text-2xl md:text-5xl font-semibold text-center">
            Produk Dari Kami
          </h2>
          <p className="text-center mt-5 md:text-lg text-[#3F4145]">
            Anda Selalu bisa berhemat dengan produk - produk yang kami miliki
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 md:gap-[50px]">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

          <div className="flex items-center justify-center mt-7 md:mt-[60px]">
            <Link
              href="/products"
              className="flex items-center text-primary text-base md:text-lg font-semibold group"
            >
              Lihat selengkapnya{' '}
              <ArrowRight className="w-5 h-5 ml-[10px] group-hover:ml-5 transition-all" />
            </Link>
          </div>
        </div>

        <div className="bg-[#F0F4FF]">
          <div className="container mx-auto py-[50px] sm:px-0 px-5">
            <h2 className="text-2xl md:text-5xl text-primary font-semibold text-center">
              Berita Terbaru
            </h2>
            <p className="md:text-lg text-[#3F4145] text-center mt-5">
              Dapatkan info terbaru seputar keuangan pribadi, mulai dari tips
              anggaran dan investasi hingga kabar perbankan digital dan
              teknologi finansial.
            </p>

            <div className="grid xl:grid-cols-5 aspect-retro gap-[56px] mt-[60px]">
              {articles[0] && (
                <div className="hidden xl:flex col-span-2 flex-col rounded-t-3xl bg-white h-full">
                  <img
                    src={articles[0].image_url}
                    alt=""
                    className="w-full object-cover h-[80%]"
                  />
                  <div className="bg-white p-5 flex-1">
                    <div className="text-[#736E6E] space-x-2">
                      {articles[0].created_at}
                    </div>

                    <h5 className="text-2xl mt-[15px]">
                      {articles[0][`${lang}_title`]}
                    </h5>
                  </div>
                </div>
              )}

              <div className="col-span-5 xl:col-span-3 flex-1 space-y-[38px]">
                {articles.slice(1, 3).map((article, index) => (
                  <div key={index} className="flex bg-white rounded-3xl">
                    <div>
                      <img src={article.image_url} alt="" className="" />
                    </div>
                    <div className="w-[90%] p-5 flex flex-col justify-center">
                      <div className="text-[#736E6E] md:text-base text-xs space-x-2">
                        {article.created_at}
                      </div>

                      <h5 className="text-sm md:text-2xl mt-[15px]">
                        {article[`${lang}_title`]}
                      </h5>
                      <p className="mt-[15px] text-[#736E6E] md:block hidden">
                        {article[`${lang}_meta_description`]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center mt-[60px]">
              <Link
                href="/products"
                className="flex items-center text-primary text-lg font-semibold group"
              >
                Lihat Semua Artikel
                <ArrowRight className="w-5 h-5 ml-[10px] group-hover:ml-5 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#184394] py-[50px] text-">
          <h6 className="max-w-[758px] text-white text-center mx-auto text-xl md:text-3xl font-semibold">
            Rasakan proses pencairan yang cepat dengan memenuhi persyaratan yang
            tersedia
          </h6>

          <div className="flex items-center justify-center mt-[25px]">
            <button className="text-[#184394] text-sm md:text-lg font-semibold bg-white py-[10px] md:py-[17px] px-[15px] md:px-[30px] rounded-2xl cursor-pointer hover:bg-white/90 transition-colors">
              Dapatkan Sekarang
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
