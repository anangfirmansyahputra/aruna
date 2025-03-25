import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  DollarSign,
  Percent,
  Plus,
  X,
} from 'lucide-react'
import Currency from '../../../../../public/assets/currency.svg'
import PercentIcon from '../../../../../public/assets/percent.svg'
import Timer from '../../../../../public/assets/timer.svg'
import Calculator from '../../../../../public/assets/calculator.svg'
import CalendarIcon from '../../../../../public/assets/calendar.svg'
import FaqProduct from '@/components/faq-product'
import { Head, usePage } from '@inertiajs/react'
import { getTranslate } from '@/lib/lang'
import WhiteCurrency from '../../../../../public/assets/white-currency.svg'
import React from 'react'
import Faq from '@/components/faq'

interface DetailProductPageProps {
  product: ProductTranslation & {
    product: Product
  }
}

const faqs = [
  {
    title: 'Syarat utama calon debitur',
    items: [
      'Usaha Debitur masih berjalan dan telah berjalan selama minimal 1 tahun.',
      'Bukan merupakan jenis usaha yang ilegal atau jenis usaha yang dilarang.',
      'Usia minimal 21 tahun atau 18 tahun jika sudah menikah.',
      'Umur maksimal 60 tahun pada saat fasilitas kredit berakhir.',
      'Warga Negara Indonesia.',
      'Memiliki riwayat pinjaman yang baik (bagi yang pernah/memiliki pinjaman).',
    ],
  },
  {
    title: 'Dokumen yang wajib dipenuhi',
    items: ['Anang', 'Firmansyah'],
  },
]

const calculatorResults = [
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
  {
    periode: 'Jan 2025',
    interest_rate: '0,00',
    interest_rate_pokok: '0,00',
    total_angsuran: '0,00',
    sisa_pinjaman: '100.000.000,00',
  },
]

const faqProducts = [
  {
    title: 'Apa itu Bank BPR Aruna',
    description:
      'Bank BPR Aruna merupakan sebuah BPR (Bank Perkreditan Rakyat) yang melayani penghimpunan dana simpanan dari masyarakat dan penyaluran kredit bagi para pengusaha, perusahaan dan individu. Dana simpanan dari masyarakat dalam bentuk deposito serta tabungan, dan penyaluran kredit berupa kredit untuk modal usaha maupun untuk kredit pribadi masyarakat.',
  },
  {
    title: 'Berapa persen besar suku bunga tabungan BPR?',
    description: '',
  },
  {
    title: 'Berapa persen besar suku bunga tabungan BPR?',
    description: '',
  },
  {
    title: 'Berapa persen besar suku bunga tabungan BPR?',
    description: '',
  },
]

export default function DetailProductPage({ product }: DetailProductPageProps) {
  const appUrl = import.meta.env.APP_URL || 'http://127.0.0.1:8000'
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'
  const [showResultCalculator, setShowResultCalculator] = React.useState(false)

  return (
    <>
      <Head title={product.name}>
        {/* Meta Standar */}
        <meta name="description" content={product.meta_descriptions} />
        <meta name="keywords" content={product.keywords} />
        <meta name="author" content="Nama Brand atau Author" />

        {/* Meta Open Graph (SEO + Social Media) */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.meta_descriptions} />
        <meta property="og:image" content={product.product.image_url} />
        <meta
          property="og:url"
          content={`${appUrl}/products/${product.slug}`}
        />
        <meta property="og:site_name" content="Nama Website" />

        {/* Meta Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.meta_descriptions} />
        <meta name="twitter:image" content={product.product.image_url} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${appUrl}/products/${product.slug}`} />
      </Head>

      <MainLayout>
        <div className="container mx-auto py-[52px]">
          <div className="flex gap-[112px] items-center justify-center">
            <img
              src={product.product.image_url}
              className="rounded-full object-cover w-[474px] h-[474px] border-[2px] border-[#1946B9] p-2 border-dashed"
            />

            <div>
              <div className="w-fit bg-[#83AAFF] text-[#FFFFFF] py-[5px] px-[15px] rounded-full">
                <h4>{product.name}</h4>
              </div>
              <h2 className="text-4xl font-semibold text-primary mt-3 max-w-[645px] leading-11">
                {product.heading_one}
              </h2>
              <p className="text-lg text-[#3F4145] mt-[30px] max-w-[645px]">
                {product.heading_two}
              </p>

              <div className="mt-[30px] flex gap-[25px]">
                <button className="bg-primary text-white rounded-2xl font-semibold py-3.5 px-[34px] flex items-start cursor-pointer">
                  {getTranslate(lang as 'id' | 'en', 'apply_now')}
                  <ArrowRight className="ml-2" />
                </button>

                <button className="text-primary border border-primary bg-white rounded-2xl font-semibold py-3.5 px-[34px] flex items-start cursor-pointer">
                  {getTranslate(lang, 'credit_simulation')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F4FF] mt-10 py-10">
          <h3 className="text-primary text-center text-4xl font-semibold">
            Fitur Kredit Investasi
          </h3>
          <p className="text-lg text-[#141515] text-center mt-2">
            Beberapa fitur yang kami miliki pada produk kredit investasi
          </p>

          <div className="grid grid-cols-3 gap-4 container mx-auto mt-10">
            <div className="bg-white rounded-[10px] flex flex-col justify-between items-center px-[52px] py-10">
              <div className="p-[22px] bg-[#F8F9F9] rounded-full">
                <DollarSign className="text-[#3387EC]" />
              </div>
              <p className="text-[#141515] font-medium text-xl mt-3.5 text-center">
                Plafond
              </p>
              <p className="text-[#8F9090] mt-3.5 text-center">
                Pinjaman tersedia mulai dari Rp100 juta hingga maksimal Rp2,5
                miliar.
              </p>
            </div>

            <div className="bg-white rounded-[10px] flex flex-col justify-between items-center px-[52px] py-10">
              <div className="p-[22px] bg-[#F8F9F9] rounded-full">
                <Calendar className="text-[#3387EC]" />
              </div>
              <p className="text-[#141515] font-medium text-xl mt-3.5 text-center">
                Jangka Waktu Panjang
              </p>
              <p className="text-[#8F9090] mt-3.5 text-center">
                Nikmati jangka waktu pinjaman yang fleksibel hingga 7 tahun
              </p>
            </div>

            <div className="bg-white rounded-[10px] flex flex-col justify-between items-center px-[52px] py-10">
              <div className="p-[22px] bg-[#F8F9F9] rounded-full">
                <Percent className="text-[#3387EC]" />
              </div>
              <p className="text-[#141515] font-medium text-xl mt-3.5 text-center">
                Suku bunga menarik
              </p>
              <p className="text-[#8F9090] mt-3.5 text-center">
                Dapatkan suku bunga kompetitif untuk pembayaran lebih ringan dan
                terjangkau.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-[50px]">
          <div className="bg-primary container mx-auto py-8 px-11 rounded-4xl">
            <h4 className="text-white font-semibold text-3xl">
              Kalkulator Pinjaman - Kredit Investasi
            </h4>
            <p className="text-xl text-white">Simulasi Kredit</p>

            <div className="grid grid-cols-3 mt-10 gap-3.5">
              <div className="bg-white p-3 flex gap-4 rounded-[10px]">
                <img src={Currency} />

                <div>
                  <p className="text-sm">Jumlah Pinjaman</p>
                  <p className="text-lg">100.000.000</p>
                </div>
              </div>

              <div className="bg-white p-3 flex gap-4 rounded-[10px]">
                <img src={Timer} />

                <div>
                  <p className="text-sm">Lama Pinjaman</p>
                  <p className="text-lg">12 Bulan</p>
                </div>
              </div>

              <div className="bg-white p-3 flex gap-4 rounded-[10px]">
                <img src={PercentIcon} />

                <div>
                  <p className="text-sm">Suku Bunga per Tahun</p>
                  <p className="text-lg">6 %</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3.5 mt-3.5">
              <div className="bg-white p-3 flex gap-4 rounded-[10px] col-span-2">
                <img src={Calculator} />

                <div>
                  <p className="text-sm">Perhitungan Bunga</p>
                  <p className="text-lg">Anuitas</p>
                </div>
              </div>

              <div className="bg-white p-3 flex gap-4 rounded-[10px] col-span-2">
                <img src={CalendarIcon} />

                <div>
                  <p className="text-sm">Mulai Meminjam</p>
                  <p className="text-lg">Januari 2025</p>
                </div>
              </div>

              <button
                onClick={() => setShowResultCalculator(true)}
                className="bg-[#3387EC] hover:bg-[#3387EC]/90 transition-colors text-white flex items-center justify-center cursor-pointer rounded-[10px]"
              >
                <span className="text-lg font-semibold">Hitung Simulasi</span>
                <ChevronRight className="ml-2.5" />
              </button>
            </div>

            <p className="text-white font-medium mt-10">
              *Kalkulator ini dirancang hanya sebagai simulasi kredit belaka.
              Untuk lebih lanjut silahkan hubungi bank pemberi pinjaman.
            </p>
          </div>

          {showResultCalculator && (
            <motion.div
              className="mt-12 container mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-3">
                <div className="bg-primary py-[124px] text-white flex flex-col items-center justify-center rounded-tl-2xl">
                  <div className="flex gap-3.5 mb-3">
                    <img src={WhiteCurrency} />
                    <span className="font-semibold text-2xl">
                      Angsuran Cicilan per Bulan
                    </span>
                  </div>
                  <p className="font-semibold text-5xl">8.833.333,33</p>
                </div>
                <div className="col-span-2 bg-[#F0F4FF] py-[51px] px-[67px] rounded-tr-2xl relative">
                  <h5 className="text-2xl font-semibold text-primary mb-[31px]">
                    Total Angsuran Per Bulan
                  </h5>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                      <p className="col-span-2">Nominal (Rp)</p>
                      <p className="">100.000.000,00</p>
                    </div>
                    <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                      <p className="col-span-2">Jangka Waktu (Bulan)</p>
                      <p className="">12 Bulan</p>
                    </div>
                    <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                      <p className="col-span-2">Suku bunga per Tahun</p>
                      <p className="">6.00%</p>
                    </div>
                    <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                      <p className="col-span-2">Tipe bunga yang digunakan</p>
                      <p className="">Anuitas</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowResultCalculator(false)}
                    className="absolute top-5 right-5 cursor-pointer text-primary hover:text-primary/90 transition-colors"
                  >
                    <X />
                  </button>
                </div>
              </div>

              <motion.table
                className="w-full shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <thead className="bg-[#64AAFF]">
                  <tr className="text-white font-semibold text-lg">
                    <th className="py-[23px]">Periode</th>
                    <th className="py-[23px]">Angsuran Bunga</th>
                    <th className="py-[23px]">Angsuran Pokok</th>
                    <th className="py-[23px]">Total Angsuran</th>
                    <th className="py-[23px]">Sisa Pinjaman</th>
                  </tr>
                </thead>
                <tbody>
                  {calculatorResults.map((item, i) => (
                    <motion.tr
                      key={i}
                      className={`${
                        i % 2 === 1 ? 'bg-[#1946B9]/10' : 'bg-white'
                      } text-primary text-lg font-semibold`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <td className="text-center py-[23px]">{item.periode}</td>
                      <td className="text-center py-[23px]">
                        {item.interest_rate}
                      </td>
                      <td className="text-center py-[23px]">
                        {item.interest_rate_pokok}
                      </td>
                      <td className="text-center py-[23px]">
                        {item.total_angsuran}
                      </td>
                      <td className="text-center py-[23px]">
                        {item.sisa_pinjaman}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </motion.div>
          )}
        </div>

        <div className="bg-[#F0F4FF]">
          <div className="container mx-auto py-9">
            <h4 className="text-4xl font-semibold text-primary text-center">
              Persyaratan Yang Perlu Diketahui
            </h4>
            <p className="mt-5 text-center text-lg">
              Calon Debitur wajib memenuhi persyaratan yang ada untuk dapat
              diberikan fasilitas kredit, sebagai berikut
            </p>

            <div className="space-y-[25px] mt-[25px]">
              {faqs.map((faq, index) => (
                <FaqProduct {...faq} key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <h2 className="text-[#1946B9] text-4xl font-semibold text-center">
            Ada pertanyaan? Kami siap membantu Anda!
          </h2>
          <p className="text-center text-[#3F4145] text-lg mt-5">
            Butuh penjelasan lebih lanjut? Berikut pertanyaan yang paling sering
            diajukan.
          </p>

          <div className="space-y-5">
            {faqProducts.map((faq, i) => (
              <Faq {...faq} key={i} />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}
