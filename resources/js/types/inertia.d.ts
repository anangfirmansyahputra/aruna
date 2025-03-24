import { PageProps } from '@inertiajs/react'

export type Locale = 'id' | 'en'

declare module '@inertiajs/react' {
  interface PageProps {
    locale: Locale
  }
}
