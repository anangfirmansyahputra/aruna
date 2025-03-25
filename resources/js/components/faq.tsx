import { Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

interface FaqProps {
  title: string
  description: string
}

export default function Faq({ description, title }: FaqProps) {
  const [show, setShow] = React.useState(false)

  return (
    <div className="p-[30px] rounded-2xl shadow space-y-3">
      <div className="flex items-center justify-between gap-5">
        <h6 className="text-xl font-medium text-[#292C31]">{title}</h6>
        <button
          className="cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <Minus /> : <Plus />}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          show ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
        }
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-sm font-medium text-[#737C87]">{description}</p>
      </motion.div>
    </div>
  )
}
