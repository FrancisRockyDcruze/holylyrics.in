import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest:{
        short_name: "Holy Lyrical",
        name: "Holy Lyrical",
        description: "Holy Lyrical contains all church Christian lyrics of all the songs with category",
        icons: [
            {
                "src": "icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        start_url: "/holylyrics.in/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      }
    })
  ],
  base: '/holylyrics.in/',
})