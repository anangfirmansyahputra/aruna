import { ChevronRight } from 'lucide-react'

interface ArticleCardProps {
  title: string
}

export default function ArticleCard({ title }: ArticleCardProps) {
  return (
    <div className="aspect-[1/1] flex flex-col rounded-2xl overflow-hidden cursor-pointer">
      <img src="" alt="" className="bg-[#D1CFCF] flex-1" />
      <div className="bg-primary text-white py-[25px] px-[30px]">
        <h2 className="font-semibold text-xl">{title}</h2>
        <div className="text-sm font-medium my-[8.5px] flex items-center">
          Lanjut Baca
          <ChevronRight className="w-4 h-4 ml-2" />
        </div>
        <p className="text-xs">Admin BPR Aruna | Mar 3, 2025</p>
      </div>
    </div>
  )
}
