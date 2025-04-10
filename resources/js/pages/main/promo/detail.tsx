import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')
import Tiptap from '@/components/tiptap'
import MainLayout from '@/layouts/main-layout'
import { Promo } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { Calendar } from 'lucide-react'
import { useState } from 'react'

interface DetailPromoPageProps {
  promo: Promo
}

export default function DetailPromoPage({ promo }: DetailPromoPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  const { data, setData, post, processing, errors } = useForm({
    fullname: '',
    no_hp: '',
    email: '',
    address: '',
  })

  return (
    <MainLayout>
      <div className="container mx-auto flex gap-[50px]">
        <div className="w-[60%] py-[50px]">
          <h1 className="text-3xl font-medium">{promo[`${lang}_title`]}</h1>
          <img
            src={`/storage/${promo.image_url}`}
            alt=""
            className="w-full aspect-[16/10] object-cover mt-[30px] rounded-[30px]"
          />
          <div className="flex items-center gap-[13px] shadow border border-[#DCDEE2] w-fit rounded-[8px] p-[12px] mt-[30px]">
            <Calendar className="text-[#578AFE]" />
            <div>
              <p className="text-sm">Masa Berlaku Promo</p>
              <p className="text-[#578AFE] text-xs font-medium">
                {dayjs(promo.start_date).format('DD MMMM')} -{' '}
                {dayjs(promo.end_date).format('DD MMMM YYYY')}
              </p>
            </div>
          </div>

          <div className="border border-[#DCDEE2] rounded-[8px] px-[20px] py-[30px] mt-[30px] shadow">
            <Tiptap editable={false} content={promo[`${lang}_content`]} />
          </div>
        </div>

        <div className="mt-[50px] px-[40px] flex-1 py-[32px] border border-[#2666ED] h-fit rounded-2xl">
          <h3 className="text-primary text-center">
            Ajukan dan Nikmati Promonya
          </h3>
          <div className="mt-[20px] space-y-5">
            <div>
              <label
                htmlFor="fullname"
                className="text-[#050B32] text-xs font-medium"
              >
                Nama Lengkap
              </label>

              <input
                value={data.no_hp}
                onChange={(e) => setData('no_hp', e.target.value)}
                required
                className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[8px] w-full text-xs"
                type="text"
                id="fullname"
                name="fullname"
              />
            </div>
            <div>
              <label
                htmlFor="no_hp"
                className="text-[#050B32] text-xs font-medium"
              >
                Nomor Handphone
              </label>

              <input
                value={data.no_hp}
                onChange={(e) => setData('no_hp', e.target.value)}
                required
                className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[8px] w-full text-xs"
                type="text"
                id="no_hp"
                name="no_hp"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-[#050B32] text-xs font-medium"
              >
                Email
              </label>

              <input
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[8px] w-full text-xs"
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-[#050B32] text-xs font-medium"
              >
                Alamat Domisili
              </label>

              <input
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                required
                className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[8px] w-full text-xs"
                type="text"
                id="address"
                name="address"
              />
            </div>
            <div className="flex items-start gap-[10px]">
              <input type="checkbox" className="mt-1" />
              <p className="text-[#050B32] text-xs">
                Saya bersedia dihubungi oleh pihak PT. BPR Aruna pada jam dan
                hari kerja
              </p>
            </div>

            <button className="bg-primary text-white rounded-xl py-[7px] font-medium hover:bg-primary/90 transition-colors w-full px-4">
              Ajukan Sekarang
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
