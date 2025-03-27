import MainLayout from '@/layouts/main-layout'
import ArticleImage from '../../../../../public/assets/article.png'
import { Facebook, Instagram, Link, Youtube } from 'lucide-react'

export default function ArticleDetailPage() {
  return (
    <MainLayout>
      <div className="container mx-auto grid grid-cols-3 py-[50px] gap-[50px]">
        <div className="col-span-2">
          <h1 className="text-3xl font-medium">
            BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019
          </h1>
          <img
            className="mt-[30px] w-full rounded-3xl object-cover"
            src={ArticleImage}
            alt="BPR Aruna raih GOLDEN AWARDS"
          />

          <div className="space-y-5 mt-[30px]">
            <h2 className="text-medium text-lg">Sub Head 1</h2>
            <p className="text-[#564D4D] text-sm">
              PT BPR Aruna Nirmaladuta (“BPR Aruna”) meraih 2 (dua) penghargaan
              sekaligus dalam acara Infobank 10th BPR Awards 2019 yang digelar
              Jumat, 30 Agustus 2019, di Merlynn Park Hotel, Jakarta.
            </p>
            <p className="text-[#564D4D] text-sm">
              Penghargaan pertama diraih BPR Aruna karena berhasil memperoleh
              predikat SANGAT BAGUS atas kinerja keuangan selama tahun 2018
              untuk kelompok BPR beraset Rp100 Miliar sampai dengan dibawah
              Rp250 Miliar. Penghargaan kedua dalam bentuk GOLDEN AWARDS, diraih
              BPR Aruna karena berhasil mempertahankan predikat SANGAT BAGUS
              selama lima kali berturut-turut atas kinerja keuangan tahun 2014 -
              2018.
            </p>
            <p className="text-[#564D4D] text-sm">
              Kedua penghargaan ini merupakan apresiasi atas hasil kerja keras
              dari seluruh tim dan dukungan yang luar biasa dari seluruh nasabah
              BPR Aruna. Di sisi lain, kedua penghargaan ini merupakan tantangan
              bagi BPR Aruna sebagai salah satu pelaku bisnis BPR di Gianyar,
              Bali untuk terus menjaga, mengembangkan dan meningkatkan
              kompetensi SDM serta pelayanan prima kepada nasabah.
            </p>
            <p className="text-[#564D4D] text-sm">
              Atas kinerja keuangan BPR Aruna, tercatat sampai akhir Agustus
              tahun 2019, jumlah kredit yang disalurkan mencapai Rp163,22
              Miliar, Dana Pihak Ketiga (DPK) dalam bentuk deposito dan tabungan
              terhimpun sebesar Rp101,66 Miliar, NPL terjaga di angka 1,69%, dan
              total aset mencapai Rp193,38 Miliar (tumbuh 26,56% YoY).
              Pencapaian ini merupakan salah satu cermin dan indikator bahwa BPR
              Aruna terus tumbuh dengan sehat dan mampu menjaga kinerja
              keuangannya dengan baik.
            </p>
          </div>

          <div className="mt-[30px] border-t border-t-[#59606E] py-[12px]">
            <div className="flex items-center gap-5">
              <p className="text-[#4D4646]">Bagikan :</p>

              <div className="flex gap-5">
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Facebook className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Youtube className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Instagram className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Link className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar kosong, tambahkan placeholder atau hapus */}
        <div className="col-span-1 bg-primary rounded-3xl p-[25px] h-fit">
          <p className="text-white text-xl font-semibold">Berita Terkini</p>

          <div className="mt-[28px] space-y-[23px]">
            <div className="flex gap-5">
              <img src="" alt="" className="w-[35%] bg-black rounded-3xl" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">
                  Berkarya dengan Komitmen, BPR Aruna Buka Kantor di Denpasar
                  Siap Bangun Ekonomi Kerakyatan
                </p>
                <p className="text-xs text-[#DEDEDE] mt-[10px]">Feb 18, 2024</p>
              </div>
            </div>

            <div className="flex gap-5">
              <img src="" alt="" className="w-[35%] bg-black rounded-3xl" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">
                  Berkarya dengan Komitmen, BPR Aruna Buka Kantor di Denpasar
                  Siap Bangun Ekonomi Kerakyatan
                </p>
                <p className="text-xs text-[#DEDEDE] mt-[10px]">Feb 18, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
