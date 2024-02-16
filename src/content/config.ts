import { z, defineCollection } from "astro:content";
import dataEng from "@data/en.json";
import dataTha from "@data/th.json";

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
      author: z.enum([dataEng.author, dataTha.author]),
      diagram: z.boolean().optional(),
      comments: z.boolean().optional(),
      show: z.boolean().optional(),
    }),
});

const collections = {
  blogs_en: blogCollection,
  blogs_th: blogCollection,
};

export { collections, blogCollection };
