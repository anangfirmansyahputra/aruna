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

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
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
