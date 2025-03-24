const translations = {
  id: {
    apply_now: 'Ajukan sekarang',
    credit_simulation: 'Simulasi Kredit',
    about_nav: 'Tentang',
    product_nav: 'Produk',
    news_nav: 'Berita',
    career_nav: 'Karir',
    promo_nav: 'Promo',
    proposal_nav: 'Pengajuan',
    home_nav: 'Beranda',
    contact_nav: 'Kontak',
  },
  en: {
    apply_now: 'Apply now',
    credit_simulation: 'Credit Simulation',
    about_nav: 'About Us',
    product_nav: 'Product',
    news_nav: 'News',
    career_nav: 'Career',
    promo_nav: 'Promo',
    proposal_nav: 'Application',
    home_nav: 'Home page',
    contact_nav: 'Contact',
  },
}

type Locale = keyof typeof translations
type TranslationKey = keyof (typeof translations)[Locale]

export function getTranslate(locale: 'en' | 'id', field: TranslationKey) {
  return translations[locale][field] ?? '-'
}
