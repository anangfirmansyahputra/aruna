import { ReactNode } from 'react'
import { Modal as AntModal } from 'antd'

interface Modal {
  open: boolean
  onOk: () => void
  onCancel: () => void
  title: string
  content: ReactNode
}

export default function Modal({ content, onCancel, onOk, open, title }: Modal) {
  return (
    <AntModal title={title} open={open} onOk={onOk} onCancel={onCancel}>
      {content}
    </AntModal>
  )
}
