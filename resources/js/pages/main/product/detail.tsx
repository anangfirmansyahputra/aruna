import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  DollarSign,
  Percent,
} from 'lucide-react'
import Currency from '../../../../../public/assets/currency.svg'
import PercentIcon from '../../../../../public/assets/percent.svg'
import Timer from '../../../../../public/assets/timer.svg'
import Calculator from '../../../../../public/assets/calculator.svg'
import CalendarIcon from '../../../../../public/assets/calendar.svg'
import FaqProduct from '@/components/faq-product'
import { Head, usePage } from '@inertiajs/react'

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

export default function DetailProductPage({ product }: DetailProductPageProps) {
  const appUrl = import.meta.env.APP_URL

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
                  Ajukan Sekarang
                  <ArrowRight className="ml-2" />
                </button>

                <button className="text-primary border border-primary bg-white rounded-2xl font-semibold py-3.5 px-[34px] flex items-start cursor-pointer">
                  Simulasi Kredit
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

              <button className="bg-[#3387EC] text-white flex items-center justify-center cursor-pointer rounded-[10px]">
                <span className="text-lg font-semibold">Hitung Simulasi</span>
                <ChevronRight className="ml-2.5" />
              </button>
            </div>

            <p className="text-white font-medium mt-10">
              *Kalkulator ini dirancang hanya sebagai simulasi kredit belaka.
              Untuk lebih lanjut silahkan hubungi bank pemberi pinjaman.
            </p>
          </div>
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
      </MainLayout>
    </>
  )
}
