import Carousel from '@/components/carousel'
import Faq from '@/components/faq'
import FaqDeposito from '@/components/faq-deposito'
import SeoHead from '@/components/seo-head'
import MainLayout from '@/layouts/main-layout'
import { SEO, DepositoCarousel, DepositoStep } from '@/types';
import { Link, usePage } from '@inertiajs/react'
import { UserRound, UserRoundPlus } from 'lucide-react'

interface DepositoPageProps {
  seo: SEO | null
  carousels: DepositoCarousel[]
  steps: DepositoStep[]
}

function BannerContent({ id_title, en_title, id_description, en_description, image_url, lang }: DepositoCarousel & { lang: 'id' | 'en' }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={image_url}
          alt={id_title || en_title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 opacity-50 bg-primary"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 py-16 mx-auto max-w-[85vw] md:py-24">
        <div className="max-w-4xl space-y-8 text-center text-white">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{lang === 'id' ? id_title : en_title}</h1>
          <p className="text-base md:text-lg">{lang === 'id' ? id_description : en_description}</p>
        </div>
      </div>
    </div>
  );
}

export default function DepositoPage({ seo, carousels, steps }: DepositoPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'
  const bannerItems = carousels.map((item) => <BannerContent key={item.id} {...item} lang={lang} />);

  const sortedSteps = [...steps].sort((a, b) => a.position - b.position);

  const stepItems = sortedSteps.map((step) => ({
    id: step.id,
    number: `0${step.position}`,
    position: step.position,
    title: lang === 'id' ? step.id_title : step.en_title,
    description: lang === 'id' ? step.id_description : step.en_description,
    highlighted: step.is_highlighted,
    imageUrl: step.image_url,
  }));
  
  const rows = [];
  for (let i = 0; i < stepItems.length; i += 3) {
    rows.push(stepItems.slice(i, i + 3));
  }

  const infographicItems = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: `Infographic ${i + 1}`,
    description: `Description for infographic ${i + 1}`,
    imageUrl: `/assets/placeholder.svg`,
  }))

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    id_question: `Pertanyaan ${i + 1} dalam Bahasa Indonesia`,
    id_answer: `Jawaban untuk pertanyaan ${i + 1} dalam Bahasa Indonesia`,
    en_question: `Question ${i + 1} in English`,
    en_answer: `Answer for question ${i + 1} in English`,
  }))

  const infoItems = Array.from({ length: 2 }, (_, i) => ({
    id: i + 1,
    title: `Info Title ${i + 1}`,
    items: [{
      en: `Info Item ${i + 1} in English`,
      id: `Info Item ${i + 1} in Bahasa Indonesia`,
    }]
  }))

  return (
    <>
      <SeoHead
        url="/e-deposito"
        seo={seo}
        fallbackTitle={{
          id: 'e-Deposito',
          en: 'e-Deposito',
        }}
        fallbackDescription={{
          id: 'e-Deposito adalah produk simpanan yang memberikan kemudahan bagi nasabah untuk melakukan transaksi secara online.',
          en: 'e-Deposito is a savings product that provides convenience for customers to conduct transactions online.',
        }}
        fallbackKeywords={{
          id: 'e-deposito, deposito online, simpanan online',
          en: 'e-deposito, online deposit, online savings',
        }}
      />

      <MainLayout>
        <div className="">
          {/* Carousel Section */}
          <Carousel
            slides={bannerItems}
            autoLoop={true}
            delay={5000}
            className='w-full h-[26rem]'
            navPosition='inside'
            navClassName='z-20'
          />

          {/* Button Section */}
          <div className="md:max-w-[80vw] mx-auto py-[40px] px-5 md:px-0 my-6 md:my-10">
            <h1 className="text-xl font-semibold text-center md:text-4xl text-primary">
              Formulir Pengajuan E-Deposito
            </h1>
            <div className="grid grid-cols-1 gap-6 mt-8 md:mt-12 md:grid-cols-2 md:gap-x-10">
              <Link href="/e-deposito/form" className="w-full bg-linear-to-br from-[#46B136] to-[#78CC6B] flex items-center justify-center gap-x-4 rounded-2xl text-2xl font-semibold text-white px-8 py-8 md:text-3xl md:px-10 md:py-12 cursor-pointer hover:opacity-80 transition-all duration-300">
                <UserRoundPlus className="w-6 h-6 shrink-0 md:w-12 md:h-12" />
                <span className="text-lg md:text-3xl">Nasabah Baru</span>
              </Link>
              <Link href="/e-deposito/form" className="w-full bg-linear-to-br from-primary to-[#2B61E9] flex items-center justify-center gap-x-4 rounded-2xl text-2xl font-semibold text-white px-8 py-8 md:text-3xl md:px-10 md:py-12 cursor-pointer hover:opacity-80 transition-all duration-300">
                <UserRound className="w-6 h-6 shrink-0 md:w-12 md:h-12" />
                <span className="text-lg md:text-3xl">Nasabah BPR Aruna</span>
              </Link>
            </div>
          </div>

          {/* Steps Section */}
          <div className="bg-[#F0F4FF] py-10 md:py-16">
            <h1 className="text-xl font-semibold text-center md:text-4xl text-primary">
              Alur Pengajuan e-Deposito BPR Aruna
            </h1>
            <div className="mx-auto mt-10 max-w-7xl">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="relative mt-8">
                  {/* Horizontal connecting line for each row */}
                  <div className="absolute top-22 left-0 right-0 h-0.5 border-gray-200 border-dashed border-[1px] hidden sm:block"></div>
                  <div className="absolute left-0 z-10 hidden w-4 h-4 bg-blue-400 rounded-full top-20 sm:block"></div>
                  <div className="absolute right-0 z-10 hidden w-4 h-4 bg-blue-400 rounded-full top-20 sm:block"></div>

                  {/* Items in this row */}
                  <div className={`grid grid-cols-1 gap-8 sm:grid-cols-${row.length}`}>
                    {row.map((item) => (
                      <div key={item.number} className="flex flex-col items-center">
                        <div
                          className={`w-16 h-16 rounded-md flex items-center justify-center text-xl font-bold mb-10 shadow-md z-10 ${item.highlighted ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white" : "bg-white text-blue-600"
                            }`}
                        >
                          {item.number}
                        </div>
                        <div className="flex items-center justify-center h-32 mb-4">
                          <div className="relative w-24 h-24">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Section */}
          <div className="md:max-w-[80vw] mx-auto py-[40px] px-5 md:px-0 my-6 md:my-10">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <h1 className="w-full text-xl font-semibold text-center md:text-left md:w-1/3 md:text-4xl text-primary">
                Penting sebelum pengajuan e-Deposito
              </h1>
              <div className="w-full text-base text-gray-700 md:w-2/3 md:text-lg space-y-6">
                {infoItems.map((item) => (
                  <FaqDeposito
                    title={item.title}
                    items={item.items.map((i) => i[lang])}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Infographic Section */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {infographicItems.slice(0, 3).map((item) => (
              <div key={item.title} className="flex flex-col items-center justify-center">
                <div className="relative w-full h-40 md:h-64 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover max-h-full w-full"
                  />
                  <div className="absolute inset-0 bg-neutral-900/50" />
                  <div className="text-white absolute inset-0 flex flex-col gap-y-4 items-center justify-center">
                    <h3 className="text-center text-lg font-bold ">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-[#F0F4FF] py-10 md:py-16 px-6 md:px-12">
            <div className="md:max-w-[80vw] mx-auto">
              <h1 className="font-semibold text-xl md:text-4xl text-primary text-center">
                Fitur dan Keunggulan Produk e-Depsoito BPR Aruna
              </h1>
              <p className="md:text-lg text-[#3F4145] text-center mt-[25px]">
                e-Deposito BPR Aruna adalah rekening deposito yang pembukaan dan pencairan dapat dilakukan secara online.
              </p>
              <div className="space-y-5 mt-10">
                {faqItems.map((item) => (
                  <Faq
                    question={item[`${lang}_question`]}
                    answer={item[`${lang}_answer`]}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </MainLayout >
    </>
  )
}
