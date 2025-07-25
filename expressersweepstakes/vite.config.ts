import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isNetlify = mode === 'netlify'
  const isProduction = command === 'build'
  
  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: isNetlify ? '/' : (isProduction ? '/expressersweepstakes/' : '/'),
    build: {
      outDir: isNetlify ? 'dist' : (isProduction ? '../' : 'dist'),
      assetsDir: 'assets',
      emptyOutDir: !isNetlify, // Don't empty for Netlify, empty for GitHub Pages
    },
  }
})
