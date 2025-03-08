import { useEffect, useRef, useState } from 'react'
import { Level } from '@tiptap/extension-heading'
import { ChainedCommands, Editor } from '@tiptap/react'
import { Button, Select } from 'antd'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Image,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from 'lucide-react'

interface ToolbarEditorProps {
  editor: Editor | null
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const tools = [
  { task: 'bold', icon: Bold },
  { task: 'italic', icon: Italic },
  { task: 'underline', icon: Underline },
  { task: 'strike', icon: Strikethrough },
  { task: 'codeblock', icon: Code2 },
  { task: 'left', icon: AlignLeft },
  { task: 'center', icon: AlignCenter },
  { task: 'right', icon: AlignRight },
  { task: 'bulletList', icon: List }, // Tambahkan Bullet List
  { task: 'orderedList', icon: ListOrdered }, // Tambahkan Bullet List
] as const

const chainMethods = (
  editor: Editor | null,
  command: (chain: ChainedCommands) => ChainedCommands
) => {
  if (!editor) return
  command(editor.chain().focus()).run()
}

export default function ToolbarEditor({
  editor,
  handleImageUpload,
}: ToolbarEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedHeading, setSelectedHeading] = useState<string>('')

  const handleOnClick = (task: string, editor: Editor) => {
    switch (task) {
      case 'bold':
        return chainMethods(editor, (chain) => chain.toggleBold())
      case 'italic':
        return chainMethods(editor, (chain) => chain.toggleItalic())
      case 'underline':
        return chainMethods(editor, (chain) => chain.toggleUnderline())
      case 'strike':
        return chainMethods(editor, (chain) => chain.toggleStrike())
      case 'codeblock':
        return chainMethods(editor, (chain) => chain.toggleCodeBlock())
      case 'left':
        return chainMethods(editor, (chain) => chain.setTextAlign('left'))
      case 'center':
        return chainMethods(editor, (chain) => chain.setTextAlign('center'))
      case 'right':
        return chainMethods(editor, (chain) => chain.setTextAlign('right'))
      case 'bulletList':
        return chainMethods(editor, (chain) => chain.toggleBulletList()) // Toggle Bullet List
      case 'orderedList':
        return chainMethods(editor, (chain) => chain.toggleOrderedList())
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (value: string) => {
    if (!editor) return

    switch (value) {
      case 'heading-1':
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case 'heading-2':
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'heading-3':
        editor.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case 'paragraph':
        editor.chain().focus().setParagraph().run()
        break
    }
  }

  // Memperbarui value Select setiap kali editor berubah
  useEffect(() => {
    if (!editor) return

    const updateHeadingState = () => {
      if (editor.isActive('heading', { level: 1 })) {
        setSelectedHeading('heading-1')
      } else if (editor.isActive('heading', { level: 2 })) {
        setSelectedHeading('heading-2')
      } else if (editor.isActive('heading', { level: 3 })) {
        setSelectedHeading('heading-3')
      } else {
        setSelectedHeading('paragraph')
      }
    }

    editor.on('selectionUpdate', updateHeadingState)
    editor.on('transaction', updateHeadingState)

    return () => {
      editor.off('selectionUpdate', updateHeadingState)
      editor.off('transaction', updateHeadingState)
    }
  }, [editor])

  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-1">
          {tools.map((item, i) => (
            <Button
              key={i}
              type={editor?.isActive(item.task) ? 'primary' : 'default'}
              onClick={() => handleOnClick(item.task, editor!)}
            >
              <item.icon className="h-4 w-4" />
            </Button>
          ))}

          <Button onClick={handleButtonClick}>
            <Image className="w-4 h-4" />
          </Button>

          <Select
            value={selectedHeading}
            onChange={handleChange}
            placeholder="Heading"
            style={{ minWidth: 150 }}
            disabled={editor?.isActive('codeBlock')}
            options={[
              { label: 'Heading 1', value: 'heading-1' },
              { label: 'Heading 2', value: 'heading-2' },
              { label: 'Heading 3', value: 'heading-3' },
              { label: 'Paragraph', value: 'paragraph' },
            ]}
          />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </>
  )
}
