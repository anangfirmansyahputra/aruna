export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatNumber(num: number): string {
  return num.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  })
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

// export function formatRupiah(value: number): string {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(value)
//   }

//   function formatNumber(num: number): string {
//     return num.toLocaleString('id-ID', {
//       maximumFractionDigits: 0,
//     })
//   }

//   export function generateAngsuranSchedule(
//     pokok: number,
//     bungaTahunan: number,
//     jumlahBulan: number,
//     startDate: Date = new Date(),
//     tipeBunga: 'flat' | 'menurun' = 'flat' // nilai default 'flat'
//   ) {
//     const hasil: Array<{
//       periode: string
//       interest_rate: string
//       interest_rate_pokok: string
//       total_angsuran: string
//       sisa_pinjaman: string
//     }> = []

//     if (tipeBunga === 'flat') {
//       const bungaBulanan = (pokok * (bungaTahunan / 100)) / 12
//       const cicilanPokok = pokok / jumlahBulan
//       const angsuranPerBulan = cicilanPokok + bungaBulanan
//       let sisaPinjaman = pokok

//       for (let bulan = 0; bulan < jumlahBulan; bulan++) {
//         const tanggal = new Date(startDate)
//         tanggal.setMonth(tanggal.getMonth() + bulan)
//         sisaPinjaman -= cicilanPokok

//         hasil.push({
//           periode: (bulan + 1).toString(),
//           interest_rate: formatNumber(bungaBulanan),
//           interest_rate_pokok: formatNumber(cicilanPokok),
//           total_angsuran: formatNumber(angsuranPerBulan),
//           sisa_pinjaman: formatNumber(Math.max(sisaPinjaman, 0)),
//         })
//       }
//     } else if (tipeBunga === 'menurun') {
//       const i = bungaTahunan / 12 / 100
//       const angsuranBulanan =
//         (pokok * (i * Math.pow(1 + i, jumlahBulan))) /
//         (Math.pow(1 + i, jumlahBulan) - 1)

//       let sisaPinjaman = pokok

//       for (let bulan = 0; bulan < jumlahBulan; bulan++) {
//         const tanggal = new Date(startDate)
//         tanggal.setMonth(tanggal.getMonth() + bulan)

//         const interest = sisaPinjaman * i
//         const principal = angsuranBulanan - interest
//         sisaPinjaman -= principal

//         hasil.push({
//           periode: (bulan + 1).toString(),
//           interest_rate: formatNumber(interest),
//           interest_rate_pokok: formatNumber(principal),
//           total_angsuran: formatNumber(angsuranBulanan),
//           sisa_pinjaman: formatNumber(Math.max(sisaPinjaman, 0)),
//         })
//       }
//     }

//     return {
//       hasil,
//       nominal: formatRupiah(pokok),
//       interest: bungaTahunan.toString(),
//       tenor: jumlahBulan.toString(),
//       tipeBunga,
//     }
//   }
