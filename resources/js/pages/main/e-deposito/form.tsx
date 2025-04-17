'use client'

import SelectInput from '@/components/select-input'
import MainLayout from '@/layouts/main-layout'
import { Link } from '@inertiajs/react'
import Lottie from 'lottie-react'
import { Check } from 'lucide-react'
import { useState } from 'react'
import animationData from '../../../../../public/assets/success-animation.json'
import { message } from 'antd'

const extensionStatus = [
  { label: 'Non ARO', value: 'NON_ARO' },
  { label: 'ARO', value: 'ARO' },
  { label: 'ARO Plus', value: 'ARO_PLUS' },
]

const sourceAccounts = [
  { label: 'Atas Nama Deposan', value: 'ATAS_NAMA_DEPOSAN' },
  { label: 'Bukan Atas Nama Deposan', value: 'BUKAN_ATAS_NAMA_DEPOSAN' },
]

const paymentMethods = [
  { label: 'Pembayaran ke Rekening Bank Umum', value: 'BANK_UMUM' },
  { label: 'Pembayaran ke Rekening Bank Aruna', value: 'BANK_ARUNA' },
]

export default function DepositoFormPage() {
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    phone_number: '',
    full_name: '',
    deposit_amount: '',
    deposit_period: '',
    extension_status: '',
    source_account: '',
    payment_method: '',
  })

  const handleSelectChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      return form.phone_number && form.full_name
    }
    if (currentStep === 2) {
      return (
        form.deposit_amount &&
        form.deposit_period &&
        form.extension_status
      )
    }
    if (currentStep === 3) {
      return (
        form.source_account &&
        form.payment_method
      )
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
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
    <>
      <MainLayout>
        <div className="bg-[#F0F4FF] pt-[80px] pb-[50px]">
          <div className="mx-4 md:mx-0">
            <div className="max-w-[552px] px-10 py-[32px] bg-white mx-auto w-full rounded-2xl border border-[#1946B9]">
              {/* Step Indicator */}
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4].map((s, i) => (
                  <>
                    <div
                      key={s}
                      className={`${step >= s ? 'bg-[#0055FE] text-white' : 'bg-white text-[#0055FE]'} w-[30px] h-[30px] rounded-full border border-[#0055FE] flex items-center justify-center`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {i < 3 && <div className="w-[30px] h-[1px] bg-[#0055FE]" />}
                  </>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                <h1 className="text-[#050B32] font-semibold text-2xl text-center">
                  FORMULIR PERMOHONAN PEMBUKAAN REKENING e-DEPOSITO
                </h1>
                <p className="text-primary uppercase text-lg text-center">
                  Nasabah BPR Aruna
                </p>
              </div>

              <div>
                {step === 1 && (
                  <>
                    <div className="bg-primary py-4 px-6 rounded-xl space-y-2 mt-4">
                      <h2 className="text-white text-2xl font-semibold text-center uppercase">
                        Data Nasabah
                      </h2>
                      <p className="text-white text-xs text-center">
                        Dengan ini, saya yang berdata diri sebagai berikut:
                      </p>
                    </div>

                    <div className="space-y-5 mt-5">
                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          No. Telp/Whatsapp <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <input
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            className="border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="bg-primary py-4 px-6 rounded-xl space-y-2 mt-4">
                      <h2 className="text-white text-2xl font-semibold text-center uppercase">
                        Data Deposito
                      </h2>
                      <p className="text-white text-xs text-center">
                        Pembukaan rekening e-Deposito dengan data sebagai berikut:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-col-2 gap-4 mt-5">
                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          Nominal (Rp) <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="deposit_amount"
                          type="number"
                          value={form.deposit_amount}
                          onChange={handleChange}
                          className="mt-[8px] border border-[#D2DAE2] rounded-xl px-4 w-full py-3 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          Jangka Waktu <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <SelectInput
                            name="deposit_period"
                            value={form.deposit_period}
                            onChange={handleSelectChange}
                            options={[
                              { label: '1 bulan', value: '1' },
                              { label: '3 bulan', value: '3' },
                              { label: '6 bulan', value: '6' },
                              { label: '12 bulan', value: '12' },
                            ]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <p className="text-lg font-semibold">
                        Suku Bunga e-Deposito BPR Aruna 6,50% p.a.
                      </p>
                      <label className="text-[#050B32] text-xs font-medium">
                        Status Perpanjangan <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-[8px]">
                        <SelectInput
                          name="extension_status"
                          onChange={handleSelectChange}
                          value={form.extension_status}
                          options={extensionStatus.map((status) => ({
                            label: status.label,
                            value: status.value,
                          }))}
                        />
                      </div>
                      <div className="space-y-2 text-gray-500">
                        <p>Penjelasan:</p>
                        <ul className="list-disc pl-5">
                          <li>
                            <span className="font-semibold">Non ARO:</span> Rekening tidak akan diperpanjang secara otomatis
                          </li>
                          <li>
                            <span className="font-semibold">ARO:</span> Rekening akan diperpanjang secara otomatis dengan suku bunga yang berlaku saat itu
                          </li>
                          <li>
                            <span className="font-semibold">ARO Plus:</span> Rekening akan diperpanjang secara otomatis dengan suku bunga yang berlaku saat itu dan dapat dicairkan sebelum jatuh tempo
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="bg-primary py-4 px-6 rounded-xl space-y-2 mt-4">
                      <h2 className="text-white text-2xl font-semibold text-center uppercase">
                        Informasi Sumber Dana Penempatan Deposito
                      </h2>
                      <p className="text-white text-xs text-center">
                        BPR Aruna akan mengirimkan Nomor Virtual Account Danamon untuk proses penempatan deposito.
                      </p>
                    </div>

                    <div className="space-y-4 mt-5">
                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          Informasi Rekening Sumber Dana Penempatan Deposito <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <SelectInput
                            name="source_account"
                            onChange={handleSelectChange}
                            value={form.source_account}
                            options={sourceAccounts.map((status) => ({
                              label: status.label,
                              value: status.value,
                            }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[#050B32] text-xs font-medium">
                          Metode Pembayaran Bunga dan Pencairan Deposito <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-[8px]">
                          <SelectInput
                            name="payment_method"
                            value={form.payment_method}
                            onChange={handleSelectChange}
                            options={paymentMethods.map((status) => ({
                              label: status.label,
                              value: status.value,
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="bg-primary py-4 px-6 rounded-xl space-y-2 mt-4">
                      <h2 className="text-white text-2xl font-semibold text-center">
                        SYARAT DAN KETENTUAN PEMBUKAAN e-DEPOSITO
                      </h2>
                    </div>

                    <div className="space-y-4 mt-6 text-gray-500">
                      <ul className="list-decimal pl-5 space-y-4">
                        <li>
                          Untuk pengajuan deposito, BPR Aruna akan menghubungi Nasabah untuk proses validasi data dalam rentang waktu 2 hari kerja (Senin &ndash; Jumat).
                        </li>
                        <li>
                          Penempatan deposito dilakukan setelah dana efektif diterima oleh BPR Aruna, apabila pembayaran deposito diterima setelah jam 15.00 WITA pada hari kerja, maka transaksi akan diproses pada hari kerja berikutnya.
                        </li>
                        <li>
                          BPR Aruna hanya menerima penempatan e-Deposito dalam bentuk mata uang rupiah.
                        </li>
                        <li>
                          Untuk status perpanjangan:
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>
                              <span className="font-semibold">Non ARO:</span> Deposito yang tidak diperpanjang ketika tanggal jatuh tempo.
                            </li>
                            <li>
                              <span className="font-semibold">ARO:</span> Deposito yang dapat diperpanjang secara otomatis sesuai dengan tenor yang berlaku dipengajuan sebelumnya.
                            </li>
                            <li>
                              <span className="font-semibold">ARO Plus:</span> Deposito yang dapat diperpanjang secara otomatis, bunga menambah nilai pokok setiap bulannya selama Deposito belum dicairkan oleh Nasabah.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Apabila tanggal jatuh tempo berada pada hari libur/diluar hari operasional BPR, maka pencairan akan dilakukan pada hari kerja berikutnya.
                        </li>
                        <li>
                          Penjaminan deposito oleh LPS mengacu pada tingkat suku bunga penjaminan LPS pada saat ikatan awal pembukaan deposito, terlepas dari penurunan dan kenaikan suku bunga penjaminan LPS di kemudian hari.
                        </li>
                        <li>
                          Jika pemilik deposito meninggal dunia, deposito dapat diserahkan/dialihkan kepada ahli waris.
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                {step === 5 && (
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
                    <Link
                      href="/e-deposito"
                      className="cursor-pointer bg-primary py-[11px] rounded-xl px-[26px] text-white mt-[27px] hover:bg-primary/90 transition-colors"
                    >
                      Selesai
                    </Link>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10">
                  {step === 1 && (
                    <Link
                      href="/e-deposito"
                      className="cursor-pointer bg-gray-200 text-gray-800 px-5 py-2 rounded-md text-sm"
                    >
                      Kembali
                    </Link>
                  )}
                  {step !== 1 && step <= 4 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="cursor-pointer bg-gray-200 text-gray-800 px-5 py-2 rounded-md text-sm"
                    >
                      Kembali
                    </button>
                  )}
                  {step < 4 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="cursor-pointer bg-primary text-white px-5 py-2 rounded-md text-sm"
                    >
                      Lanjut
                    </button>
                  )}
                  {step === 4 && (
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
        </div>
      </MainLayout >
    </>
  )
}
