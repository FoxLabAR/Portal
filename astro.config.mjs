import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwind from '@astrojs/tailwind';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), db()],
  server: {
    cors: {
      origin: ['*'], // En producción, especifica los dominios permitidos
      methods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type'],
      credentials: true
    }
  },
  vite: {
    server: {
    proxy: {
      // Si necesitas hacer proxy a otras APIs
      '/api': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
}
});