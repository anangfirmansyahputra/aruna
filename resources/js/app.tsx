import './bootstrap'
import '../css/app.css'
import '@ant-design/v5-patch-for-react-19'

import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
