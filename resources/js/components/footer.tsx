import { Mail, MapPin, Phone } from 'lucide-react'
import Whatsapp from '../../../public/assets/whatsapp.svg'
import Facebook from '../../../public/assets/facebook.svg'
import Instagram from '../../../public/assets/instagram.svg'
import Linkedin from '../../../public/assets/linkedin.svg'
import Logo from '../../../public/assets/logo.svg'
import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto py-9">
        <div className="grid grid-cols-4">
          <div className="text-[#fefefe]">
            <p>Kantor Pusat</p>
            <p className="mt-3.5">PT BPR Aruna Nirmaladuta</p>
            <p className="mt-1">Jl. Dharma Giri No. 99, Gianyar – Bali</p>
            <div className="mt-5 flex items-center gap-1.5">
              <MapPin />
              <p className="text-lg">Lokasi Lainnya</p>
            </div>
          </div>

          <div className="text-[#fefefe]">
            <p>Hubungi Kami</p>
            <div className="mt-3.5 flex items-center gap-2.5">
              <Phone /> <span>0361 8958344</span>
            </div>
            <div className="mt-3.5 flex items-center gap-2.5">
              <Mail /> <span>info@bpraruna.com</span>
            </div>
            <div className="mt-3.5 flex items-center gap-2.5">
              <img src={Whatsapp} className="w-6" alt="Whatsapp Logo" />{' '}
              <span>62 819 3929 6667</span>
            </div>
          </div>

          <div className="text-[#fefefe]">
            <p>Media Sosial</p>
            <Link href="" className="flex items-center gap-2.5 mt-3.5">
              <img src={Facebook} className="w-6" alt="Facebook Logo" /> BPR
              Aruna
            </Link>
            <Link href="" className="flex items-center gap-2.5 mt-3.5">
              <img src={Instagram} className="w-6" alt="Instagram Logo" /> BPR
              Aruna
            </Link>
            <Link href="" className="flex items-center gap-2.5 mt-3.5">
              <img src={Linkedin} className="w-6" alt="Linkedin Logo" /> BPR
              Aruna
            </Link>
          </div>

          <div className="text-[#fefefe]">
            <p>Dapatkan promo dan penawaran terbaik dari kami</p>
            <div className="mt-3.5 bg-white rounded-full py-1 flex justify-between px-1 w-fit gap-5">
              <button className="text-[#003034] cursor-pointer py-2 px-3.5">
                Email
              </button>
              <button className="bg-primary py-2 px-3.5 rounded-full cursor-pointer">
                Langganan
              </button>
            </div>
          </div>
        </div>

        <div className="mt-9 flex gap-9 items-center justify-center">
          <img src={Logo} className="w-[189px]" />
          <div className="bg-white w-fit p-2 rounded-full space-x-3.5">
            <Link
              href=""
              className="text-[#fefefe] bg-[#1E5AF5] rounded-full p-2 px-3.5 inline-block"
            >
              Beranda
            </Link>

            <Link
              href=""
              className="text-primary rounded-full p-2 px-3.5 inline-block"
            >
              Tentang
            </Link>

            <Link
              href=""
              className="text-primary rounded-full p-2 px-3.5 inline-block"
            >
              Produk
            </Link>

            <Link
              href=""
              className="text-primary rounded-full p-2 px-3.5 inline-block"
            >
              Berita
            </Link>

            <Link
              href=""
              className="text-primary rounded-full p-2 px-3.5 inline-block"
            >
              Karir
            </Link>

            <Link
              href=""
              className="text-primary rounded-full p-2 px-3.5 inline-block"
            >
              Promo
            </Link>
          </div>
        </div>

        <div className="pt-2.5 border-t border-white mt-9 text-[#fefefe] flex justify-between">
          <p>© 2025 - PT BPR Aruna Nirmaladuta</p>
          <div className="space-x-11">
            <Link href="">Terms & Conditions</Link>
            <Link href="">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
