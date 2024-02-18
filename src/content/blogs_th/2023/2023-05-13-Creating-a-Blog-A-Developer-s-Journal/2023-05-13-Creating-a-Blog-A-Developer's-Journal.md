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

## สวัสดีครับผู้อ่าน! 👋

ยินดีต้อนรับสู่บล็อกของผม! ผมชื่ออภินันท์ นักพัฒนาซอฟต์แวร์ ผมทำงานเป็นนักพัฒนามาประมาณ 2 ปีแล้ว ผมหลงใหลในการเรียนรู้สิ่งใหม่ๆ และแบ่งปันความรู้กับผู้อื่น ผมคิดที่จะเริ่มเขียนบล็อกมาระยะหนึ่งแล้ว และในที่สุดผมก็ตัดสินใจทำ ผมตื่นเต้นที่จะแบ่งปันการเดินทางของผมกับทุกคน

## Challenges and Considerations Journal

### หน้าบ้าน (Frontend)

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

ทําไมผมถึงเลือก [Astro](https://astro.build/)? เมื่อผมเริ่มคิดเกี่ยวกับการเขียนบล็อก 
เครื่องกําเนิดเว็บไซต์แบบคงที่ (SSGs) ดูเหมือนจะเป็นทางเลือกที่ดี 
ตอนนั้นตัวเลือกของผมคือ Astro และ [Hugo](https://github.com/gohugoio/hugo)
ผมเลือก Astro เพราะผมต้องการสร้างจากจุดเริ่มต้นและ Astro เพิ่งเปิดตัวเวอร์ชั่น 2.0 
ซึ่งดูเหมือนจะสมบูรณ์แบบสําหรับบล็อกของผม มันมีคุณสมบัติเช่น Hybrid Rendering และ Content Collections 
ที่ผมพบว่าน่าดึงดูด อย่างไรก็ตาม ในระหว่างกระบวนการพัฒนาของผม f
ramework [Qwik](https://github.com/BuilderIO/qwik) 
ได้ปล่อยเวอร์ชั่น 1.0 ซึ่งผมอยากจะลอง แต่ผมตัดสินใจที่จะอยู่กับเสร็จสิ้นโครงการนี้แทนที่จะเริ่มใหม่ 
บางทีผมอาจจะสํารวจ Qwik ในอนาคต

I managed to implement lazy loading, though I'm not entirely sure if I did it
the right way. If you inspect my blog on the home page, you'll notice that it
loads with zero JavaScript. But when you click on the theme button at the top
right, it will download JavaScript to prepare for your interaction. Isn't that
cool?!

ผมประสบความสําเร็จในการใช้งานการ Lazy-load แม้ว่าผมจะไม่แน่ใจว่าผมทําอย่างถูกต้องหรือไม่ 
หากคุณตรวจสอบบล็อกของผมในหน้าแรกคุณจะสังเกตเห็นว่ามันโหลดด้วยไม่ได้โหลดด้วย JavaScript หรือน้อยมากๆ 
แต่เมื่อคุณคลิกที่ปุ่มธีมที่ด้านบนขวามันจะดาวน์โหลด JavaScript เพื่อเตรียมความพร้อมสําหรับการโต้ตอบของคุณ 
นั่นมันน่าตื่นเต้นใช่มั้ยครับ?


Recently, I came across a blog built using Hugo and a pre-built
theme([PaperMod](https://github.com/adityatelange/hugo-PaperMod)). It looked
really good, which made me realize that building a blog from scratch requires
implementing a lot of things compared to using Hugo. But in the end, what
matters is that I'm having fun along the way, right?!🤔

เมื่อเร็ว ๆ นี้ผมได้พบกับบล็อกที่สร้างขึ้นโดยใช้ Hugo และธีมที่สร้างไว้ล่วงหน้า 
([PaperMod](https://github.com/adityatelange/hugo-Papermod)) 
มันดูดีจริงๆซึ่งทําให้ผมตระหนักว่าการสร้างบล็อกตั้งแต่ต้นต้องใช้การใช้งานหลายอย่างเมื่อเทียบกับการใช้ Hugo 
แต่ในท้ายที่สุด สิ่งที่สําคัญคือผมสนุกไปกับมัน (ใช่มั้ย?🤔)

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

โอเค การออกแบบหน้าบ้านไม่ใช่สิ่งที่ผมถนัดสักเท่าไร
**[Tailwind](https://tailwindcss.com/)** ด้วยแนวทางที่ขึ้นอยู่กับ class-based ดูเหมือนจะไม่มีความคิดกับผมเพราะมันจะกําจัดความจําเป็นในการเขียนสไตล์ด้วยมือสําหรับแต่ละแท็ก
**[Flowbite](https://github.com/themesberg/flowbite)** เป็นต่อไปในรายการของผม - เมื่อพิจารณาถึงการขาดความสามารถทางศิลปะธรรมชาติของผมผมต้องการคําแนะนําบางอย่างและ Flowbite ดูเหมือนว่าจะเป็นตัวเลือกที่ยอดเยี่ยม สําหรับ 
**[Tailwindcss Typography](https://github.com/tailwindlabs/tailwindcss-typography)**, มันเป็นแง่มุมที่จําเป็นในการจัดรูปแบบข้อความการทําเครื่องหมายของผมและดูเหมือนว่าจะเป็นทางออกที่รวดเร็วและง่าย (as far as I can tell).

โดยรวมแล้ว CSS Stack นี้ควรจะทําให้ผมเริ่มต้นได้เร็ว แน่นอนเสมอมีพื้นที่สําหรับการ restyling ในอนาคต (บางทีนะ)🫠

#### Commenting Engine

There are numerous options available for commenting engines, including
[giscus](https://github.com/giscus/giscus),
[utterances](https://github.com/utterance/utterances),
[remark42](https://github.com/umputun/remark42), and
[disqus](https://disqus.com/). You might have guessed already that I've chosen
remark42, but let's first discuss why I didn't opt for the others.

มีตัวเลือกมากมายสําหรับเครื่องมือแสดงความคิดเห็น รวมถึง 
[giscus](https://github.com/giscum/giskus), 
[utterances](http://gitub. com/utterance/utterances), 
[remark42](https/githab.com /umputun/remark42), และ 
[disqus](https://disqos.com/). 
คุณอาจคาดเดาแล้วว่าผมได้เลือกความ Remark42, 
แต่มาคุยกันก่อนว่าทําไมผมไม่เลือกอย่างที่เหลือ

Both **giscus** and **utterances** use GitHub as their backend, which doesn't
align with my preference for having full control over my data. **Disqus** is a
popular choice, but it's a closed-source solution, which I'd rather avoid. So,
that leaves me with remark42. It's an open-source option and packed with
features. The tricky part is modifying the UI to match my blog's theme.

ทั้ง **giscus** และ **utterances** ใช้ GitHub เป็นส่วนหลังของพวกเขาซึ่งไม่ตรงกับความชอบของผมในการควบคุมข้อมูลของผมอย่างเต็มที่ 
**Disqus** เป็นทางเลือกที่นิยม แต่มันเป็นโซลูชั่นที่ปิดแหล่งที่มาซึ่งผมจะหลีกเลี่ยง นั่นแหละที่ทําให้ผมเห็นด้วย ความเห็น42. 
มันเป็นตัวเลือกโอเพนซอร์ส และเต็มไปด้วยคุณสมบัติ ส่วนที่ซับซ้อนคือการแก้ไข UI เพื่อให้ตรงกับธีมของบล็อกของผม

One challenge with remark42 is that I need to host it myself and setting up an
SMTP server to send emails. After investigating how to set up an SMTP server on
my server using
[docker-mailserver](https://github.com/docker-mailserver/docker-mailserver), it
seemed a bit overwhelming at this stage. Thus, I've decided to use
[Amazon SES](https://aws.amazon.com/ses/) for now.

ความท้าทายหนึ่งที่มี Remark42 คือผมต้องโฮสต์มันเองและตั้งค่าเซิร์ฟเวอร์ SMTP เพื่อส่งอีเมล 
หลังจากสืบสวนวิธีการตั้งค่าเซิร์ฟเวอร์ SMTP บนเซิฟเวอร์ของผมโดยใช้ 
[docker-mailserver](https://github.com/docker-mailserver/docker-mailserve) 
มันดูเหมือนจะมากเกินไปในขั้นตอนนี้ ดังนั้นผมจึงตัดสินใจที่จะใช้ 
[Amazon SES](https://aws.amazon.com/ses/) สําหรับตอนนี้

#### Newsletter

Since I'm already using Amazon SES for Remark42, I decided to use it for my
newsletter as well. I'm using [Listmonk](https://github.com/knadh/listmonk) to
manage my newsletter. It's a self-hosted, open-source, and free newsletter and
mailing list manager. It's easy to set up and use, and it has a beautiful UI.
I'm also using [Turnstile](https://www.cloudflare.com/products/turnstile/) to
prevent bots from subscribing to my newsletter. and of course, I'm using
[Partytown](https://partytown.builder.io/) to lazy load Listmonk's JavaScript
and CSS.

ตั้งแต่ผมกําลังใช้ Amazon SES สําหรับ Remark42 
ผมตัดสินใจที่จะใช้มันสําหรับจดหมายข่าวของผมเช่นกัน 
ผมใช้ [Listmonk](https://github.com/knadh/listmonk) 
เพื่อจัดการจดหมายข่าวของผม มันเป็นตัวจัดการรายชื่อจดหมายและรายชื่ออีเมลแบบโฮสติ้งออฟเวอร์ซอร์สและฟรี 
มันง่ายต่อการตั้งค่าและใช้งานและมีอินเตอร์เฟซที่สวยงาม
ผมยังใช้ [Turnstile](https://www.cloudflare.com/products/turnstile/) 
เพื่อป้องกันไม่ให้บอทสมัครจดหมายข่าวของผม และแน่นอน 
ผมใช้ [Partytown](https://partytown.builder.io/) เพื่อโหลด JavaScript และ CSS ของ Listmonk

#### Backend

Actually, I have written a backend for this blog before, and I got burned out
due to the complexity of the project that I tried to implement. The backend
project not only intended to serve this blog but also to serve as my note-taking
app automatically update the blog when I update my notes. It was a great idea,
but I didn't have enough time to implement it. So, fist rule of thumb, don't get
burned out!

ในความเป็นจริงผมได้เขียนพื้นหลังสําหรับบล็อกนี้ก่อนหน้านี้และผมถูกเผาไหม้เพราะความซับซ้อนของโครงการที่ผมพยายามที่จะดําเนินการ 
โครงการด้านหลังไม่เพียง แต่มีวัตถุประสงค์ที่จะให้บริการบล็อกนี้ แต่ยังทําหน้าที่เป็นแอพบันทึกของผมอัตโนมัติอัปเดตบล็อกเมื่อผมอัพเดตบันทึกรายการของผม 
มันเป็นความคิดที่ยอดเยี่ยม แต่ผมไม่มีเวลาพอที่จะใช้มัน ดังนั้น, กฎนิ้วมือ, อย่าถูกเผาไหม้!

### At the end of the day

When I started this project, I didn't think it would be this complex or require
so many integrations. I guess I've been working on the frontend side in my
comfort zone for too long , as my workplace hasn't allowed me to try anything
new.

ตอนที่ผมเริ่มโครงการนี้ ผมไม่คิดว่ามันจะซับซ้อนหรือต้องการการรวมกันมากมาย
 ผมคิดว่าผมทํางานด้านหน้าในโซนความสะดวกสบายของผมเป็นเวลานานเกินไป 
 เพราะที่ทํางานของผมไม่ได้อนุญาตให้ผมลองอะไรใหม่

This experience has been fun and enjoyable, reminding me of why I wanted to be a
developer in the first place. It has reignited my passion for lifelong learning
and trying new things. I'm looking forward to the next challenge! 🚀

ประสบการณ์นี้สนุกและสนุกสนานทําให้ผมจําได้ว่าทําไมผมต้องการเป็นนักพัฒนาในตอนแรก 
มันฟื้นฟูความรักของผม สําหรับการเรียนรู้ตลอดชีวิตและลองสิ่งใหม่ ๆ ผมรอคอยที่จะท้าทายต่อไป! 🚀

If you have any questions or suggestions, let me know in the comments below. I'd
love to hear from you! 👋

หากคุณมีคําถามหรือคําแนะนําใด ๆ โปรดแจ้งให้ผมทราบในความคิดเห็นด้านล่าง ผมอยากได้ยินจากคุณ