import Faq from '@/components/faq'
import SeoHead from '@/components/seo-head'
import MainLayout from '@/layouts/main-layout'
import { FAQ, SEO } from '@/types'
import { usePage } from '@inertiajs/react'

interface FaqPageProps {
  faqs: FAQ[]
  seo: SEO | null
}

export default function FaqPage({ faqs, seo }: FaqPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <>
      <SeoHead
        url="/faq"
        seo={seo}
        fallbackTitle={{
          id: 'Pertanyaan yang Sering Diajukan',
          en: 'Frequently Asked Questions',
        }}
        fallbackDescription={{
          id: 'Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan kami.',
          en: 'Find answers to frequently asked questions about our services.',
        }}
        fallbackKeywords={{
          id: 'faq, pertanyaan, bantuan',
          en: 'faq, questions, help',
        }}
      />

      <MainLayout>
        <div className="bg-[#F0F4FF]">
          <div className="container mx-auto py-10">
            <h2 className="text-[#1946B9] text-4xl font-semibold text-center">
              Ada pertanyaan? Kami siap membantu Anda!
            </h2>
            <p className="text-center text-[#3F4145] text-lg mt-5">
              Butuh penjelasan lebih lanjut? Berikut pertanyaan yang paling
              sering diajukan.
            </p>

            <div className="space-y-5 mt-10">
              {faqs.map((faq, i) => (
                <Faq
                  question={faq[`${lang}_question`]}
                  answer={faq[`${lang}_answer`]}
                  key={i}
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto pb-[45px]">
            <div className=" flex items-center justify-between p-20 bg-white rounded-[30px]">
              <div>
                <h3 className="text-[#292C31] text-4xl font-semibold">
                  Masih Butuh Bantuan?
                </h3>
                <p className="text-[#4E5B72] mt-[8px] max-w-[604px] leading-[28px]">
                  Klik tombol biru di samping ini. Anda juga dapat menghubungi
                  tim dukungan kami melalui email di info@bpraruna.com
                </p>
              </div>
              <button className="bg-primary text-white py-[16px] px-[31px] rounded-full hover:bg-primary/90 cursor-pointer transition-colors">
                Kontak Kami
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
