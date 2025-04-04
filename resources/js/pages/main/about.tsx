import MainLayout from '@/layouts/main-layout'
import Wave from '../../../../public/assets/Wave.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProfileCard from '@/components/profile-card'
import { CompanyValue, SEO, TeamProfile } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'
import * as LucideIcons from 'lucide-react'
import SeoHead from '@/components/seo-head'

interface AboutPageProps {
  profiles: TeamProfile[]
  company_values: CompanyValue[]
  seo: SEO | null
}

export default function AboutPage({
  profiles,
  company_values,
  seo,
}: AboutPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <>
      <SeoHead
        seo={seo}
        fallbackTitle={{
          id: 'Tentang Kami',
          en: 'About Us',
        }}
        fallbackDescription={{
          id: 'Pelajari lebih lanjut tentang visi, misi, dan nilai perusahaan kami.',
          en: 'Learn more about our company’s vision, mission, and values.',
        }}
        fallbackKeywords={{
          id: 'tentang kami, visi, misi, perusahaan',
          en: 'about us, vision, mission, company',
        }}
      />
      <MainLayout>
        <div className="relative">
          <img
            src="https://www.bpraruna.com/img/tentang-kami.jpg"
            className="h-[calc(100vh-150px)] w-full object-cover"
            alt=""
          />
          <div className="w-full h-full bg-[#1946B9]/70 top-0 absolute z-[2]"></div>
          <img className="w-full absolute bottom-0 z-[3]" src={Wave} alt="" />
        </div>

        <div className="container mx-auto grid grid-cols-3 py-10 gap-[45px]">
          <div className="col-span-2 flex flex-col justify-center">
            <div className="space-y-[25px]">
              <div className="grid grid-cols-5 gap-[93px]">
                <p className="font-semibold text-5xl text-primary col-span-1">
                  VISI
                </p>
                <p className="font-medium text-lg col-span-4 text-[#736E6E]">
                  Menjadi Bank Perekonomian Rakyat Pilihan Yang Unggul Dalam
                  Kualitas Layanan Dan Kinerja
                </p>
              </div>
              <div className="grid grid-cols-5 gap-[93px]">
                <p className="font-semibold text-5xl text-primary">Misi</p>
                <p className="font-medium text-lg col-span-4 text-[#736E6E]">
                  Memberikan kontribusi maksimal dan berkesinambungan dalam
                  mendukung pertumbuhan ekonomi regional.
                </p>
              </div>
            </div>

            <div className="flex items-center w-full justify-end mt-[10px]">
              <div className="flex items-center gap-[10px]">
                <button className="bg-primary text-white p-1 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <ChevronLeft />
                </button>
                <span className="text-lg font-medium">1/4</span>
                <button className="bg-primary text-white p-1 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
          <div className="aspect-video">
            <img
              src=""
              className="w-full h-full bg-[#C4C4C4] rounded-[16px]"
              alt=""
            />
          </div>
        </div>

        <div className="bg-[#F0F4FF] py-[30px]">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-semibold text-primary">
              Nilai - Nilai Perusahaan
            </h2>
            <p className="text-lg text-[#736E6E] text-center mt-[18px]">
              Nilai utama kami mendukung integritas, inovasi, dan kepuasan
              pelanggan..
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-[30px]">
              {/* Kelompokkan company_values setiap 5 item (3 di grid biasa + 2 di tengah) */}
              {Array.from({ length: Math.ceil(company_values.length / 5) }).map(
                (_, groupIndex) => {
                  const start = groupIndex * 5
                  const group = company_values.slice(start, start + 5)

                  return (
                    <React.Fragment key={groupIndex}>
                      {/* 3 item pertama dalam grid biasa */}
                      {group.slice(0, 3).map((value, index) => {
                        // @ts-ignore
                        const IconComponent = LucideIcons[value.icon]

                        return (
                          <div
                            key={start + index}
                            className="flex flex-col items-center"
                          >
                            <div className="bg-[#B4CCEF]/20 p-4 rounded-lg">
                              <span className="text-4xl">
                                <IconComponent size={24} />
                              </span>
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-[#183B56]">
                              {value[`${lang}_title`]}
                            </h3>
                            <p className="mt-[13px] text-[#5A7184]">
                              {value[`${lang}_description`]}
                            </p>
                          </div>
                        )
                      })}

                      {/* 2 item berikutnya di tengah (jika ada) */}
                      {group.length > 3 && (
                        <div className="col-span-1 lg:col-span-3 flex justify-center gap-8">
                          {group.slice(3, 5).map((value, index) => {
                            // @ts-ignore
                            const IconComponent = LucideIcons[value.icon]

                            return (
                              <div
                                key={start + 3 + index}
                                className="flex flex-col items-center max-w-xs"
                              >
                                <div className="bg-[#B4CCEF]/20 p-4 rounded-lg">
                                  <span className="text-4xl">
                                    <IconComponent size={24} />
                                  </span>
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-[#183B56]">
                                  {value[`${lang}_title`]}
                                </h3>
                                <p className="mt-[13px] text-[#5A7184]">
                                  {value[`${lang}_description`]}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </React.Fragment>
                  )
                }
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto pt-20 pb-40">
          <h2 className="text-center text-primary text-4xl font-semibold">
            Temui tim manajemen kami!
          </h2>
          <p className="text-center mt-[16px] text-[#736E6E] text-lg max-w-[720px] mx-auto">
            Kami hadir dengan kepemimpinan visioner dan strategi inovatif untuk
            mendorong pertumbuhan dan kesuksesan perusahaan
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[160px] text-center mt-[30px]">
            {/* Kelompokkan profiles setiap 5 item */}
            {Array.from({ length: Math.ceil(profiles.length / 5) }).map(
              (_, groupIndex) => {
                const start = groupIndex * 5
                const group = profiles.slice(start, start + 5)

                return (
                  <React.Fragment key={groupIndex}>
                    {/* Untuk 2 item pertama dalam kelompok 5 */}
                    {group.length > 0 && (
                      <div className="col-span-1 lg:col-span-3 flex justify-center gap-[126px]">
                        {group.slice(0, 2).map((profile, index) => (
                          <ProfileCard
                            name={profile.name}
                            description={profile[`${lang}_description`]}
                            title={profile[`${lang}_title`]}
                            image_url={profile.image_url}
                            key={start + index}
                          />
                        ))}
                      </div>
                    )}

                    {/* Untuk 3 item berikutnya dalam kelompok 5 */}
                    {group.slice(2, 5).map((profile, index) => (
                      <ProfileCard
                        name={profile.name}
                        description={profile[`${lang}_description`]}
                        title={profile[`${lang}_title`]}
                        image_url={profile.image_url}
                        key={start + 2 + index}
                      />
                    ))}
                  </React.Fragment>
                )
              }
            )}
          </div>
        </div>
      </MainLayout>
    </>
  )
}
