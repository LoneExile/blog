import {z, defineCollection} from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    category: z.array(z.string()).optional(),
    created: z.string(),
    updated: z.string().optional(),
    draft: z.boolean().optional(),
    author: z.string().optional(),
  }),
})

export const collections = {
  blogs: blogCollection,
}
