import SelectInput from '@/components/select-input'
import MainLayout from '@/layouts/main-layout'
import { Product, ProductTranslation } from '@/types'
import Lottie from 'lottie-react'
import { Check } from 'lucide-react'
import { useState } from 'react'
import animationData from '../../../../../public/assets/success-animation.json'

interface CreditFormProps {
  credit_products: (Product & {
    translations: ProductTranslation[]
  })[]
}

export default function CreditForm({ credit_products }: CreditFormProps) {
  const [step, setStep] = useState(1)
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

  const [form, setForm] = useState({
    product_id: '',
    plafond_amount: 0,
  })

  const handleStep = (step: number) => {
    setStep(step)
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
        <div className="max-w-[552px] px-10 py-[32px] bg-white mx-auto w-full rounded-2xl border border-[#1946B9]">
          <div className="flex items-center justify-center">
            <div
              className={`${step > 1 || step === 1 ? 'bg-[#0055FE] text-white' : 'bg-white text-[#0055FE]'} w-[30px] h-[30px] rounded-full  border border-[#0055FE] flex items-center justify-center`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className="w-[30px] h-[1px] bg-[#0055FE]" />
            <div
              className={`${step > 2 || step === 2 ? 'bg-[#0055FE] text-white' : 'bg-white text-[#0055FE]'} w-[30px] h-[30px] rounded-full  border border-[#0055FE] flex items-center justify-center`}
            >
              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div className="w-[30px] h-[1px] bg-[#0055FE]" />
            <div
              className={`${step > 3 || step === 3 ? 'bg-[#0055FE] text-white' : 'bg-white text-[#0055FE]'} w-[30px] h-[30px] rounded-full  border border-[#0055FE] flex items-center justify-center`}
            >
              {step > 3 ? <Check className="w-4 h-4" /> : '3'}
            </div>
          </div>

          <h1 className="text-[#050B32] font-semibold text-2xl text-center mt-[15px]">
            FORMULIR PENGAJUAN KREDIT
          </h1>

          <>
            {step === 1 && (
              <>
                <div className="space-y-5 mt-5">
                  <div>
                    <label
                      className="text-[#050B32] text-xs font-medium"
                      htmlFor=""
                    >
                      Dengan ini saya mengajukan
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <SelectInput
                        onChange={handleChange}
                        options={credit_products.map((credit) => ({
                          label: credit.translations[0].name,
                          value: credit.id.toString(),
                        }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[#050B32] text-xs font-medium"
                      htmlFor=""
                    >
                      Jumlah plafond
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <input
                        name="plafond_amount"
                        type="number"
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
                    id=""
                    rows={5}
                    className="border border-[#D2DAE2] rounded-xl p-2 text-xs font-medium"
                  ></textarea>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bg-primary py-[15px] px-[20px] rounded-xl mt-[10px]">
                  <h2 className="text-white text-2xl font-semibold text-center">
                    Data calon debitur
                  </h2>
                </div>

                <div className="mt-5">
                  <div>
                    <label
                      className="text-[#050B32] text-xs font-medium"
                      htmlFor=""
                    >
                      Nama Lengkap
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <input
                        name="debtor_name"
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
                      Tanggal Lahir
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-[8px]">
                      <input
                        name="debtor_date_birth"
                        type="date"
                        required
                        className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-[#050B32] text-xs font-medium"
                          htmlFor=""
                        >
                          No KTP
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="debtor_no_ktp"
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
                          Nama No NPWP
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="debtor_npwp"
                            type="text"
                            required
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-[#050B32] text-xs font-medium"
                          htmlFor=""
                        >
                          Pekerjaan
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="debtor_job"
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
                          No HP
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="debtor_no_hp"
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
                        Email
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <input
                          name="debtor_email"
                          type="email"
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
                        Alamat KTP
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <input
                          name="debtor_address"
                          type="text"
                          required
                          className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bg-primary py-[15px] px-[20px] rounded-xl mt-[10px]">
                  <h2 className="text-white text-2xl font-semibold text-center">
                    Jaminan
                  </h2>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-5">
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
                            name="collateral_address"
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
                          onChange={handleChange}
                          options={collateralTypes.map((collateral) => ({
                            label: collateral.label,
                            value: collateral.value,
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
                        <button className="cursor-pointer hover:bg-primary/90 transition-colors bg-primary text-white text-sm font-medium py-[5px] px-[18px] rounded-xl">
                          Browse
                        </button>
                        <input
                          name="collateral_photo_ktp"
                          type="text"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[10px] items-start mt-5">
                  <input type="checkbox" className="mt-[1px]" />
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
                <h2 className="text-[#050B32] text-2xl font-semibold">
                  BERHASIL REGISTRASI
                </h2>
                <p className="text-primary max-w-[320px] text-center mx-auto">
                  Silahkan Menunggu Verifikasi Data Dari Pihak Kami
                </p>
                <button className="cursor-pointer bg-primary py-[11px] rounded-xl px-[26px] text-white mt-[27px] bg-primary text-white hover:bg-primary/90 transition-colors">
                  Selesai
                </button>
              </div>
            )}

            {step < 4 && (
              <div
                className={`flex items-center mt-[32px] ${step > 1 ? 'justify-between' : 'justify-end'}`}
              >
                {step > 1 && (
                  <button
                    onClick={() => handleStep(step - 1)}
                    className="cursor-pointer bg-primary hover:bg-primary/90 transition-colors text-white font-medium rounded-2xl py-[7px] px-[21px]"
                  >
                    Kembali
                  </button>
                )}
                <button
                  onClick={() => {
                    handleStep(step + 1)
                  }}
                  className="cursor-pointer bg-white text-[#0055FE] border border-[#0055FE] font-medium rounded-2xl py-[7px] px-[21px]"
                >
                  Lanjut
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </MainLayout>
  )
}
