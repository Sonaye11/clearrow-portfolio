import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function resolveSiteUrl() {
  if (process.env.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:5173'
}

const siteUrl = resolveSiteUrl()
if (!process.env.VITE_SITE_URL) {
  process.env.VITE_SITE_URL = siteUrl
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', siteUrl)
      },
    },
  ],
})
