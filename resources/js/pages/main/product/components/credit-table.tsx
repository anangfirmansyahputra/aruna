import { formatRupiah, generateAngsuranSchedule } from '@/lib/calculation'
import {
  InterestRate,
  Product,
  ProductFAQ,
  ProductFeature,
  ProductRequirement,
  ProductTranslation,
} from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import Currency from '../../../../../../public/assets/currency.svg'
import PercentIcon from '../../../../../../public/assets/percent.svg'
import Timer from '../../../../../../public/assets/timer.svg'
import WhiteCurrency from '../../../../../../public/assets/white-currency.svg'
import CalendarIcon from '../../../../../../public/assets/calendar.svg'
import { message } from 'antd'

interface CreditTableProps {
  product: ProductTranslation & {
    product: Product & {
      features: ProductFeature[]
      faqs: ProductFAQ[]
      requirements: ProductRequirement[]
      interest_rates: InterestRate[]
    }
  }
}

type CalculatorResult = {
  periode: string
  interest_rate: string
  interest_rate_pokok: string
  total_angsuran: string
  sisa_pinjaman: string
}

export default function CreditTable({ product }: CreditTableProps) {
  const [showInterest, setShowInterest] = useState(false)
  const [tenor, setTenor] = useState<null | number>(null)
  const [interestType, setInterestType] = useState<'flat' | 'menurun'>('flat')
  const [showInterestType, setShowInterestType] = useState(false)
  const [result, setResult] = useState<{
    nominal: string
    tenor: string
    interest: string
  } | null>(null)
  const [pinjaman, setPinjaman] = useState(0)
  const [displayPinjaman, setDisplayPinjaman] = useState('Rp 0')
  const [calculatorResults, setCalculatorResults] = useState<
    CalculatorResult[]
  >([])

  const findInterest = (id: number) => {
    return product.product.interest_rates.find((interest) => interest.id === id)
  }

  const handleSelectTenor = (tenor: number) => {
    setShowInterest(false)
    setTenor(tenor)
  }

  const handleCalculation = () => {
    setCalculatorResults([])

    if (pinjaman === 0) {
      message.info('Mohon untuk mengisi pinjaman terlebih dahulu')
      return
    }

    const interest = findInterest(tenor!)
    if (!interest) {
      message.info('Mohon untuk memilih suku bunga dan periode lama meminjam')
      return
    }

    const { hasil, ...props } = generateAngsuranSchedule(
      pinjaman!,
      interest?.interest!,
      interest?.tenor!,
      interestType
    )

    setCalculatorResults(hasil)
    setResult(props)
  }

  const handleResetCalculation = () => {
    setCalculatorResults([])
    setResult(null)
    setDisplayPinjaman('Rp 0')
    setPinjaman(0)
    setTenor(null)
  }

  return (
    <>
      {(showInterest || showInterestType) && (
        <div className="fixed h-screen w-screen bg-black/50 z-50 bottom-0" />
      )}
      <div className="bg-white py-[50px]">
        <div className="bg-primary container mx-auto py-8 px-11 rounded-4xl">
          <h4 className="text-white font-semibold text-3xl">
            {product.collateral_name} - {product.name}
          </h4>
          <p className="text-xl text-white">Simulasi</p>

          <div className="grid grid-cols-4 mt-10 gap-3.5">
            <div className="bg-white p-3 flex gap-4 rounded-[10px]">
              <img src={Currency} />

              <div className="w-full">
                <p className="text-sm">Jumlah Pinjaman</p>
                <input
                  value={displayPinjaman}
                  type="text"
                  className="text-lg border-none outline-none w-full"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, '')

                    if (rawValue === '') {
                      setPinjaman(0)

                      setDisplayPinjaman('')
                      return
                    }

                    const numericValue = parseInt(rawValue, 10)
                    setPinjaman(numericValue)
                    setDisplayPinjaman(formatRupiah(numericValue))
                  }}
                />
              </div>
            </div>

            <div
              className={`bg-white p-3 flex gap-4 rounded-[10px] cursor-pointer relative ${showInterest && 'z-[51]'} `}
              onClick={() => setShowInterest(true)}
            >
              <img src={Timer} />

              <div className="hover:text-primary transition-colors">
                <p className="text-sm">Lama Pinjaman</p>
                <p className="text-lg">
                  {tenor ? `${findInterest(tenor)?.tenor} Bulan` : '-'}
                </p>
              </div>

              {showInterest && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute w-full bg-white left-0 mt-18 z-30 rounded-t cursor-auto shadow-lg"
                  >
                    <div className="border-b border-b-[#ddd] p-5">
                      <p className="text-primary">
                        Pilih masa pembiayaan yang diinginkan
                      </p>
                    </div>
                    <div className="p-5 py-5 space-y-2">
                      {product.product.interest_rates.map((interest) => (
                        <div key={interest.id} className="space-x-3">
                          <input
                            checked={tenor === interest.id}
                            onChange={() => handleSelectTenor(interest.id)}
                            name="tenor"
                            type="radio"
                            className="cursor-pointer"
                            id={`${interest.id.toString()}-${interest.product_id.toString()}`}
                          />
                          <label
                            onClick={() => {
                              setShowInterest(false)
                            }}
                            className="cursor-pointer"
                            htmlFor={`${interest.id.toString()}-${interest.product_id.toString()}`}
                          >
                            {interest.tenor} Bulan
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <div className="bg-white p-3 flex gap-4 rounded-[10px]">
              <img src={PercentIcon} />

              <div className="">
                <p className="text-sm">Suku Bunga</p>
                <p className="text-lg">
                  {tenor ? `${findInterest(tenor)?.interest} %` : '-'}
                </p>
              </div>
            </div>

            <div
              onClick={() => setShowInterestType(true)}
              className={`bg-white p-3 flex gap-4 rounded-[10px] cursor-pointer relative ${showInterestType && 'z-[51]'} `}
            >
              <img src={PercentIcon} />

              <div className="">
                <p className="text-sm">Bunga</p>
                <p className="text-lg capitalize">{interestType}</p>
              </div>

              {showInterestType && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute w-full bg-white left-0 mt-18 z-30 rounded-t cursor-auto shadow-lg"
                  >
                    <div className="border-b border-b-[#ddd] p-5">
                      <p className="text-primary">Pilih tipe bunga</p>
                    </div>
                    <div className="p-5 py-5 space-y-2">
                      {['menurun', 'flat'].map((interest) => (
                        <div key={interest} className="space-x-3">
                          <input
                            checked={interestType === interest}
                            onChange={() => {
                              setInterestType(interest as 'flat' | 'menurun')
                              setShowInterestType(false)
                            }}
                            name="tenor"
                            type="radio"
                            className="cursor-pointer"
                            id={interest}
                          />
                          <label
                            onClick={() => {
                              setShowInterestType(false)
                              setShowInterestType(false)
                            }}
                            className="cursor-pointer capitalize"
                            htmlFor={interest}
                          >
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <button
              onClick={() => {
                handleCalculation()
              }}
              className="bg-[#3387EC] py-5 hover:bg-[#3387EC]/90 transition-colors text-white flex items-center justify-center cursor-pointer rounded-[10px]"
            >
              <span className="text-lg font-semibold">Hitung Simulasi</span>
              <ChevronRight className="ml-2.5" />
            </button>
          </div>

          <p className="text-white font-medium mt-10">
            *Kalkulator ini dirancang hanya sebagai simulasi kredit belaka.
            Untuk lebih lanjut silahkan hubungi bank pemberi pinjaman.
          </p>
        </div>

        {calculatorResults.length > 0 && (
          <motion.div
            className="mt-12 container mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="grid grid-cols-3">
              <div className="bg-primary py-[124px] px-5 text-white flex flex-col items-center justify-center rounded-tl-2xl">
                <div className="flex gap-3.5 mb-3">
                  <img src={WhiteCurrency} />
                  <span className="font-semibold text-2xl">
                    Angsuran Cicilan per Bulan
                  </span>
                </div>
                <p
                  className={`font-semibold ${(result?.nominal.length || 0) > 8 ? 'text-3xl' : 'text-5xl'}`}
                >
                  {calculatorResults[0].interest_rate_pokok}
                </p>
              </div>
              <div className="col-span-2 bg-[#F0F4FF] py-[51px] px-[67px] rounded-tr-2xl relative">
                <h5 className="text-2xl font-semibold text-primary mb-[31px]">
                  Total Angsuran Per Bulan
                </h5>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Nominal (Rp)</p>
                    <p className="">{result?.nominal}</p>
                  </div>
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Jangka Waktu (Bulan)</p>
                    <p className="">{result?.tenor} Bulan</p>
                  </div>
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Suku bunga per Tahun</p>
                    <p className="">{result?.interest}%</p>
                  </div>
                </div>

                <button
                  onClick={handleResetCalculation}
                  className="absolute top-5 right-5 cursor-pointer text-primary hover:text-primary/90 transition-colors"
                >
                  <X />
                </button>
              </div>
            </div>

            <motion.table
              className="w-full shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <thead className="bg-[#64AAFF]">
                <tr className="text-white font-semibold text-lg">
                  <th className="py-[23px]">Bulan Ke</th>
                  <th className="py-[23px]">Angsuran Bunga</th>
                  <th className="py-[23px]">Angsuran Pokok</th>
                  <th className="py-[23px]">Total Angsuran</th>
                  <th className="py-[23px]">Sisa Pinjaman</th>
                </tr>
              </thead>
              <tbody>
                {calculatorResults.map((item, i) => (
                  <motion.tr
                    key={i}
                    className={`${
                      i % 2 === 1 ? 'bg-[#1946B9]/10' : 'bg-white'
                    } text-primary text-lg font-semibold`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <td className="text-center py-[23px]">{item.periode}</td>
                    <td className="text-center py-[23px]">
                      {item.interest_rate}
                    </td>
                    <td className="text-center py-[23px]">
                      {item.interest_rate_pokok}
                    </td>
                    <td className="text-center py-[23px]">
                      {item.total_angsuran}
                    </td>
                    <td className="text-center py-[23px]">
                      {item.sisa_pinjaman}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>
        )}
      </div>
    </>
  )
}
