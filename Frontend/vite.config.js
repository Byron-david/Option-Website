import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic' // ← This is the modern way
  })],
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // Add this
  },
  server: {
    proxy: {
      '/api/auth': 'http://localhost:3000',
      '/api/login': 'http://localhost:3000',
      '/api/dashboard': 'http://localhost:3000',
      '/api/logout': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // '/api/dashboard/trades': 'http://localhost:3000',
      // Add other API endpoints if needed
    }
  }
})
