import { Head, usePage } from '@inertiajs/react'
import { SEO } from '@/types'

interface SeoHeadProps {
  seo?: SEO | null
  fallbackTitle?: { id: string; en: string }
  fallbackDescription?: { id: string; en: string }
  fallbackKeywords?: { id: string; en: string }
  image?: string // opsional custom og:image
  url: string
}

export default function SeoHead({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackKeywords,
  image,
  url,
}: SeoHeadProps) {
  const { locale, app_url } = usePage().props
  const lang = locale as 'id' | 'en'

  const title =
    seo?.[`${lang}_title`] || fallbackTitle?.[lang] || 'Untitled Page'
  const description =
    seo?.[`${lang}_meta_descriptions`] ||
    fallbackDescription?.[lang] ||
    'Default description'
  const keywords = seo?.[`${lang}_keywords`] || fallbackKeywords?.[lang] || ''

  const siteUrl = `${app_url}${url}` // Ganti domain
  const ogImage = image || `${app_url}/public/assets/logo.png`

  const newTitle = title + ' | BPR Aruna'

  return (
    <Head title={newTitle}>
      {/* Standard SEO */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="language" content={lang} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={newTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={newTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
