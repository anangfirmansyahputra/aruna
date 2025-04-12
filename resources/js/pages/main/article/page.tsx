import ArticleCard from '@/components/article-card'
import SeoHead from '@/components/seo-head'
import MainLayout from '@/layouts/main-layout'
import { Article, SEO } from '@/types'
import { router, usePage } from '@inertiajs/react'

interface ArticlePageProps {
  articles: Article[]
  seo: SEO | null
}

export default function ArticlePage({ articles, seo }: ArticlePageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <>
      <SeoHead
        url="/articles"
        seo={seo}
        fallbackTitle={{
          id: 'Artikel',
          en: 'Articles',
        }}
        fallbackDescription={{
          id: 'Temukan artikel informatif dan bermanfaat dari kami.',
          en: 'Discover informative and useful articles from us.',
        }}
        fallbackKeywords={{
          id: 'artikel, berita, informasi',
          en: 'articles, news, information',
        }}
      />

      <MainLayout>
        <div className="container mx-auto py-[40px] md:px-0 px-5">
          <h1 className="font-semibold text-xl md:text-4xl text-primary text-center">
            Dapatkan Berita Terkait Finansial Dari Kami
          </h1>
          <p className="md:text-lg text-[#3F4145] text-center mt-[25px]">
            Jelajahi tren dan wawasan terbaru di dunia finansial melalui artikel
            informatif dari kami.
          </p>

          {articles[0] && (
            <div
              role="button"
              onClick={() =>
                router.visit(`/articles/${articles[0][`${lang}_slug`]}`)
              }
              style={{
                backgroundImage: `url(${articles[0].image_url})`,
              }}
              className="bg-cover bg-center bg-no-repeat aspect-square sm:aspect-video lg:aspect-[21/7] mt-[50px] rounded-[30px] px-5 md:px-10 flex items-end py-[25px] md:py-[50px]"
            >
              <div>
                <h1 className="text-lg md:text-3xl font-semibold text-white mb-[15px]">
                  {articles[0][`${lang}_title`]}
                </h1>
                <p className="text-white md:text-lg">
                  BPR Aruna | {articles[0].created_at}
                </p>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-5 sm:mt-10 gap-5 lg:gap-[35px]">
            {articles.slice(1, 3).map((article, i) => (
              <ArticleCard
                slug={article[`${lang}_slug`]}
                image_url={article.image_url}
                title={article[`${lang}_title`]}
                created_at={article.created_at}
                key={i}
              />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}
