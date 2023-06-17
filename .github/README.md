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
- [ ] add comments functionality ([giscus](https://github.com/giscus/giscus) ,
      [utterances](https://github.com/utterance/utterances) or
      [remark42](https://github.com/umputun/remark42))
  - [x] basic comments functionality
  - [x] login with GitHub, Google, Twitter, etc.
  - [ ] configure mail server to send notifications
        ([docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)
        or [Amazon SES](https://aws.amazon.com/ses/))
- [ ] UI
  - [x] add [daisyui](https://github.com/saadeghi/daisyui)
  - [x] add [typography](https://github.com/tailwindlabs/tailwindcss-typography)
        to blog posts
  - [x] add dark mode
  - [x] navbar
  - [x] footer
  - [x] home page
  - [x] about page
  - [x] blog page
  - [ ] search functionality
        ([instantsearch](https://github.com/algolia/instantsearch),
        [autocomplete](https://github.com/algolia/autocomplete),
        [orama](https://github.com/oramasearch/orama) or none of these)
- [ ] tags and categories
- [ ] add
      [Astro prefetch](https://docs.astro.build/en/guides/integrations-guide/prefetch/)
      ( tried it, but it didn't seem to work. will try again later)
- [ ] add [Astro RSS](https://docs.astro.build/en/guides/rss/)
- [x] add [Dockerfile](https://docs.astro.build/en/recipes/docker/)
- [ ] add [external-links](https://docs.astro.build/en/recipes/external-links/)
- [ ] add [i18n](https://docs.astro.build/en/recipes/i18n/)
- [x] add site logo
- [ ] ~~prep SBCs environment for hosting~~

## Challenges and Considerations Journal

### Frontend

... Astro, Tailwind, DaisyUI, Typography, Image, Sharp, Sitemap, Zod,
Adapter(Node), Nanostores

### Backend

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

After learning the basics of Ansible, I am now able to set up my Single Board
Computers (SBCs). However, I cannot create a high availability (HA) cluster at
this time because it requires at least three master nodes to be considered HA.
This is something I may consider in the future.

Here is my [VoidSync](https://github.com/LoneExile/VoidSync) backend project

As for storage, I initially wanted to choose CouchDB due to its built-in REST
API. However, I realized that it's an older technology, and I prefer to try out
bleeding-edge solutions. Therefore, I have decided to go with MinIO. It has
comprehensive documentation, is S3-compatible, and is written in Go. I've always
been interested in learning Go, so this choice aligns well with my interests.

However, MinIO doesn't have built-in real-time synchronization capabilities
between two clients like CouchDB does. As a result, I need to implement
real-time synchronization functionality in my application. To achieve this, I
will use a combination of MinIO and a custom backend that listens for changes in
MinIO storage and communicates those changes to connected clients. Fortunately,
MinIO has an
[event notifications](https://min.io/docs/minio/kubernetes/upstream/administration/monitoring/bucket-notifications.html)
feature that allows me to receive events whenever an object is created, updated,
or deleted, which will greatly aid in implementing the synchronization
functionality.

You might wonder why I need real-time synchronization for a static site
generator (SSG) website. The truth is, it's not just for my site but also for my
note-taking app that I use. I have been using [Obsidian](https://obsidian.md/)
along with [rclone](https://rclone.org/) to synchronize my notes. However,
rclone doesn't have real-time sync functionality. My goal is to implement
real-time synchronization not only for my website but also for other
applications and use cases I might encounter in the future.

### Minio and Synchronization feature

#### Basic Synchronization

Before leveraging the notifications and message queue feature and other good
stuff, I'll implement a basic synchronization method. The options include
timestamp, file size, and checksum:

- **Timestamp**: Unreliable because it changes when copying a file to another
  location, which can lead to infinite loops.
- **File size**: Unreliable because the size may remain the same after editing a
  file.
- **Checksum**: Reliable but time-consuming to calculate.

Considering these factors, I've chosen a combination of timestamp and
checksum([MD5](https://en.wikipedia.org/wiki/MD5)) supported by MinIO. It should
be efficient since we're dealing with markdown and image files(right?!). This
approach achieves basic data synchronization but doesn't detect file additions
or deletions. That's when our trusty database sidekick comes into play.

##### Database

I've considered various database options and narrowed it down to those that I'm
most interested in trying out:

| Name                                                   | Description                                                                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [Pocketbase](https://github.com/pocketbase/pocketbase) | A lightweight, serverless, and self-hosted real-time database built for web and mobile apps. |
| [Cockroach](https://github.com/cockroachdb/cockroach)  | A cloud-native, distributed SQL database designed for scalability and resilience.            |
| [Surrealdb](https://github.com/surrealdb/surrealdb)    | A real-time, scalable, and distributed NoSQL database built for the modern web.              |

For this project, I've decided to use
[Surrealdb](https://github.com/surrealdb/surrealdb). Although I don't have a
specific reason for choosing it, it is the most bleeding-edge option, and I am a
bleeding-edge kind of guy. I also believe that switching databases later on
shouldn't be too difficult(I guess). So, let's dive into the unknown and see how
it goes!

##### Rest API

The framework I've chosen to use is [Gin](https://github.com/gin-gonic/gin).
Initially, I was planning to use the native net/http, but I decided to make
things easier for myself. Gin offers many features that I need, such as routing,
middleware, and more.

While working on my rest API, I found myself writing a lot of server-side code
for uploading/downloading, when this should have been done on the client side.
This led to me having to rewrite a significant amount of code, which became
quite messy.

Another challenge I faced was that standard API clients like
[Postman](https://www.postman.com/) or
[Insomnia](https://github.com/Kong/insomnia) couldn't send multipart/form-data
requests with the directory structure I was uploading. It's possible that
there's a way to do this, but I wasn't able to figure it out. Consequently, I
had to write a custom client to test my API.

I found that [httpie](https://httpie.io/) could perform this task based on this
[documentation](https://httpie.io/docs/cli/file-upload-forms), but I knew I
would need to write my note-taking app site anyway. Therefore, I created a new
repository [note](https://github.com/LoneExile/note), utilizing
[webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)
with this
[workaround](https://github.com/facebook/react/issues/3468#issuecomment-1031366038)
for TypeScript.

... Websocket, Notifications, and more to come!

## Resources and references

- [Astro hybrid-rendering](https://astro.build/blog/hybrid-rendering/)
- [server-endpoints-api-routes](https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes)

### Related projects

- [VoidSync](https://github.com/LoneExile/VoidSync) backend project
- [note](https://github.com/LoneExile/note) frontend for note-taking app
- [obsidian-convertor](https://github.com/LoneExile/obsidian-convertor) bridge
  between Obsidian and this project
- [Obsidian-config](https://github.com/LoneExile/Obsidian-config) my Obsidian
  config

<!-- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet -->
