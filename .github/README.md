# My personal website

This is a personal website built with Astro Starter Kit (Minimal).

> At first, when I started this project, I didn't think it would be this complex
> or require so many integrations. I guess I've been working on the frontend
> side in my comfort zone for too long , as my workplace hasn't allowed me to try anything new.
> This experience has been fun and enjoyable, reminding me of why I wanted to be a
> developer in the first place. It has reignited my passion for life, and I
> can't wait to see the finished site.

## Integration

### Astro & tools used by far

| Name                                                                          | Description                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Markdown🧑‍🚀](https://docs.astro.build/en/guides/markdown-content/)            | Commonly used for authoring text-heavy content.                                |
| [Tailwind👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/tailwind/) | Utility classes for styling instead of writing CSS.                            |
| [Typography](https://github.com/tailwindlabs/tailwindcss-typography)          | Provides beautiful typographic defaults for HTML.                              |
| [DaisyUI](https://github.com/saadeghi/daisyui)                                | A Tailwind CSS component library.                                              |
| [Image👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/image/)       | An Astro integration for easy image optimization.                              |
| [Sharp](https://github.com/lovell/sharp)                                      | High-performance Node.js image processing library.                             |
| [Sitemap👨‍🚀](https://docs.astro.build/en/guides/integrations-guide/sitemap/)   | Helps search engines crawl your site more efficiently by generating a sitemap. |
| [Zod](https://github.com/colinhacks/zod)                                      | TypeScript-first schema validation with static type inference.                 |

### Font

- [inter](https://github.com/rsms/inter)

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
- [ ] add comments functionality ([giscus](https://github.com/giscus/giscus) ,
      [utterances](https://github.com/utterance/utterances) or
      [remark42](https://github.com/umputun/remark42))
- [ ] better UI
  - [x] add [daisyui](https://github.com/saadeghi/daisyui)
  - [x] add [typography](https://github.com/tailwindlabs/tailwindcss-typography)
        to blog posts
  - [ ] add dark mode
  - [x] navbar
  - [x] footer
  - [ ] about page
  - [ ] blog page
- [ ] search functionality
      ([instantsearch](https://github.com/algolia/instantsearch),
      [autocomplete](https://github.com/algolia/autocomplete),
      [orama](https://github.com/oramasearch/orama) or none of these)
- [ ] tags and categories
- [ ] add
      [Astro prefetch](https://docs.astro.build/en/guides/integrations-guide/prefetch/)
- [ ] add [Astro RSS](https://docs.astro.build/en/guides/rss/)
- [ ] add [Dockerfile](https://docs.astro.build/en/recipes/docker/)
- [ ] add [external-links](https://docs.astro.build/en/recipes/external-links/)
- [ ] add [i18n](https://docs.astro.build/en/recipes/i18n/)
- [x] add site logo
- [ ] prep SBCs environment for hosting

## Notes and thoughts

### Storage

Initially, I wanted to host a markdown file on GitHub along with the source
code. Since Astro is server-side rendered (SSR), it can fetch the markdown file
at build time. However, I realized it might be better to host the markdown file
on a cloud storage service. I considered the following options:

| Name                                                | Description                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| [Garage](https://garagehq.deuxfleurs.fr/)           | A self-hosted personal cloud storage solution.                     |
| [SFTPGo](https://github.com/drakkan/sftpgo)         | Fully featured and highly configurable SFTP server implementation. |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | A distributed storage system for blobs, objects, files, and data.  |
| [MinIO](https://github.com/minio/minio)             | High-performance, AWS S3-compatible object storage server.         |
| [CouchDB](https://github.com/apache/couchdb)        | A document-oriented NoSQL database, sometimes used as storage.     |

I plan to self-host this project as I already have 2 Single Board Computers
(SBCs). First, I need to learn how to use
[Ansible](https://github.com/ansible/ansible), which will help me set up the
system in the future. Additionally, I'd like to configure the SBCs into a
cluster for better performance and reliability.

## Resources and references

- [Astro hybrid-rendering](https://astro.build/blog/hybrid-rendering/)
- [server-endpoints-api-routes](https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes)

<!-- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet -->
