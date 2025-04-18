import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Option = {
  label: string
  value: string
}

type SelectInputProps = {
  required?: boolean
  options: Option[]
  onChange: (e: string, name: string) => void
  name: string
  value?: string
}
export default function SelectInput({
  options,
  onChange,
  name,
  value,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)
  const selected = options.find((opt) => opt.value === value) || null

  return (
    <div className="w-full">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left text-xs px-4 py-3 rounded-xl border border-gray-300 md:text-sm text-gray-500 focus:outline-none"
        >
          {selected ? selected.label : 'Silahkan Pilih'}
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
        </button>
        {open && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setOpen(false)
                  onChange(option.value, name)
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

