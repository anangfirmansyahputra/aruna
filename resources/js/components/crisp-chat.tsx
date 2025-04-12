import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'

declare global {
  interface Window {
    $crisp: any[]
    CRISP_WEBSITE_ID: string
  }
}

const CrispChat = () => {
  const { props } = usePage<{ apiKey: string }>()

  useEffect(() => {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = props.crisp_website_id as string

    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

export default CrispChat
