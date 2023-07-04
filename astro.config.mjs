import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import preact from '@astrojs/preact'
import {mermaid} from './src/plugins/mermaid'
import compress from 'astro-compress'

import partytown from '@astrojs/partytown'

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
    preact(),
    compress({
      // 51.49 KB (1.83% reduction) not worth it
      exclude: ['mermaid.js'],
      img: false,
    }),
    partytown(),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  markdown: {
    remarkPlugins: [mermaid],
  },
})
