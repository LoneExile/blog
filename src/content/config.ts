import {z, defineCollection} from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  blogs: blogCollection,
}
