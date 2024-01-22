# My personal website (WIP)

This is a personal website built with Astro Starter Kit (Minimal).

The emphasis of this site is on **simplicity**, with optimizations for
**performance**, **accessibility**, and **SEO**. These optimizations are based
on the standards set by
[unlighthouse](https://github.com/harlan-zw/unlighthouse),
[web.dev](https://web.dev/measure/), and [gtmetrix](https://gtmetrix.com/)
audits.

While the site may not look visually appealing at the moment, improvements are
being made over time. There are many features I plan to add, but my primary aim
is to keep the site simple and focused on content.

> At first, when I started this project, I didn't think it would be this complex
> or require so many integrations. I guess I've been working on the frontend
> side in my comfort zone for too long , as my workplace hasn't allowed me to
> try anything new. This experience has been fun and enjoyable, reminding me of
> why I wanted to be a developer in the first place. It has reignited my passion
> for life, and I can't wait to see the finished site.

## Integration

### Astro & tools used by far

| Name                                                                           | Description                                                                                                                                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Markdown🧑‍🚀](https://docs.astro.build/en/guides/markdown-content/)             | Commonly used for authoring text-heavy content.                                                                                                         |
| [Tailwind👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/tailwind/)  | Utility classes for styling instead of writing CSS.                                                                                                     |
| [Typography](https://github.com/tailwindlabs/tailwindcss-typography)           | Provides beautiful typographic defaults for HTML.                                                                                                       |
| [DaisyUI](https://github.com/saadeghi/daisyui)                                 | A Tailwind CSS component library.                                                                                                                       |
| [Image👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/image/)        | An Astro integration for easy image optimization.                                                                                                       |
| [Sharp](https://github.com/lovell/sharp)                                       | High-performance Node.js image processing library.                                                                                                      |
| [Sitemap👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/sitemap/)    | Helps search engines crawl your site more efficiently by generating a sitemap.                                                                          |
| [Zod](https://github.com/colinhacks/zod)                                       | TypeScript-first schema validation with static type inference.                                                                                          |
| [Adapter(Node)👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/node/) | Allows Astro to deploy your SSR site to Node Targets.                                                                                                   |
| [Nanostores👨‍🚀](https://docs.astro.build/en/core-concepts/sharing-state/)       | A tiny (313 bytes) State manager.                                                                                                                       |
| [Remark42](https://github.com/umputun/remark42)                                | A self-hosted, lightweight, and simple (yet functional) comment engine.                                                                                 |
| [Amazon SES](https://aws.amazon.com/ses/)                                      | A cloud-based email sending service.                                                                                                                    |
| [Partytown](https://partytown.builder.io/)                                     | A lazy-loaded library to help relocate resource intensive scripts into a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) |
| [Mermaid](https://github.com/mermaid-js/mermaid)                               | Generate diagrams from markdown-like text.                                                                                                              |

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
