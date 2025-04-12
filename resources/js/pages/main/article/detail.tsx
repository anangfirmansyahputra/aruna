import Tiptap from '@/components/tiptap'
import MainLayout from '@/layouts/main-layout'
import { Article } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { Facebook, Instagram, Link, Youtube } from 'lucide-react'

interface ArticleDetailPageProps {
  article: Article
  related: Article[]
}

export default function ArticleDetailPage({
  article,
  related,
}: ArticleDetailPageProps) {
  const { locale } = usePage().props
  const lang = locale as 'id' | 'en'

  return (
    <MainLayout>
      <div className="container mx-auto grid grid-cols-3 py-5 md:py-[50px] gap-[50px] md:px-0 px-5">
        <div className="col-span-3 lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-medium">
            {article[`${lang}_title`]}
          </h1>
          <img
            className="mt-[30px] w-full rounded-3xl object-cover aspect-square md:aspect-video"
            src={article.image_url}
            alt={article[`${lang}_title`]}
          />

          <div className="space-y-5 mt-[30px]">
            <Tiptap content={article[`${lang}_content`]} editable={false} />
          </div>

          <div className="mt-[30px] border-t border-t-[#59606E] py-[12px]">
            <div className="flex items-center gap-5">
              <p className="text-[#4D4646]">Bagikan :</p>

              <div className="flex gap-5">
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Facebook className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Youtube className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Instagram className="text-white w-5 h-5" />
                </div>
                <div className="bg-[#59606E] p-1 rounded-full cursor-pointer">
                  <Link className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar kosong, tambahkan placeholder atau hapus */}
        <div className="col-span-3 lg:col-span-1 bg-primary rounded-3xl p-[15px] md:p-[25px] h-fit">
          <p className="text-white md:text-xl font-semibold md:text-start text-center">
            Berita Terkini
          </p>

          <div className="mt-[28px] space-y-[23px]">
            {related.map((r) => (
              <div
                className="flex sm:flex-row flex-col gap-5 cursor-pointer"
                onClick={() => router.visit(`/articles/${r[`${lang}_slug`]}`)}
              >
                <img
                  src={r.image_url}
                  alt={r[`${lang}_title`]}
                  className="sm:w-[35%] h-full rounded-xl lg:rounded-3xl bg-white aspect-video object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">
                    {r[`${lang}_title`]}
                  </p>
                  <p className="text-xs text-[#DEDEDE] mt-[10px]">
                    Feb 18, 2024
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
