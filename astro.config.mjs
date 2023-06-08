import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://voidbox.io',
  integrations: [tailwind(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), sitemap(), preact()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});