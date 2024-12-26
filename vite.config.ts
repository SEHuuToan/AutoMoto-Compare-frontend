import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import host from 'vite-plugin-host';
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['js-cookies'],
  },
  plugins: [
    host ({
      port:4000
    }),
  ]
})
