import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, X } from 'lucide-react'
import Calculator from '../../../../../../public/assets/calculator.svg'
import CalendarIcon from '../../../../../../public/assets/calendar.svg'
import Currency from '../../../../../../public/assets/currency.svg'
import PercentIcon from '../../../../../../public/assets/percent.svg'
import Timer from '../../../../../../public/assets/timer.svg'
import WhiteCurrency from '../../../../../../public/assets/white-currency.svg'
import { useState } from 'react'
import { InterestRate, Product, ProductTranslation } from '@/types'
import { message } from 'antd'
import { DepositResult, formatRupiah, generateDepositoSchedule } from '@/lib/calculation'

interface TableInterface {
  product: ProductTranslation & {
    product: Product & {
      interest_rates: InterestRate[]
    }
  }
}

export default function DepositoTable({ product }: TableInterface) {
  const [showInterest, setShowInterest] = useState(false)
  const [tenor, setTenor] = useState<null | number>(null)
  const [showResultCalculator, setShowResultCalculator] = useState(false)
  const [calculatorResults, setCalculatorResults] = useState<DepositResult>({
    schedule: [],
    finalTotal: '',
    baseInterest: '',
  })


  const [nominal, setNominal] = useState(0)
  const [selectedInterest, setSelectedInterest] = useState(0)
  const [selectedTenor, setSelectedTenor] = useState(0)
  const [displayNominal, setDisplayNominal] = useState('Rp. 0')

  const findInterest = (id: number) => {
    return product.product.interest_rates.find((interest) => interest.id === id)
  }

  const handleSelectTenor = (tenor: number) => {
    setShowInterest(false)
    setTenor(tenor)
  }

  const handleCalculation = () => {
    if (nominal === 0) {
      message.info('Mohon untuk mengisi nominal dana terlebih dahulu')
      return
    }

    const selected = findInterest(tenor!)
    if (!selected) {
      message.info('Mohon untuk memilih suku bunga dan periode lama deposito')
      return
    }

    setSelectedInterest(selected.interest)
    setSelectedTenor(selected.tenor)

    const results = generateDepositoSchedule({
      amount: nominal,
      interestRate: selected.interest,
      tenor: selected.tenor,
    })

    setCalculatorResults(results)
    setShowResultCalculator(true)
  }


  return (
    <>
      {showInterest && (
        <div
          className="fixed h-screen w-screen bg-black/50 z-[50] bottom-0 left-0 top-0 right-0"
          onClick={() => setShowInterest(false)}
        />
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

              <div>
                <p className="text-sm">Nominal Dana</p>
                <input
                  value={displayNominal}
                  type="text"
                  className="text-lg border-none outline-none w-full"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, '')

                    if (rawValue === '') {
                      setNominal(0)
                      setDisplayNominal('')
                      return
                    }

                    const numericValue = parseInt(rawValue, 10)
                    setNominal(numericValue)
                    setDisplayNominal(formatRupiah(numericValue))
                  }}
                />

              </div>
            </div>

            <div
              className="bg-white p-3 flex gap-4 rounded-[10px] cursor-pointer relative z-[60]"
              onClick={() => setShowInterest(true)}
            >
              <img src={Timer} />

              <div className="hover:text-primary transition-colors">
                <p className="text-sm">Lama Deposito</p>
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
                    className="absolute w-full bg-white left-0 mt-18 z-[60] rounded-t cursor-auto shadow-lg"
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

            <button
              onClick={() => handleCalculation()}
              className="bg-[#3387EC] hover:bg-[#3387EC]/90 transition-colors text-white flex items-center justify-center cursor-pointer rounded-[10px]"
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

        {showResultCalculator && (
          <motion.div
            className="mt-12 container mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="grid grid-cols-3">
              <div className="bg-primary py-[124px] text-white flex flex-col items-center justify-center rounded-tl-2xl">
                <div className="flex gap-3.5 mb-3">
                  <img src={WhiteCurrency} />
                  <span className="font-semibold text-2xl">
                    Total Deposito
                  </span>
                </div>
                <p className="font-semibold text-5xl">
                  {calculatorResults.finalTotal}
                </p>
              </div>
              <div className="col-span-2 bg-[#F0F4FF] py-[51px] px-[67px] rounded-tr-2xl relative">
                <h5 className="text-2xl font-semibold text-primary mb-[31px]">
                  Detail
                </h5>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Nominal (Rp)</p>
                    <p className="">{formatRupiah(nominal)}</p>
                  </div>
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Jangka Waktu (Bulan)</p>
                    <p className="">{selectedTenor} Bulan</p>
                  </div>
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Suku bunga per bulan</p>
                    <p className="">{selectedInterest}%</p>
                  </div>
                  <div className="grid grid-cols-3 text-xl text-[#736E6E] font-normal">
                    <p className="col-span-2">Bunga per bulan (Rp)</p>
                    <p className="">{calculatorResults.baseInterest}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowResultCalculator(false)}
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
                  <th className="py-[23px]">Periode</th>
                  <th className="py-[23px]">Pokok</th>
                  <th className="py-[23px]">Bunga</th>
                  <th className="py-[23px]">Saldo Akhir</th>
                </tr>
              </thead>
              <tbody>
                {calculatorResults.schedule.map((item, i) => (
                  <motion.tr
                    key={i}
                    className={`${i % 2 === 1 ? 'bg-[#1946B9]/10' : 'bg-white'
                      } text-primary text-lg font-semibold`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <td className="text-center py-[23px]">{item.period}</td>
                    <td className="text-center py-[23px]">
                      {item.principal}
                    </td>
                    <td className="text-center py-[23px]">
                      {item.interest}
                    </td>
                    <td className="text-center py-[23px]">
                      {item.total}
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