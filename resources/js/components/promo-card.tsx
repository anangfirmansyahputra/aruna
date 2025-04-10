import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

import { Promo } from '@/types'
import { router } from '@inertiajs/react'

export default function PromoCard(data: Promo & { lang: 'en' | 'id' }) {
  return (
    <div
      className="w-full bg-[#ddd] rounded-[30px] overflow-hidden cursor-pointer"
      onClick={() => router.visit(`/promo/${data.id}`)}
    >
      <img
        src={`/storage/${data.image_url}`}
        className="h-[300px] w-full object-cover"
      />
      <div className="bg-primary text-white py-[32px] px-[40px]">
        {/* @ts-ignore */}
        <h2 className="font-semibold text-3xl">{data[`${data.lang}_title`]}</h2>
        <p className="text-base mt-[15px]">
          Periode : {dayjs(data.start_date).format('DD MMMM')} -{' '}
          {dayjs(data.end_date).format('DD MMMM YYYY')}
        </p>
      </div>
    </div>
  )
}
