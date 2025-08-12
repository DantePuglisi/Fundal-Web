import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Use root path for GitHub Pages since we're deploying from front-app directory
    base: command === 'serve' ? '/' : '/Fundal-Web/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      outDir: 'dist',
    },
    server: {
      port: 5173,
      host: true,
    },
  };
});
