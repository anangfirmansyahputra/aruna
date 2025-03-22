import { Link, usePage } from '@inertiajs/react'
import Logo from '../../../public/assets/logo.svg'

export default function Navbar() {
  const { locale } = usePage().props

  return (
    <div>
      <div className="flex container mx-auto justify-between py-2.5 font-medium text-base text-[#736E6E]">
        <Link href="/" className="hover:text-primary transition-colors">
          Beranda
        </Link>
        <div className="space-x-[25px]">
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Kontak
          </Link>
          <Link href="/faq" className="hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>
        <div className="space-x-[11px]">
          <Link
            href="/lang/en"
            className={`${locale === 'en' && 'text-primary'} hover:text-primary transition-colors`}
          >
            EN
          </Link>
          <Link
            href="/lang/id"
            className={`${locale === 'id' && 'text-primary'} hover:text-primary transition-colors`}
          >
            ID
          </Link>
        </div>
      </div>
      <div className="bg-primary">
        <div className=" container mx-auto flex justify-between py-2.5 items-center">
          <img src={Logo} alt="Logo" className="w-[238px]" />

          <div className="text-white font-semibold text-lg space-x-[84px]">
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Tentang
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Produk
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Berita
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Karir
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Promo
            </Link>
            <Link href="" className="hover:text-[#83AAFF] transition-colors">
              Pengajuan
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
