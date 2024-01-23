import { z, defineCollection } from "astro:content";
import data from "@data/en.json";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      thumbnail: z.object({ src: image(), alt: z.string() }).optional(),
      language: z.enum(["en", "th"]),
      description: z.string(),
      tags: z.array(z.string()),
      category: z.array(z.string()),
      created: z.string(),
      updated: z.string(),
      draft: z.boolean(),
      author: z.enum([data.author]),
      diagram: z.boolean().optional(),
      comments: z.boolean().optional(),
      show: z.boolean().optional(),
    }),
});

export const collections = {
  blogs: blogCollection,
};
