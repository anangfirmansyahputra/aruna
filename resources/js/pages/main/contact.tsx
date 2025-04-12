import MainLayout from '@/layouts/main-layout'
import { Link, router, useForm } from '@inertiajs/react'
import React from 'react'
import BlurOne from '../../../../public/assets/blur 1.svg'
import BlurTwo from '../../../../public/assets/blur 2.svg'
import Office from '../../../../public/assets/office.svg'
import Phone from '../../../../public/assets/phone.svg'
import { message } from 'antd'
import { SEO } from '@/types'
import SeoHead from '@/components/seo-head'

interface ContactPageProps {
  seo: SEO | null
}

const contactLists = [
  {
    title: 'Kantor Pusat',
    direction: '/',
    items: [
      {
        icon: Office,
        text: 'Jalan Darma Giri No. 99, Gianyar – Bali',
      },
      {
        icon: Phone,
        text: '0361 8958344',
      },
    ],
  },
  {
    title: 'Kantor Cabang Denpasar',
    direction: '/',
    items: [
      {
        icon: Office,
        text: 'Jalan Nangka Selatan No. 182, Denpasar - Bali',
      },
      {
        icon: Phone,
        text: '0361 4788725',
      },
    ],
  },
  {
    title: 'Kantor Kas Sukawati',
    direction: '/',
    items: [
      {
        icon: Office,
        text: 'Jalan Raya Sukawati No. 88, Sukawati, Gianyar - Bali',
      },
      {
        icon: Phone,
        text: '0361 8402177',
      },
    ],
  },
  {
    title: 'Kantor Kas Singaraja',
    direction: '/',
    items: [
      {
        icon: Office,
        text: 'Jalan Lingga, Banyuasri, Kec. Buleleng, Buleleng - Bali',
      },
      {
        icon: Phone,
        text: '0362 3303311',
      },
    ],
  },
]

export default function ContactPage({ seo }: ContactPageProps) {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    no_hp: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/contact', {
      onError: () => {
        message.error('Something went wrong, please try again')
      },
      onSuccess: () => {
        message.success('Sent email successfully')
      },
    })
  }

  return (
    <>
      <SeoHead
        url="/contact"
        seo={seo}
        fallbackTitle={{
          id: 'Kontak Kami',
          en: 'Contact Us',
        }}
        fallbackDescription={{
          id: 'Hubungi kami untuk informasi lebih lanjut atau pertanyaan.',
          en: 'Contact us for more information or inquiries.',
        }}
        fallbackKeywords={{
          id: 'kontak, hubungi, pertanyaan',
          en: 'contact, reach out, inquiries',
        }}
      />

      <MainLayout>
        <div className="bg-[#F5FAFF] py-[50px] relative overflow-hidden">
          <div className="container mx-auto grid grid-cols-5 gap-[60px] relative z-[2]">
            <form
              onSubmit={handleSubmit}
              className="col-span-2 bg-white rounded-2xl px-[24px] py-[52px] space-y-[8px]"
            >
              <div className="grid grid-cols-2 gap-[12px]">
                <div>
                  <label className="text-[#3F4145]" htmlFor="first_name">
                    Nama Depan
                  </label>
                  <input
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    required
                    className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[12px] w-full"
                    type="text"
                    id="first_name"
                    name="first_name"
                  />
                </div>
                <div>
                  <label className="text-[#3F4145]" htmlFor="last_name">
                    Nama Belakang
                  </label>
                  <input
                    required
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[12px] w-full"
                    type="text"
                    id="last_name"
                    name="last_name"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#3F4145]" htmlFor="no_hp">
                  Nomor Telepone
                </label>
                <div className="flex items-center gap-5 border border-[#E6E6E6] rounded-[12px] mt-[12px] p-3 ">
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#E3E7EE]" />
                    <span className="text-sm">+62</span>
                  </div>

                  <div className="w-[1px] h-5 bg-[#E6E6E6]" />
                  <input
                    value={data.no_hp}
                    onChange={(e) => setData('no_hp', e.target.value)}
                    required
                    className="w-full outline-none"
                    type="text"
                    id="no_hp"
                    name="no_hp"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#3F4145]" htmlFor="email">
                  Email Address
                </label>
                <input
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[12px] w-full"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div>
                <label className="text-[#3F4145]" htmlFor="subject">
                  Subjek
                </label>
                <input
                  value={data.subject}
                  onChange={(e) => setData('subject', e.target.value)}
                  required
                  className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[12px] w-full"
                  type="text"
                  id="subject"
                  name="subject"
                />
              </div>

              <div>
                <label className="text-[#3F4145]" htmlFor="message">
                  Pesan Anda
                </label>
                <textarea
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  rows={5}
                  required
                  className="border border-[#E6E6E6] rounded-[12px] p-3 mt-[12px] w-full"
                  id="message"
                  name="message"
                ></textarea>
              </div>

              <button
                disabled={processing}
                type="submit"
                className="cursor-pointer hover:bg-primary/90 transition-colors bg-primary text-white rounded-[81px] font-semibold py-[12px] px-[40px] mt-[24px]"
              >
                Submit
              </button>
            </form>

            <div className="col-span-3">
              <h1 className="text-5xl text-primary font-semibold">
                Kontak Kami
              </h1>
              <p className="text-[#3F4145] mt-[24px]">
                Contact us by email, phone, or complete the form to discover how
                BPR Aruna can effectively address your management and governance
                challenges with tailored solutions.
              </p>

              <div className="mt-[25px] grid grid-cols-2 gap-[25px]">
                {contactLists.map((contact, i) => (
                  <div key={i}>
                    <p className="text-lg font-semibold text-primary">
                      {contact.title}
                    </p>
                    <div className="space-y-[12px] mt-[16px]">
                      {contact.items.map((item) => (
                        <div className="gap-[14px] flex">
                          <img src={item.icon} alt="" />
                          <span className="text-[#3F4145] font-medium">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={contact.direction}
                      className="bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium py-1 px-2 rounded-full inline-block mt-[16px]"
                    >
                      Direction Maps
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <img
            src={BlurTwo}
            className="absolute -top-1/2 w-full object-cover z-[0]"
            alt=""
          />
          <img
            src={BlurOne}
            className="absolute object-cover top-0 right-0 z-[0]"
            alt=""
          />
        </div>

        <div className="bg-[#F0F4FF] py-[50px]">
          <div className="container mx-auto">
            <h2 className="text-4xl font-semibold text-primary text-center">
              Kunjungi Kami
            </h2>
            <p className="text-center text-lg text-[#413C3C] mt-[30px]">
              Temukan lokasi kantor kami melalui peta di bawah. Kami siap
              menyambut Anda!
            </p>
            <iframe
              className="aspect-retro w-full mt-[30px]"
              // width="600"
              // height="400"
              // style="border:0; border-radius: 8px;"
              loading="lazy"
              // allowfullscreen
              // referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442.7218383681676!2d115.3108396!3d-8.5477641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd8bc339676604f1d!2sPT.%20BPR%20Aruna%20Nirmaladuta!5e0!3m2!1sid!2sid!4v1711740000000"
            ></iframe>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
