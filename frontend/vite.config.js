import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 5173,
    proxy:{
      '/api': {
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true,
        secure: false, // If your backend is using HTTP instead of HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
      }
    }
  }
})
