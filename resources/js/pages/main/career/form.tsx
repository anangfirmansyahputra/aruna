import SelectInput from '@/components/select-input'
import MainLayout from '@/layouts/main-layout'
import { Career } from '@/types'
import { Link, router } from '@inertiajs/react'
import { message } from 'antd'
import Lottie from 'lottie-react'
import React, { useRef, useState } from 'react'
import animationData from '../../../../../public/assets/success-animation.json'

interface CareerFormPagepProps {
  careers: Career[]
}

export default function CareerFormPage({ careers }: CareerFormPagepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [check, setChek] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    no_hp: '',
    address: '',
    career_id: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleSelectChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    const confirm = window.confirm('Apakah anda yakin?')
    if (confirm) {
      if (!check) {
        message.info(
          'Mohon untuk centang persetujuan pengajuan kredit terlebih dahulu'
        )
        return
      }

      const payload = {
        ...form,
        cv: image,
      }

      router.post('/careers/form', payload, {
        forceFormData: true,
        onSuccess: () => {
          setForm({
            address: '',
            career_id: '',
            email: '',
            name: '',
            no_hp: '',
          })

          setImage(null)
          setSuccess(true)
        },
        onError: () => {
          message.error('Internal server error')
        },
      })
    }
  }

  return (
    <MainLayout>
      <div className="bg-[#F0F4FF] pt-[80px] pb-[50px]">
        <div className="max-w-[552px] px-[25px] lg:px-10 py-[25px] lg:py-[32px] bg-white mx-auto w-full rounded-2xl border border-[#1946B9]">
          <div>
            {!success && (
              <>
                <div className="bg-primary py-[15px] px-[20px] rounded-xl mt-[10px]">
                  <h2 className="text-white text-xl lg:text-2xl font-semibold text-center">
                    FORMULIR KARIR
                  </h2>
                </div>

                <div>
                  <div className="grid lg:grid-cols-2 gap-5">
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-[#050B32] text-xs font-medium"
                          htmlFor=""
                        >
                          Nama pelamar
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            value={form.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            required
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div>
                        <label
                          className="text-[#050B32] text-xs font-medium"
                          htmlFor=""
                        >
                          Email
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            value={form.email}
                            onChange={handleChange}
                            name="email"
                            type="text"
                            required
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div>
                      <label
                        className="text-[#050B32] text-xs font-medium"
                        htmlFor=""
                      >
                        Posisi yang dilamar
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <SelectInput
                          value={form.career_id}
                          name="career_id"
                          onChange={handleSelectChange}
                          options={careers.map((career) => ({
                            label: career.id_title,
                            value: career.id.toString(),
                          }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div>
                      <label
                        className="text-[#050B32] text-xs font-medium"
                        htmlFor=""
                      >
                        No HP
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <input
                          value={form.no_hp}
                          onChange={handleChange}
                          name="no_hp"
                          type="text"
                          required
                          className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div>
                      <label
                        className="text-[#050B32] text-xs font-medium"
                        htmlFor=""
                      >
                        CV
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px] flex items-center justify-end border-[#D2DAE2] rounded-xl px-4 w-full py-3 border">
                        {image && (
                          <span className="w-full text-xs">{image.name}</span>
                        )}
                        <button
                          type="button"
                          onClick={handleBrowseClick}
                          className="cursor-pointer hover:bg-primary/90 transition-colors bg-primary text-white text-sm font-medium py-[5px] px-[18px] rounded-xl"
                        >
                          Browse
                        </button>
                        <input
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setImage(e.target.files[0])
                            }
                          }}
                          ref={fileInputRef}
                          name="collateral_photo_ktp"
                          type="file"
                          required
                          accept=".pdf"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[10px] items-start mt-5">
                  <input
                    checked={check}
                    onChange={(e) => setChek(e.target.checked)}
                    name="approve"
                    type="checkbox"
                    className="mt-[1px]"
                  />
                  <p className="text-xs text-[#050B32] font-medium">
                    Dengan mengisi formulir ini, anda dinyatakan telah
                    mengajukan lamaran
                  </p>
                </div>
              </>
            )}

            {success && (
              <div className="flex flex-col items-center gap-[5px]">
                <div className="w-64 h-64">
                  <Lottie animationData={animationData} loop={false} />
                </div>
                <h2 className="text-[#050B32] text-xl lg:text-2xl font-semibold">
                  BERHASIL
                </h2>
                <p className="text-primary max-w-[320px] text-center mx-auto">
                  Silahkan Menunggu Verifikasi Data Dari Pihak Kami
                </p>
                <Link
                  href="/careers/all"
                  className="cursor-pointer bg-primary py-[11px] rounded-xl px-[26px] text-white mt-[27px] bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Selesai
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            {!success && (
              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="cursor-pointer bg-green-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
