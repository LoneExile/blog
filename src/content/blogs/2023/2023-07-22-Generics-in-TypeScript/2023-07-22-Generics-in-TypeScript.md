---
title: "Generics in TypeScript"
description: "Master the concept of Generics in TypeScript with a comprehensive guide. Learn what generics are, why they're useful, and how to use them in your TypeScript code with practical examples."
thumbnail: { src: "./generics-unsplash-brano.jpg", alt: "generics-unsplash-brano" }
language: "en"
created: 2023-07-22 14:58
updated: 2023-07-23 12:40
tags: ["typescript", "frontend" ]
category: ["technology"]
draft: false
slug: "2023-07-22-Generics-in-TypeScript"
author: "Apinant U-suwantim"
---

![generics-unsplash-brano](./generics-unsplash-brano.jpg)

TypeScript, a statically typed superset of JavaScript, offers a variety of advanced type features that enhance JavaScript's capabilities. One such feature is generics, a powerful tool that increases the reusability and maintainability of your code. In this blog post, we'll dive deep into generics, exploring what they are, why they're useful, and how to use them in your TypeScript code.

## Unraveling Generics

In programming, we often create functions or classes that can work with different types of data. For instance, a function might accept an array of numbers, strings, or objects. However, without a way to handle multiple types, we'd have to write separate functions for each type, leading to redundant and hard-to-maintain code.

This is where generics come in. Generics are a feature of TypeScript that allows you to write code that can handle a variety of types while maintaining type safety. They're like variables for types, represented by a placeholder (commonly `T`), which TypeScript replaces with the actual type when the function or class is used.

## The Flip Side of Generics

While generics are powerful, they can be confusing to new developers. They also may not be supported by all languages, so it's important to understand the environment in which you're working.

## Generics in Action

Let's look at a practical example of how generics can improve your TypeScript code. Consider the following code block:

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

In this code, the `job` property and the `callback` function in `onCompleted` method are typed as `any`, which means we lose the benefits of TypeScript's type checking.

We can improve this by using generics:

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

Now, TypeScript can check that the `job` property and the `callback` function are of the correct type.

We can take this a step further by ensuring that the job object adheres to a specific structure:

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

With this code, TypeScript will ensure that the job object has the properties required by the `Job` type.

In conclusion, generics are a powerful feature of TypeScript that allow you to write more reusable and maintainable code. While they can be confusing at first, with practice, they can greatly enhance your TypeScript programming.

## References

- [(Doc) TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [(Youtube) How to use generics in TypeScript](https://youtu.be/t0qQSujSslQ)
