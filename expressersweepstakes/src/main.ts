import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'festive',
    themes: {
      festive: {
        dark: true,
        colors: {
          primary: '#FF6B35', // Vibrant orange-red
          secondary: '#F7931E', // Golden orange
          accent: '#FFD23F', // Bright yellow
          error: '#FF5722', // Red-orange
          info: '#29B6F6', // Sky blue
          success: '#66BB6A', // Fresh green
          warning: '#FFA726', // Amber
          surface: '#1A1A2E', // Dark purple-blue
          background: '#16213E', // Deep navy
          'on-surface': '#EEEEFF', // Light blue-white
          'on-primary': '#FFFFFF', // White
          'primary-darken-1': '#E55722',
          'secondary-darken-1': '#E8851E',
          celebration: '#E91E63', // Pink for celebration
          gold: '#FFD700', // Gold for prizes
          festive: '#8BC34A', // Lime green
        },
      },
      dark: {
        colors: {
          primary: '#FF6B35',
          secondary: '#F7931E',
          accent: '#FFD23F',
          error: '#FF5722',
          info: '#29B6F6',
          success: '#66BB6A',
          warning: '#FFA726',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
