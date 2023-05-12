import {z, defineCollection} from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    created: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  blogs: blogCollection,
}
