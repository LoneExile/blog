---
title: "Generics ใน TypeScript"
description: "เข้าใจในแนวคิดของ Generics ใน TypeScript ด้วยคู่มือที่ครอบคลุม เรียนรู้ว่า generics คืออะไร ทําไมมันมีประโยชน์ และวิธีใช้มันในโค้ด TypeScript ของคุณด้วยตัวอย่างที่ใช้งานได้"
thumbnail: { src: "../../../images/2023/2023-07-22-Generics-in-TypeScript/generics-unsplash-brano.jpg", alt: "generics-unsplash-brano" }
language: "th"
created: 2023-07-22 14:58
updated: 2023-07-23 12:40
tags: ["typescript", "frontend" ]
category: ["technology"]
draft: false
slug: "2023-07-22-Generics-in-TypeScript"
author: "Apinant U-suwantim"
---

![generics-unsplash-brano](../../../images/2023/2023-07-22-Generics-in-TypeScript/generics-unsplash-brano.jpg)

TypeScript เป็น Superset ของ JavaScript มีคุณสมบัติประเภทขั้นสูงมากมายที่ช่วยเพิ่มความสามารถของ JavaScript คุณสมบัติหนึ่งคือ Generics เป็นเครื่องมือที่มีประสิทธิภาพซึ่งช่วยเพิ่มความสามารถในการใช้ซ้ําและบํารุงรักษาโค้ดของผู้อ่าน ในโพสต์บล็อกนี้เราจะเจาะลึกเข้าไปใน Generics การสืบสวนว่ามันคืออะไร ทําไมมันมีประโยชน์และวิธีใช้มันในโค้ด TypeScript ของผู้อ่าน

## Generics คืออะไร

ในการเขียนโปรแกรม เรามักจะสร้างฟังก์ชั่นหรือคลาสที่สามารถทํางานกับข้อมูลประเภทต่าง ๆ ตัวอย่างเช่น ฟังก์ชันอาจยอมรับจํานวนหมายเลข สตริง หรือออปเจ็ค อย่างไรก็ตาม โดยไม่มีวิธีจัดการหลายประเภท เราจะต้องเขียนฟังก์ชั่นแยกต่างหากสําหรับแต่ละประเภท ซึ่งจะทําให้โค้ดซ้ําซ้อนและยากที่จะรักษาไว้

Generics เป็นคุณสมบัติของ TypeScript ซึ่งช่วยให้ผู้อ่านเขียนโค้ดที่สามารถจัดการกับประเภทต่างๆ
มันเหมือนกับตัวแปรสําหรับ type (โดยทั่วไปใช้ `T`) ซึ่ง TypeScript จะแทนที่ด้วยประเภทจริงเมื่อใช้ฟังก์ชั่นหรือคลาส


## Generics in Action

ลองดูตัวอย่างที่ใช้งานได้เกี่ยวกับ Generics
บล็อกโค้ดต่อไปนี้:

```typescript
type JobRun = {
  job: any;
  state: "queued" | "running" | "completed" ;
  onCompleted: (callback: (job: any) => void) => void;
};

type SendEmailJob = {
  recipientEmail: string;
  subject: string;
};

function enqueueJob(job: any): JobRun {
  // queue logic here ...
  return {
    job,
    state: "queued",
    onCompleted: (callback: (job: any) => void) => callback(job)
  };
}

const j: SendEmailJob = {
  recipientEmail: 'job@done.com',
  subject: 'Job Done'
};

const run = enqueueJob(j);

run.onCompleted((job) => {
  job
//^? (parameter) job: any
// when you type "job." you get no intellisense
})

```

ในโค้ดนี้ คุณสมบัติ `job` และฟังก์ชั่น `callback` ในวิธีการ `onCompleted` จะถูกพิมพ์เป็น `any` ซึ่งหมายความว่าเราจะสูญเสียประโยชน์ของการตรวจสอบประเภทของ TypeScript

เราสามารถปรับปรุงเรื่องนี้ได้โดยใช้ Generics:

```typescript
type JobRun<J> = {
//          ^? (parameter) J
// you can see this like a function parameter, but for types
// other languages call this "generics" or "templates" types
  job: J;
  state: "queued" | "running" | "completed" ;
  onCompleted: (callback: (job: J) => void) => void;
};

type SendEmailJob = {
  recipientEmail: string;
  subject: string;
};

function enqueueJob<T>(job: T): JobRun<typeof job> {
//                  ^? (parameter) T
// queue logic here ...
  return {
    job,
    state: "queued",
    onCompleted: (callback: (job: T) => void) => callback(job)
  };
}

const j: SendEmailJob = {
  recipientEmail: 'job@done.com',
  subject: 'Job Done'
};

const run = enqueueJob(j);

run.onCompleted((job) => {
  job
//^? (parameter) job: SendEmailJob
// now when you type "job." you will get autocomplete for SendEmailJob
})

```

ตอนนี้ TypeScript สามารถตรวจสอบว่าคุณสมบัติ `job` และฟังก์ชั่น `callback` เป็นประเภทที่ถูกต้อง

เราสามารถทําสิ่งนี้ได้อีกขั้นหนึ่งโดยให้แน่ใจว่าวัตถุงานสอดคล้องกับโครงสร้างที่เฉพาะเจาะจง:

```typescript
type Job = {
  name: string;
  start: () => void;
  state: "incomplete" | "success" | "failure";
};

type JobRun<J extends Job> = {
//          ^? (parameter) J extends Job
// means that J must be a subtype of Job
  job: J;
  state: "queued" | "running" | "completed" ;
  onCompleted: (callback: (job: J) => void) => void;
};

type SendEmailJob = Job & {
//                  ^? (parameter) Job &
// { recipientEmail: string; subject: string; }
// `&` operator is used to combine multiple types.
// means that SendEmailJob must be a subtype of Job
// and have the properties recipientEmail and subject
  recipientEmail: string;
  subject: string;
};

function enqueueJob<T extends Job>(job: T): JobRun<typeof job> {
//                  ^? (parameter) T extends Job
// means that T must be a subtype of Job

// now we need to add the properties from Job
  job.start();

  return {
    job,
    state: "queued",
    onCompleted: (callback: (job: T) => void) => callback(job)
  };
}

const j: SendEmailJob = {
  recipientEmail: 'job@done.com',
  subject: 'Job Done',

// now we need to add the properties from Job
  name: 'SendEmailJob',
  start: () => {},
  state: 'incomplete'
};

const run = enqueueJob(j);

run.onCompleted((job) => {
  job
//^? (parameter) job: SendEmailJob
// now when you type "job." you will get autocomplete for SendEmailJob
})
```

ด้วยโค้ดนี้ TypeScript จะให้แน่ใจว่าวัตถุงานมีคุณสมบัติที่ต้องการโดยประเภท `Job`

ในการสรุป, Generics เป็นคุณสมบัติที่แข็งแกร่งของ TypeScript ซึ่งช่วยให้ผู้อ่านเขียนโค้ดที่สามารถใช้ซ้ําและบํารุงรักษาได้มากขึ้น ในขณะที่ Generics อาจทําให้สับสนในตอนแรก ด้วยการฝึกฝนการใช้ Generics สามารถช่วยปรับปรุงการเขียนโปรแกรม TypeScript ของผู้อ่านอย่างมาก

## อ้างอิง

- [(Doc) TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [(Youtube) How to use generics in TypeScript](https://youtu.be/t0qQSujSslQ)
