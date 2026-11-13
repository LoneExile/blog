import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
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
        // Label the contents box, and leave it out when a post has no
        // headings (rehype-toc would otherwise add an empty <nav>).
        customizeTOC: (toc) => {
          const list = toc.children?.[0];
          if (!list?.children?.length) return false;
          toc.properties = { ...toc.properties, "aria-label": "Contents" };
          toc.children.unshift({
            type: "element",
            tagName: "p",
            properties: { className: ["toc-title"] },
            children: [{ type: "text", value: "Contents" }],
          });
          return toc;
        },
      },
    ],
  ],
});

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: markdown,
    // Code blocks: github-dark-default keeps comments readable (6.2:1 on its
    // #0d1117 background; github-dark's comments were 3.0:1).
    shikiConfig: { theme: "github-dark-default" },
  },
  // Responsive images: srcset and sizes for every image, Markdown included,
  // so phones stop downloading the 2000px screenshots.
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "th"],
  },
  prefetch: false,
  site: "https://blog.apinant.dev",
  integrations: [sitemap(), preact()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
});
