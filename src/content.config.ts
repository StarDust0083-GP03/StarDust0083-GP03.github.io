import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.md",
    generateId: ({ data, entry }) => `${String(data.lang)}/${String(data.category)}/${String(data.slug ?? entry)}`,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lang: z.enum(["zh", "en"]),
    category: z.enum(["learning-notes", "random-thoughts"]),
    slug: z.string(),
    translationKey: z.string(),
    translation: z.enum(["source", "ai", "manual"]).default("source"),
    translatedFrom: z.enum(["zh", "en"]).optional(),
    sourceHash: z.string().optional(),
    sourcePath: z.string().optional(),
    promptVersion: z.string().optional(),
    model: z.string().optional(),
  }),
})

export const collections = { posts }
