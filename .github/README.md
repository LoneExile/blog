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

| Name                                                                           | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [Markdown🧑‍🚀](https://docs.astro.build/en/guides/markdown-content/)             | Commonly used for authoring text-heavy content.                                |
| [Tailwind👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/tailwind/)  | Utility classes for styling instead of writing CSS.                            |
| [Typography](https://github.com/tailwindlabs/tailwindcss-typography)           | Provides beautiful typographic defaults for HTML.                              |
| [DaisyUI](https://github.com/saadeghi/daisyui)                                 | A Tailwind CSS component library.                                              |
| [Image👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/image/)        | An Astro integration for easy image optimization.                              |
| [Sharp](https://github.com/lovell/sharp)                                       | High-performance Node.js image processing library.                             |
| [Sitemap👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/sitemap/)    | Helps search engines crawl your site more efficiently by generating a sitemap. |
| [Zod](https://github.com/colinhacks/zod)                                       | TypeScript-first schema validation with static type inference.                 |
| [Adapter(Node)👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/node/) | Allows Astro to deploy your SSR site to Node Targets.                          |
| [Nanostores👨‍🚀](https://docs.astro.build/en/core-concepts/sharing-state/)       | A tiny (313 bytes) State manager.                                              |
| [Remark42](https://github.com/umputun/remark42)                                | A self-hosted, lightweight, and simple (yet functional) comment engine.        |
| [Amazon SES](https://aws.amazon.com/ses/)                                      | A cloud-based email sending service.                                           |

<!-- ### Font -->

<!-- - [inter](https://github.com/rsms/inter) -->

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

## Todo

- [ ] add [ESLint](https://docs.astro.build/en/editor-setup/#eslint) to the
      project and set up a ci job to run it
- [ ] Storage - figure out a way to import from [joplin](https://joplinapp.org/)
      or [obsidian](https://obsidian.md/)) notes into this site
      [read](https://github.com/LoneExile/blog#Storage)
- [x] add comments functionality ([giscus](https://github.com/giscus/giscus) ,
      [utterances](https://github.com/utterance/utterances) or
      [remark42](https://github.com/umputun/remark42))
  - [x] basic comments functionality
  - [x] login with GitHub, Google, Twitter, etc.
  - [x] configure mail server to send notifications
        ([docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)
        or [Amazon SES](https://aws.amazon.com/ses/))
- [ ] UI
  - [x] add [daisyui](https://github.com/saadeghi/daisyui)
  - [x] add dark mode with lazy loading
  - [x] navbar
  - [x] footer
  - [ ] home page
  - [x] about page
  - [ ] blog page
    - [ ] table of contents
    - [x] add
          [typography](https://github.com/tailwindlabs/tailwindcss-typography)
          to blog posts
    - [ ] add reading progress bar
    - [ ] add reading time
    - [x] add tags
    - [ ] add categories
    - [x] add comments
    - [ ] add share buttons
    - [ ] add related posts
    - [ ] read/view count
- [ ] search functionality
      ([instantsearch](https://github.com/algolia/instantsearch),
      [autocomplete](https://github.com/algolia/autocomplete),
      [orama](https://github.com/oramasearch/orama) or none of these)
  - [ ] add tags and categories pages
  - [ ] add tags and categories to the navbar
  - [ ] add tags and categories to blog posts
- [ ] add
      [Astro prefetch](https://docs.astro.build/en/guides/integrations-guide/prefetch/)
      ( tried it, but it didn't seem to work. will try again later)
- [x] add [Astro RSS](https://docs.astro.build/en/guides/rss/)
- [x] add [Dockerfile](https://docs.astro.build/en/recipes/docker/)
- [ ] add [external-links](https://docs.astro.build/en/recipes/external-links/)
- [ ] add [i18n](https://docs.astro.build/en/recipes/i18n/) ( i18n is not a
      first-class concern for Astro, wait 3.0 I guess)
- [x] add site logo
- [ ] ~~prep SBCs environment for hosting~~

## Challenges and Considerations Journal

...Read on my blog
[Here](https://voidbox.io/blogs/2023-05-13-Creating-a-Blog-A-Developer's-Journal/)

## Resources and references

- [Astro hybrid-rendering](https://astro.build/blog/hybrid-rendering/)
- [server-endpoints-api-routes](https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes)

### Related projects

- [blog](https://github.com/LoneExile/blog) this project
- [VoidSync](https://github.com/LoneExile/VoidSync) backend project
- [note](https://github.com/LoneExile/note) frontend for note-taking app
- [obsidian-convertor](https://github.com/LoneExile/obsidian-convertor) bridge
  between Obsidian and this project
- [Obsidian-config](https://github.com/LoneExile/Obsidian-config) my Obsidian
  config

<!-- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet -->
