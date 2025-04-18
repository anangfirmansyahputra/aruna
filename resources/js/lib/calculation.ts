type DepositParams = {
  amount: number
  interestRate: number
  tenor: number
}

export type DepositScheduleItem = {
  period: string
  principal: string
  interest: string
  total: string
}

export type DepositResult = {
  schedule: DepositScheduleItem[]
  finalTotal: string
  baseInterest: string
}

function formatNumber(num: number): string {
  return num.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  })
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export function generateAngsuranSchedule(
  pokok: number,
  bungaTahunan: number,
  jumlahBulan: number,
  tipeBunga: 'flat' | 'menurun' = 'flat',
  startDate: Date = new Date()
) {
  const hasil: Array<{
    periode: string
    interest_rate: string
    interest_rate_pokok: string
    total_angsuran: string
    sisa_pinjaman: string
  }> = []

  if (tipeBunga === 'flat') {
    const bungaBulanan = (pokok * (bungaTahunan / 100)) / 12
    const cicilanPokok = pokok / jumlahBulan
    const angsuranPerBulan = cicilanPokok + bungaBulanan
    let sisaPinjaman = pokok

    for (let bulan = 0; bulan < jumlahBulan; bulan++) {
      const tanggal = new Date(startDate)
      tanggal.setMonth(tanggal.getMonth() + bulan)
      sisaPinjaman -= cicilanPokok

      hasil.push({
        periode: (bulan + 1).toString(),
        interest_rate: formatNumber(bungaBulanan),
        interest_rate_pokok: formatNumber(cicilanPokok),
        total_angsuran: formatNumber(angsuranPerBulan),
        sisa_pinjaman: formatNumber(Math.max(sisaPinjaman, 0)),
      })
    }
  } else if (tipeBunga === 'menurun') {
    const cicilanPokok = pokok / jumlahBulan
    let sisaPinjaman = pokok

    for (let bulan = 0; bulan < jumlahBulan; bulan++) {
      const tanggal = new Date(startDate)
      tanggal.setMonth(tanggal.getMonth() + bulan)

      const bunga = (sisaPinjaman * (bungaTahunan / 100)) / 12
      const totalAngsuran = cicilanPokok + bunga
      sisaPinjaman -= cicilanPokok

      hasil.push({
        periode: (bulan + 1).toString(),
        interest_rate: formatNumber(bunga),
        interest_rate_pokok: formatNumber(cicilanPokok),
        total_angsuran: formatNumber(totalAngsuran),
        sisa_pinjaman: formatNumber(Math.max(sisaPinjaman, 0)),
      })
    }
  }

  return {
    hasil,
    nominal: formatRupiah(pokok),
    interest: bungaTahunan.toString(),
    tenor: jumlahBulan.toString(),
    tipeBunga,
    type: tipeBunga,
  }
}

export function generateDepositoSchedule({ amount, interestRate, tenor }: DepositParams): DepositResult {
  const schedule: DepositScheduleItem[] = []
  let principal = amount
  const now = new Date()

  const grossInterest = (amount * interestRate) / 100 / tenor
  const netInterest = grossInterest * 0.8 // subtract 20% from gross interest

  for (let i = 0; i < tenor; i++) {
    const total = principal + netInterest

    const date = new Date(now)
    date.setMonth(now.getMonth() + i)
    const period = date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })

    schedule.push({
      period,
      principal: formatRupiah(principal),
      interest: formatRupiah(netInterest),
      total: formatRupiah(total),
    })

    principal = total
  }

  return {
    schedule,
    finalTotal: formatRupiah(principal),
    baseInterest: formatRupiah(netInterest),
  }
}
