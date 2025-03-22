import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface FaqProductProps {
  title: string
  items: string[]
}

export default function FaqProduct({ items, title }: FaqProductProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Header */}
      <div
        className="bg-gradient-to-r from-[#2B61E9] to-[#1946B9] py-[18px] px-[30px] rounded-[24px] flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h6 className="text-white text-2xl font-semibold">{title}</h6>

        {/* Button with animation */}
        <motion.button
          className="p-3 rounded-full bg-[#3387EC] w-fit"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white" />
        </motion.button>
      </div>

      {/* Content with animation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="space-y-5 mt-5">
          {items.map((item, index) => (
            <div className="flex items-center gap-5 pl-7" key={index}>
              <Check className="text-white bg-[#3387EC] rounded-full w-8 h-8 p-1" />
              <p className="text-xl">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
