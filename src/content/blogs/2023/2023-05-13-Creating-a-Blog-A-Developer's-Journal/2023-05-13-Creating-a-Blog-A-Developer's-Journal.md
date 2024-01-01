---
title: "Creating a Blog: A Developer's Journal"
thumbnail:
created: 2023-05-13 13:07
updated: 2023-06-21 11:41
tags: ["go", "astro", "cloud"]
category: ["tech", "projects", "blog"]
draft: false
slug: "2023-05-13-Creating-a-Blog-A-Developer's-Journal"
author: "Apinant U-suwantim"
description: "Join me on a deep dive into the process of building my own blog, This journal entry details the challenges, considerations, and victories experienced along the way."
---

![man-vs-dragon](./cover.jpg)

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

## Challenges and Considerations Journal

### Frontend

#### Astro

Why did I choose [Astro](https://astro.build/)? When I first started thinking
about blogging, static site generators (SSGs) appeared to be a good choice. At
the time, my options were Astro and [Hugo](https://github.com/gohugoio/hugo). I
chose Astro because I wanted to build from scratch, and Astro had just released
version 2.0, which seemed perfect for my blog. It had features like Hybrid
Rendering and Content Collections that I found appealing. However, during my
development process, the [Qwik](https://github.com/BuilderIO/qwik) framework
released version 1.0, which I was really eager to try out. But I decided to
stick to finishing this project rather than starting a new one. Maybe I'll
explore Qwik in the future – I already have some ideas in mind.

I managed to implement lazy loading, though I'm not entirely sure if I did it
the right way. If you inspect my blog on the home page, you'll notice that it
loads with zero JavaScript. But when you click on the settings button at the top
right, it will download JavaScript to prepare for your interaction. Isn't that
cool?!

Recently, I came across a blog built using Hugo and a pre-built
theme([PaperMod](https://github.com/adityatelange/hugo-PaperMod)). It looked
really good, which made me realize that building a blog from scratch requires
implementing a lot of things compared to using Hugo. But in the end, what
matters is that I'm having fun along the way, right?!🤔

#### Tailwind CSS, DaisyUI, Typography

Alright, frontend design isn't my strongest suit.
**[Tailwind](https://tailwindcss.com/)**, with its class-based approach, seems a
no-brainer to me as it eliminates the need to handwrite styles for each tag.
**[DaisyUI](https://daisyui.com/)** is next on my list - considering my lack of
natural artistic ability, I need some guidelines, and DaisyUI appears to be a
fantastic option. As for
**[Tailwindcss Typography](https://github.com/tailwindlabs/tailwindcss-typography)**,
it's an essential aspect of styling my markdown text, and it seems to be a quick
and easy solution (as far as I can tell).

Overall, this CSS stack should get me started. Of course, there's always room
for future restyling (maybe).🫠

#### Remark42 (Commenting Engine)

There are numerous options available for commenting engines, including
[giscus](https://github.com/giscus/giscus),
[utterances](https://github.com/utterance/utterances),
[remark42](https://github.com/umputun/remark42), and
[disqus](https://disqus.com/). You might have guessed already that I've chosen
remark42, but let's first discuss why I didn't opt for the others.

Both **giscus** and **utterances** use GitHub as their backend, which doesn't
align with my preference for having full control over my data. **Disqus** is a
popular choice, but it's a closed-source solution, which I'd rather avoid. So,
that leaves me with remark42. It's an open-source option and packed with
features.

One challenge with remark42 is that I need to host it myself. However, that's
not an issue for me since I'm already hosting my blog on my own server. The
tricky part is setting up an SMTP server to send emails. After investigating how
to set up an SMTP server on my server using
[docker-mailserver](https://github.com/docker-mailserver/docker-mailserver), it
seemed a bit overwhelming at this stage. Thus, I've decided to use
[Amazon SES](https://aws.amazon.com/ses/) for now.

... Nanostores

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

### Related projects

- [blog](https://github.com/LoneExile/blog) this blog
- [VoidSync](https://github.com/LoneExile/VoidSync) backend project
- [note](https://github.com/LoneExile/note) frontend for note-taking app
- [obsidian-convertor](https://github.com/LoneExile/obsidian-convertor) bridge
  between Obsidian and this project
- [Obsidian-config](https://github.com/LoneExile/Obsidian-config) my Obsidian
  config
