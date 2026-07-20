import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const work = defineCollection({
  loader: glob({ base: "./public/content/work", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string(),
    images: z.array(z.string()),
    repo: z.string().url().optional(),
    role: z.string(),
    stack: z.string(),
    title: z.string(),
    url: z.string().url().optional(),
    year: z.string(),
  }),
});

const writings = defineCollection({
  loader: glob({ base: "./public/content/writings", pattern: "**/*.md" }),
  schema: z.object({
    date: z.string(),
    description: z.string(),
    title: z.string(),
  }),
});

export const collections = { work, writings };
