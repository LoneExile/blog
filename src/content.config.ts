import { z, defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import dataEng from "@data/en.json";
import dataTha from "@data/th.json";

const blogSchema = ({ image }: SchemaContext) =>
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
  });

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blogs_en" }),
  schema: blogSchema,
});

const collections = {
  blogs_en: blogCollection,
  blogs_th: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blogs_th" }),
    schema: blogSchema,
  }),
};

export { collections, blogCollection };
