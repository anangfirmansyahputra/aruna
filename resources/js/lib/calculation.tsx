export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatNumber(num: number): string {
  return num.toLocaleString('id-ID', {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 0,
  })
}

export function generateAngsuranSchedule(
  pokok: number,
  bungaTahunan: number,
  jumlahBulan: number,
  startDate: Date = new Date()
) {
  const bungaBulanan = (pokok * (bungaTahunan / 100)) / 12
  const cicilanPokok = pokok / jumlahBulan
  const angsuranPerBulan = cicilanPokok + bungaBulanan
  let sisaPinjaman = pokok

  const hasil: Array<{
    periode: string
    interest_rate: string
    interest_rate_pokok: string
    total_angsuran: string
    sisa_pinjaman: string
  }> = []

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

  return {
    hasil,
    nominal: formatRupiah(pokok),
    interest: bungaTahunan.toString(),
    tenor: jumlahBulan.toString(),
  }
}
