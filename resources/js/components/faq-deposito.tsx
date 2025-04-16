import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface FaqDepositoProps {
  title: string
  items: string[]
}

export default function FaqDeposito({ items, title }: FaqDepositoProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div
        className={`
          bg-gradient-to-r from-[#2B61E9] to-[#1946B9] py-3 px-8 flex items-center justify-between cursor-pointer transition-all duration-300 ease-in-out 
          ${open ? 'rounded-t-3xl' : 'rounded-3xl'}`
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        <h6 className="text-white text-xl md:text-2xl font-semibold">{title}</h6>

        <motion.button
          className="p-2 rounded-full bg-[#3387EC] w-fit cursor-pointer"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white" />
        </motion.button>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="space-y-4">
          {items.map((item, index) => (
            <div className="flex items-center gap-4 p-6 bg-[#F0F4FF] rounded-b-3xl" key={index}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
