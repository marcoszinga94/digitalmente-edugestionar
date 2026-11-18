// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cambiá esta URL por el dominio real antes de publicar.
  site: 'https://edugestionar.com.ar',
  integrations: [
    react(),
    // La política de privacidad queda fuera del sitemap porque es noindex.
    sitemap({ filter: (page) => !page.includes('/privacidad') }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
