import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://voidbox.io',
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    sitemap(),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
