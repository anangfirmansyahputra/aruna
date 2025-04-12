import MainLayout from '@/layouts/main-layout'
import CareerHero from '../../../../../public/assets/career-hero.png'
import { Career } from '@/types'
import CareerCard from './career-card'
import { usePage } from '@inertiajs/react'

interface AllCareerPageProps {
  careers: Career[]
}

export default function AllCareerPage({ careers }: AllCareerPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <MainLayout>
      <div className="container mx-auto flex items-center gap-[122px] pt-5">
        <div className="w-1/2 bg-[#A8C0FF]/40 p-20 flex items-center justify-center rounded-full aspect-square">
          <div className="bg-[#F1F5FE] rounded-full w-full h-full flex items-center justify-center">
            <div className="">
              <img src={CareerHero} alt="Career Hero" />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <h1 className="text-primary text-4xl font-semibold">
            Temukan Jalan dan Impianmu
          </h1>
          <p className="mt-[14px] text-[#3F4145] text-lg">
            Jelajahi dan temukan tujuan karirmu bersama Bank BPR Aruna
          </p>
        </div>
      </div>

      <div className="bg-[#F0F4FF] w-full -mt-[12vh] z-[2] relative">
        <div className="container mx-auto space-y-5 py-[64px] px-[75px]">
          {careers.map((career) => (
            <CareerCard key={career.id} {...career} lang={lang} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
