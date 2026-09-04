import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

const socialMetadata = () => ({
  name: 'social-metadata',
  transformIndexHtml(html) {
    const deploymentHost = process.env.VITE_SITE_URL
      || process.env.SITE_URL
      || process.env.VERCEL_PROJECT_PRODUCTION_URL
      || process.env.VERCEL_URL
      || ''
    const siteUrl = deploymentHost && !deploymentHost.startsWith('http')
      ? `https://${deploymentHost}`
      : deploymentHost

    return html.replaceAll('__SITE_URL__', siteUrl.replace(/\/$/, ''))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), socialMetadata()],
})
