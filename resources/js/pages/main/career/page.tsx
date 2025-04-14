import MainLayout from '@/layouts/main-layout'
import CareerImage from '../../../../../public/assets/career.png'
import { ArrowRight } from 'lucide-react'
import SeoHead from '@/components/seo-head'
import { SEO } from '@/types'
import { Link } from '@inertiajs/react'

interface CareerPageProps {
  seo: SEO | null
}

export default function CareerPage({ seo }: CareerPageProps) {
  return (
    <>
      <SeoHead
        url="/careers"
        seo={seo}
        fallbackTitle={{
          id: 'Karier',
          en: 'Careers',
        }}
        fallbackDescription={{
          id: 'Bergabunglah bersama tim kami dan kembangkan kariermu bersama kami.',
          en: 'Join our team and grow your career with us.',
        }}
        fallbackKeywords={{
          id: 'karier, lowongan, pekerjaan',
          en: 'career, job, vacancy',
        }}
      />
      <MainLayout>
        <div className="bg-[#F0F4FF] pb-20 2xl:pb-0 lg:px-0 px-5">
          <div className="container mx-auto flex lg:flex-row flex-col">
            <div className="xl:py-0 py-10 lg:w-[45%]">
              <img
                src={CareerImage}
                alt=""
                className="w-full object-cover md:-mt-18 xl:-mt-0 2xl:-mt-18"
              />
            </div>
            <div className="flex-1 space-y-[25px] lg:-mt-0 -mt-20">
              <h2 className="text-xl md:text-4xl font-semibold text-[#1946B9] lg:max-w-[645px] lg:mt-[165px] md:text-start text-center">
                Wujudkan Masa Depan Cerah dengan Karir Impian di Sini
              </h2>
              <p className="text-sm md:text-lg text-[#3F4145] md:text-start text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                quia iusto obcaecati, quo commodi deleniti, atque iure ex
                dolorem odio quisquam. Quisquam delectus blanditiis rerum
                aperiam accusamus? Ducimus molestias laborum maxime iste, rerum
                quaerat ipsa, repellat est, vitae officia natus cupiditate iure.
                Autem placeat cupiditate veritatis quo error ab dolor?
              </p>
              <Link
                href="/careers/all"
                className="bg-[#1946B9] w-fit rounded-lg text-white font-bold py-[11px] px-[24px] flex items-center mb-10 lg:mb-0 md:mx-0 mx-auto"
              >
                Lamar Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:px-0 px-5 md:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[60px] container mx-auto py-[75px]">
          <div className="bg-[#F6F7F9] 2xl:aspect-[16/12] flex flex-col items-center justify-center space-y-[25px] py-[45px] px-5 border-[13px] border-[#D7DDE3] rounded-3xl h-full">
            <p className="text-[#24252C] font-semibold text-5xl lg:text-7xl">
              12K+
            </p>
            <p className="text-[#24252C] font-semibold text-lg lg:text-2xl">
              Point 1
            </p>
            <p className="text-[#24252C] text-base md:text-base text-sm lg:text-lg text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, ullam!
            </p>
          </div>

          <div className="bg-[#1946B9] flex flex-col items-center justify-center space-y-[25px] py-[45px] px-5 border-[13px] border-[#D7DDE3] rounded-3xl">
            <p className="text-[#fff] font-semibold text-5xl lg:text-7xl">
              55+
            </p>
            <p className="text-[#fff] font-semibold md:text-base text-sm lg:text-lg lg:text-2xl">
              Point 2
            </p>
            <p className="text-[#fff] text-lg text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, ullam!
            </p>
          </div>

          <div className="bg-[#F6F7F9] flex flex-col items-center justify-center space-y-[25px] py-[45px] px-5 border-[13px] border-[#D7DDE3] rounded-3xl">
            <p className="text-[#24252C] font-semibold text-5xl lg:text-7xl">
              98%
            </p>
            <p className="text-[#24252C] font-semibold text-lg lg:text-2xl">
              Point 3
            </p>
            <p className="text-[#24252C] md:text-base text-sm lg:text-lg text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, ullam!
            </p>
          </div>
        </div>

        <div className="bg-[#F0F4FF]  lg:px-0 px-5">
          <div className="grid md:grid-cols-2 gap-5 md:gap-[60px] mx-auto py-[50px] container">
            <div>
              <div className="aspect-video bg-[#C4C4C4] rounded-3xl" />
            </div>
            <div className="space-y-5 flex flex-col justify-center">
              <h5 className="text-primary text-xl md:text-4xl font-semibold md:text-start text-center">
                Maksimalkan Potensimu untuk Menjadi yang Terbaik
              </h5>
              <p className="text-[#413C3C] text-sm md:text-lg md:text-start text-center">
                Kami percaya karyawan adalah aset berharga dan kunci kesuksesan.
                Kami mencari profesional termotivasi, dinamis, dan bertanggung
                jawab untuk berkembang bersama tim hebat kami.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-[50px] lg:px-0 px-5">
          <h6 className="text-xl md:text-4xl font-semibold text-primary text-center ">
            Berkarir Bersama Kami
          </h6>
          <p className="text-sm md:text-lg text-center text-[#413C3C] mt-5">
            Bergabunglah dengan tim dinamis dan inovatif! Temukan peluang
            berkembang, tantangan inspiratif, dan lingkungan kerja yang
            mendukung kesuksesan karier Anda.
          </p>

          <div className="relative mt-[60px] bg-[#1946B9] md:gap-0 gap-5 flex md:flex-row flex-col items-center justify-between py-10 px-5 md:py-[87.5px] md:px-[70px] rounded-3xl overflow-hidden">
            <p className="text-white font-semibold text-xl md:text-5xl md:max-w-[733px] leading-[150p] z-1">
              Gabung Bersama Kami dan Wujudkan Karir Impianmu!
            </p>
            <button className="hover:bg-white/90 transition-colors rounded-2xl z-1 text-primary bg-white md:py-[17px] py-[10px] px-[15px] md:px-[30px] font-semibold text-sm md:text-lg cursor-pointer">
              Cari Karir
            </button>

            <div className="absolute bg-[#2B61E9] w-1/2 h-[200%] -right-[8%] z-0 rotate-[40deg] -top-[150%] rounded-[101px]" />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
