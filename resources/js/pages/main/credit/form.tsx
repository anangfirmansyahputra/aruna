'use client'

import SelectInput from '@/components/select-input'
import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import { message } from 'antd'
import Lottie from 'lottie-react'
import { Check } from 'lucide-react'
import { useRef, useState } from 'react'
import animationData from '../../../../../public/assets/success-animation.json'
import { Link, router } from '@inertiajs/react'

interface CreditFormProps {
  credit_products: (Product & {
    translations: ProductTranslation[]
  })[]
}

const collateralTypes = [
  {
    label: 'BPKB Mobil',
    value: 'BPKB_MOBIL',
  },
  {
    label: 'BPKB Motor',
    value: 'BPKB_MOTOR',
  },
  {
    label: 'Sertifikat Rumah',
    value: 'SERTIFIKAT_RUMAH',
  },
  {
    label: 'Pembiayaan Syariah',
    value: 'PEMBIAYAAN_SYARIAH',
  },
  {
    label: 'Kredit Mobil Bekas',
    value: 'KREDIT_MOBIL_BEJAS',
  },
  {
    label: 'Pembiayaan Alat Berat & Industri',
    value: 'PEMBIAYAAN_ALAT_BERAT',
  },
  {
    label: 'Pembiayaan Kepemilikan Rumah',
    value: 'PEMBIAYAAN_KPR',
  },
]

export default function CreditForm({ credit_products }: CreditFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    product_id: '',
    plafond_amount: '',
    usage_purpose: '',
    debtor_name: '',
    debtor_date_birth: '',
    debtor_no_ktp: '',
    debtor_npwp: '',
    debtor_job: '',
    debtor_no_hp: '',
    debtor_email: '',
    collateral_name_reference: '',
    debtor_address: '',
    collateral_type: '',
  })

  const handleSelectChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      return form.product_id && form.plafond_amount && form.usage_purpose
    }
    if (currentStep === 2) {
      return (
        form.debtor_name &&
        form.debtor_date_birth &&
        form.debtor_no_ktp &&
        form.debtor_npwp &&
        form.debtor_job &&
        form.debtor_no_hp &&
        form.debtor_email
      )
    }
    if (currentStep === 3) {
      return (
        form.collateral_name_reference &&
        form.debtor_address &&
        form.collateral_type
      )
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 3) {
        const payload = {
          ...form,
          collateral_photo_ktp: image,
        }

        router.post('/credit', payload, {
          forceFormData: true,
          onSuccess: (props: any) => {
            console.log('success', props)
            setStep(4)
          },
          onError: (props: any) => {
            console.log(props)
            message.error('Internal server error')
          },
        })
      } else {
        setStep((prev) => prev + 1)
      }
    } else {
      message.error('Mohon lengkapi semua field sebelum melanjutkan.')
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <MainLayout>
      <div className="bg-[#F0F4FF] pt-[80px] pb-[50px]">
        <div className="max-w-[552px] px-[25px] lg:px-10 py-[25px] lg:py-[32px] bg-white mx-auto w-full rounded-2xl border border-[#1946B9]">
          {/* Step Indicator */}
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s, i) => (
              <>
                <div
                  key={s}
                  className={`${step >= s ? 'bg-[#0055FE] text-white' : 'bg-white text-[#0055FE]'} w-[30px] h-[30px] rounded-full border border-[#0055FE] flex items-center justify-center`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {i < 2 && <div className="w-[30px] h-[1px] bg-[#0055FE]" />}
              </>
            ))}
          </div>

          <h1 className="text-[#050B32] font-semibold text-xl lg:text-2xl text-center mt-[15px]">
            FORMULIR PENGAJUAN KREDIT
          </h1>
          <div>
            {step === 1 && (
              <>
                <div className="space-y-5 mt-5">
                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      Dengan ini saya mengajukan{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <SelectInput
                        name="product_id"
                        onChange={handleSelectChange}
                        options={credit_products.map((credit) => ({
                          label: credit.translations[0].name,
                          value: credit.id.toString(),
                        }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      Jumlah plafond <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <input
                        name="plafond_amount"
                        type="number"
                        value={form.plafond_amount}
                        onChange={handleChange}
                        required
                        className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-[8px] mt-5">
                  <label
                    htmlFor="purpose"
                    className="text-xs font-medium text-[#050B32]"
                  >
                    Tujuan penggunaan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="usage_purpose"
                    value={form.usage_purpose}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        usage_purpose: e.target.value,
                      }))
                    }
                    rows={5}
                    className="border border-[#D2DAE2] rounded-xl px-4 py-3 text-xs font-medium"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bg-primary py-[15px] px-[20px] rounded-xl mt-[10px]">
                  <h2 className="text-white text-xl lg:text-2xl font-semibold text-center">
                    Data calon debitur
                  </h2>
                </div>

                <div className="mt-5">
                  <label className="text-[#050B32] text-xs font-medium">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="debtor_name"
                    value={form.debtor_name}
                    onChange={handleChange}
                    className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                  />
                </div>

                <div className="mt-5">
                  <label className="text-[#050B32] text-xs font-medium">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="debtor_date_birth"
                    type="date"
                    value={form.debtor_date_birth}
                    onChange={handleChange}
                    className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      No KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="debtor_no_ktp"
                      value={form.debtor_no_ktp}
                      onChange={handleChange}
                      className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      No NPWP <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="debtor_npwp"
                      value={form.debtor_npwp}
                      onChange={handleChange}
                      className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="debtor_job"
                      value={form.debtor_job}
                      onChange={handleChange}
                      className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[#050B32] text-xs font-medium">
                      No HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="debtor_no_hp"
                      value={form.debtor_no_hp}
                      onChange={handleChange}
                      className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[#050B32] text-xs font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="debtor_email"
                    type="email"
                    value={form.debtor_email}
                    onChange={handleChange}
                    className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bg-primary py-[15px] px-[20px] rounded-xl mt-[10px]">
                  <h2 className="text-white text-xl lg:text-2xl font-semibold text-center">
                    Jaminan
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
                          Nama Referensi Marketing
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            value={form.collateral_name_reference}
                            onChange={handleChange}
                            name="collateral_name_reference"
                            type="text"
                            required
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                        <p className="text-[10px] text-[#736E6E] mt-2">
                          *Jika tidak ada cukup input -
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div>
                        <label
                          className="text-[#050B32] text-xs font-medium"
                          htmlFor=""
                        >
                          Lokasi Angunan
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            value={form.debtor_address}
                            onChange={handleChange}
                            name="debtor_address"
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
                        Jenis Jaminan
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <SelectInput
                          name="collateral_type"
                          onChange={handleSelectChange}
                          options={collateralTypes.map((collateral) => ({
                            label: collateral.label,
                            value: collateral.label,
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
                        Foto KTP
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
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[10px] items-start mt-5">
                  <input name="approve" type="checkbox" className="mt-[1px]" />
                  <p className="text-xs text-[#050B32] font-medium">
                    Dengan mengisi formulir ini, anda dinyatakan telah
                    mengajukan permohonan Kredit
                  </p>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center gap-[5px]">
                <div className="w-64 h-64">
                  <Lottie animationData={animationData} loop={false} />
                </div>
                <h2 className="text-[#050B32] text-xl lg:text-2xl font-semibold">
                  BERHASIL REGISTRASI
                </h2>
                <p className="text-primary max-w-[320px] text-center mx-auto">
                  Silahkan Menunggu Verifikasi Data Dari Pihak Kami
                </p>
                <Link
                  href="/credit"
                  className="cursor-pointer bg-primary py-[11px] rounded-xl px-[26px] text-white mt-[27px] bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Selesai
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              {step > 1 && step !== 4 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="cursor-pointer bg-gray-200 text-gray-800 px-5 py-2 rounded-md text-sm"
                >
                  Kembali
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="cursor-pointer bg-[#0055FE] text-white px-5 py-2 rounded-md text-sm"
                >
                  Lanjut
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="cursor-pointer bg-green-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
