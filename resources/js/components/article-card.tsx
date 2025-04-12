import { router } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'

interface ArticleCardProps {
  title: string
  image_url: string
  slug: string
  created_at: string
}

export default function ArticleCard({
  title,
  image_url,
  slug,
  created_at,
}: ArticleCardProps) {
  const handleNavigate = () => {
    router.visit(`/articles/${slug}`)
  }

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer border border-[#ddd]"
      onClick={handleNavigate}
    >
      <div className="">
        <img src={image_url} alt="" className="aspect-square object-cover" />
      </div>
      <div className="bg-primary h-full text-white py-[15px] md:py-[10px] px-[15px] md:px-[30px]">
        <h2 className="font-semibold md:text-xl">{title}</h2>
        <div className="text-xs md:text-sm font-medium my-[8.5px] flex items-center">
          Lanjut Baca
          <ChevronRight className="w-4 h-4 ml-2" />
        </div>
        <p className="text-xs">Admin BPR Aruna | {created_at}</p>
      </div>
    </div>
  )
}
