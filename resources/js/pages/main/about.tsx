import MainLayout from '@/layouts/main-layout'
import Wave from '../../../../public/assets/Wave.png'

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

      <div className="container mx-auto grid grid-cols-3 py-10">
        <div className="col-span-2 flex items-center ">
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
        </div>
        <div className="aspect-video">
          <img
            src=""
            className="w-full h-full bg-[#C4C4C4] rounded-[16px]"
            alt=""
          />
        </div>
      </div>
    </MainLayout>
  )
}
