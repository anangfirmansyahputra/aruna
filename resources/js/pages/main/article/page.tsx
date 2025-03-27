import ArticleCard from '@/components/article-card'
import MainLayout from '@/layouts/main-layout'

const articles = [
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
  {
    title: 'BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019',
  },
]

export default function ArticlePage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-[40px]">
        <h1 className="font-semibold text-4xl text-primary text-center">
          Dapatkan Berita Terkait Finansial Dari Kami
        </h1>
        <p className="text-lg text-[#3F4145] text-center mt-[25px]">
          Jelajahi tren dan wawasan terbaru di dunia finansial melalui artikel
          informatif dari kami.
        </p>

        <div className="bg-primary aspect-[21/7] mt-[50px] rounded-[30px] px-10 flex items-end py-[50px] ">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-[15px]">
              BPR Aruna raih GOLDEN AWARDS Infobank 10th BPR Awards 2019
            </h1>
            <p className="text-white text-lg">BPR Aruna | Mar 3, 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-10 gap-[35px]">
          {articles.map((article, i) => (
            <ArticleCard {...article} key={i} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
