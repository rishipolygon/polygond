import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (polygond.com) serves from the root, so base stays '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
