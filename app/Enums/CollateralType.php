<?php

namespace App\Enums;

enum CollateralType: string
{
  case BPKB_MOBIL = 'BPKB Mobil';
  case BPKB_MOTOR = 'BPKB Motor';
  case SERTIFIKAT_RUMAH = 'Sertifikat Rumah';
  case PEMBIAYAAN_SYARIAH = 'Pembiayaan Syariah';
  case KREDIT_MOBIL_BEJAS = 'Kredit Mobil Bekas';
  case PEMBIAYAAN_ALAT_BERAT = 'Pembiayaan Alat Berat & Industri';
  case PEMBIAYAAN_KPR = 'Pembiayaan Kepemilikan Rumah';
}
