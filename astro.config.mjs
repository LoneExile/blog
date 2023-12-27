import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";
import clickDirective from "./directive/click-directive/register.js";

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService(),
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "th"],
    fallback: { th: "en" },
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "server",
  site: "https://voidbox.io",
  integrations: [
    tailwind(),
    sitemap(),
    preact(),
    partytown(),
    clickDirective(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
