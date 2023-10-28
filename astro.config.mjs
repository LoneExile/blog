import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import { mermaid } from "./src/plugins/mermaid";
import compress from "astro-compress";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService(),
  },
  output: "server",
  site: "https://voidbox.io",
  integrations: [
    tailwind(),
    sitemap(),
    preact(),
    // compress({
    //   // 51.49 KB (1.83% reduction) not worth it
    //   exclude: ["mermaid.init.js"],
    //   img: false,
    // }),
    partytown(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    remarkPlugins: [mermaid],
  },
});
