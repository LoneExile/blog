import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";
import clickDirective from "./directive/click-directive/register.js";
import rehypeToc from "rehype-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import rehypeRaw from 'rehype-raw'
import { rehypeImageZoom } from './src/utils/rehype-image-zoom.ts'

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService(),
  },
  markdown: {
    rehypePlugins: [
      rehypeRaw, rehypeImageZoom,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: "wrap" },
      ],
      [
        rehypeToc,
        {
          headings: ["h1", "h2", "h3"],
          // cssClasses: {
          //   toc: "toc-post",
          //   link: "toc-link",
          // },
        },
      ],
    ],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "th"],
    // fallback: { th: "en" },
    // routing: {
    //   prefixDefaultLocale: false,
    //   redirectToDefaultLocale: false
    // },
  },
  prefetch: false,
  output: "server",
  site: "https://voidbox.io",
  integrations: [
    tailwind(),
    sitemap(),
    preact(),
    partytown(),
    clickDirective(),
  ],
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
});
