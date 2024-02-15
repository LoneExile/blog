---
title: "Creating a Blog: A Developer's Journal th"
thumbnail:
  {
    # src: "./man-vs-dragon-unknow-unspecified.jpg",
    src: "../../../images/2023/2023-05-13-Creating-a-Blog-A-Developer-s-Journal/man-vs-dragon-unknow-unspecified.jpg",
    alt: "man-vs-dragon-unknow-unspecified",
  }
language: "th"
created: 2023-05-13 13:07
updated: 2024-01-24 16:49
tags: ["astro", "frontend", "self-hosted"]
category: ["technology"]
draft: false
slug: "2023-05-13-Creating-a-Blog-A-Developer-s-Journal"
author: "Apinant U-suwantim"
description:
  "Join me on a deep dive into the process of building my own blog, This journal
  entry details the challenges, considerations, and victories experienced along
  the way."
---

![man-vs-dragon-unknow-unspecified](../../../images/2023/2023-05-13-Creating-a-Blog-A-Developer-s-Journal/man-vs-dragon-unknow-unspecified.jpg)

## Hello, Reader! 👋

Welcome to my blog! I'm Apinant, a software developer. I've been working as a
developer for about 2 years now, I'm passionate about learning new things and
sharing my knowledge with others. I've been thinking about starting a blog for a
while now, and I finally decided to do it. I'm excited to share my journey with
you.

## Challenges and Considerations Journal

### Frontend

Why did I choose [Astro](https://astro.build/)? When I first started thinking
about blogging, static site generators (SSGs) appeared to be a good choice. At
the time, my options were Astro and [Hugo](https://github.com/gohugoio/hugo). I
chose Astro because I wanted to build from scratch, and Astro had just released
version 2.0, which seemed perfect for my blog. It had features like Hybrid
Rendering and Content Collections that I found appealing. However, during my
development process, the [Qwik](https://github.com/BuilderIO/qwik) framework
released version 1.0, which I was really eager to try out. But I decided to
stick to finishing this project rather than starting a new one. Maybe I'll
explore Qwik in the future.

I managed to implement lazy loading, though I'm not entirely sure if I did it
the right way. If you inspect my blog on the home page, you'll notice that it
loads with zero JavaScript. But when you click on the theme button at the top
right, it will download JavaScript to prepare for your interaction. Isn't that
cool?!

Recently, I came across a blog built using Hugo and a pre-built
theme([PaperMod](https://github.com/adityatelange/hugo-PaperMod)). It looked
really good, which made me realize that building a blog from scratch requires
implementing a lot of things compared to using Hugo. But in the end, what
matters is that I'm having fun along the way, right?!🤔

#### User Interface (UI) and User Experience (UX)

Alright, frontend design isn't my strongest suit.
**[Tailwind](https://tailwindcss.com/)**, with its class-based approach, seems a
no-brainer to me as it eliminates the need to handwrite styles for each tag.
**[Flowbite](https://github.com/themesberg/flowbite)** is next on my list -
considering my lack of natural artistic ability, I need some guidelines, and
Flowbite appears to be a fantastic option. As for
**[Tailwindcss Typography](https://github.com/tailwindlabs/tailwindcss-typography)**,
it's an essential aspect of styling my markdown text, and it seems to be a quick
and easy solution (as far as I can tell).

Overall, this CSS stack should get me started. Of course, there's always room
for future restyling (maybe).🫠

#### Commenting Engine

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
features. The tricky part is modifying the UI to match my blog's theme.

One challenge with remark42 is that I need to host it myself and setting up an
SMTP server to send emails. After investigating how to set up an SMTP server on
my server using
[docker-mailserver](https://github.com/docker-mailserver/docker-mailserver), it
seemed a bit overwhelming at this stage. Thus, I've decided to use
[Amazon SES](https://aws.amazon.com/ses/) for now.

#### Newsletter

Since I'm already using Amazon SES for remark42, I decided to use it for my
newsletter as well. I'm using [Listmonk](https://github.com/knadh/listmonk) to
manage my newsletter. It's a self-hosted, open-source, and free newsletter and
mailing list manager. It's easy to set up and use, and it has a beautiful UI.
I'm also using [Turnstile](https://www.cloudflare.com/products/turnstile/) to
prevent bots from subscribing to my newsletter. and of course, I'm using
[Partytown](https://partytown.builder.io/) to lazy load Listmonk's JavaScript
and CSS.

#### Backend

Actually, I have written a backend for this blog before, and I got burned out
due to the complexity of the project that I tried to implement. The backend
project not only intended to serve this blog but also to serve as my note-taking
app automatically update the blog when I update my notes. It was a great idea,
but I didn't have enough time to implement it. So, fist rule of thumb, don't get
burned out!

### At the end of the day

When I started this project, I didn't think it would be this complex or require
so many integrations. I guess I've been working on the frontend side in my
comfort zone for too long , as my workplace hasn't allowed me to try anything
new.

This experience has been fun and enjoyable, reminding me of why I wanted to be a
developer in the first place. It has reignited my passion for lifelong learning
and trying new things. I'm looking forward to the next challenge! 🚀

If you have any questions or suggestions, let me know in the comments below. I'd
love to hear from you! 👋
