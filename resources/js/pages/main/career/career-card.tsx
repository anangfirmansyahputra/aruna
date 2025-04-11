import { Check, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface CareerCardProps {
  id: number
  id_title: string
  en_title: string
  id_requirement: string
  en_requirement: string
  created_at: Date
  updated_at: Date
  lang: 'id' | 'en'
}

export default function CareerCard({
  en_requirement,
  en_title,
  id,
  id_requirement,
  id_title,
  lang,
}: CareerCardProps) {
  const [open, setOpen] = useState(false)

  const title = lang === 'en' ? en_title : id_title
  const requirement = lang === 'en' ? en_requirement : id_requirement

  return (
    <div className="py-[16.5px] px-[30px] bg-white rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <motion.button
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={() => setOpen((prev) => !prev)}
          className="bg-[#3387EC] p-[12px] rounded-full cursor-pointer hover:bg-[#3387EC]/90 transition-colors"
        >
          <ChevronUp className="text-white" />
        </motion.button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="mt-[23px] space-y-5"
        >
          {(JSON.parse(requirement) as string[]).map((item) => (
            <div className="flex items-center gap-5">
              <div className="bg-[#1946B9] w-fit rounded-full p-1">
                <Check className="text-white" />
              </div>
              <span>{item}</span>
            </div>
          ))}

          <button className="bg-primary text-lg text-white py-2 px-5 rounded-[16px] hover:bg-primary/90 transition-colors cursor-pointer">
            Lamar Sekarang
          </button>
        </motion.div>
      )}
    </div>
  )
}
