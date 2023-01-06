import {defineConfig} from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import image from '@astrojs/image'

// https://astro.build/config
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.bunlaikun.dev',
  integrations: [
    tailwind(),
    image({
      serviceEndpoint: '@astrojs/image/sharp',
    }),
    sitemap(),
    compress({
      img: false,
    }),
  ],
})
