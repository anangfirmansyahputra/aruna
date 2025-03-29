import MainLayout from '@/layouts/main-layout'
import Wave from '../../../../public/assets/Wave.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProfileCard from '@/components/profile-card'

const values = [
  {
    title: 'Integritas',
    icon: '🔲',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Kolaborasi',
    icon: '🔳',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Responsif',
    icon: '◼️',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Aktualisasi Diri',
    icon: '🔲',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Respek',
    icon: '◼️',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

const profiles = [
  {
    image_url: 'https://www.bpraruna.com/img/komisaris-1.jpg',
    name: 'I Nyoman Sumertha',
    title: 'Komisaris Utama',
    description:
      'Beliau menjabat sebagai Komisaris Utama PT BPR Aruna Nirmaladuta sejak tanggal 19 Maret 2018. Beliau memiliki pengalaman selama lebih dari 24 tahun dalam industri perbankan.',
  },
  {
    image_url: 'https://www.bpraruna.com/img/komisaris-2.jpg',
    name: 'I Ketut Gede Juarta Sabudi',
    title: 'Komisaris',
    description:
      'Beliau memiliki pengalaman selama lebih dari 28 tahun dalam industri perbankan. Karir Beliau dimulai sebagai tenaga marketing di Bank Dagang Bali pada tahun 1989.',
  },
  {
    image_url: 'https://www.bpraruna.com/img/komisaris-1.jpg',
    name: 'I Ketut Gede Juarta Sabudi',
    title: 'Komisaris',
    description:
      'Beliau memiliki pengalaman selama lebih dari 28 tahun dalam industri perbankan. Karir Beliau dimulai sebagai tenaga marketing di Bank Dagang Bali pada tahun 1989.',
  },
  {
    image_url: 'https://www.bpraruna.com/img/komisaris-2.jpg',
    name: 'I Ketut Gede Juarta Sabudi',
    title: 'Komisaris',
    description:
      'Beliau memiliki pengalaman selama lebih dari 28 tahun dalam industri perbankan. Karir Beliau dimulai sebagai tenaga marketing di Bank Dagang Bali pada tahun 1989.',
  },
  {
    image_url: 'https://www.bpraruna.com/img/komisaris-1.jpg',
    name: 'I Ketut Gede Juarta Sabudi',
    title: 'Komisaris',
    description:
      'Beliau memiliki pengalaman selama lebih dari 28 tahun dalam industri perbankan. Karir Beliau dimulai sebagai tenaga marketing di Bank Dagang Bali pada tahun 1989.',
  },
]

export default function AboutPage() {
  return (
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
            {values.slice(0, 3).map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-[#B4CCEF]/20 p-4 rounded-lg">
                  <span className="text-4xl">{value.icon}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#183B56]">
                  {value.title}
                </h3>
                <p className="mt-[13px] text-[#5A7184]">{value.description}</p>
              </div>
            ))}
            {/* Bagian bawah dengan 2 item yang diposisikan di tengah */}
            <div className="col-span-1 lg:col-span-3 flex justify-center gap-8">
              {values.slice(3, 5).map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center max-w-xs"
                >
                  <div className="bg-[#B4CCEF]/20 p-4 rounded-lg">
                    <span className="text-4xl">{value.icon}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#183B56]">
                    {value.title}
                  </h3>
                  <p className="mt-[13px] text-[#5A7184]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
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
          {/* Bagian bawah dengan 2 item yang diposisikan di tengah */}
          <div className="col-span-1 lg:col-span-3 flex justify-center gap-[126px]">
            {profiles.slice(0, 2).map((profile, index) => (
              <ProfileCard {...profile} key={index} />
            ))}
          </div>

          {profiles.slice(2, 5).map((profile, index) => (
            <ProfileCard {...profile} key={index} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
