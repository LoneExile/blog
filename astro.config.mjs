import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import clickDirective from "./directive/click-directive/register.js";
import rehypeToc from "rehype-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import rehypeRaw from "rehype-raw";
import { rehypeImageZoom } from "./src/utils/rehype-image-zoom.ts";

const markdown = unified({
  rehypePlugins: [
    rehypeRaw,
    rehypeImageZoom,
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [
      rehypeToc,
      {
        headings: ["h1", "h2", "h3"],
        cssClasses: {
          toc: "toc-post",
          list: "toc-list",
          listItem: "toc-list-item",
          link: "toc-link",
        },
        // customizeTOC: (toc) => {
        //   // Ensure the TOC has the nav element
        //   if (toc.tagName !== 'nav') {
        //     const nav = { type: 'element', tagName: 'nav', properties: { ...toc.properties }, children: [toc] }
        //     return nav
        //   }
        //   return toc
        // },
      },
    ],
  ],
});

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: markdown,
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
  site: "https://voidbox.io",
  integrations: [sitemap(), preact(), partytown(), clickDirective()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
});
