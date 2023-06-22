import {z, defineCollection} from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.array(z.string()),
    created: z.string(),
    updated: z.string(),
    draft: z.boolean(),
    author: z.string(),
  }),
})

export const collections = {
  blogs: blogCollection,
}
