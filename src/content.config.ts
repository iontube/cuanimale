import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articole = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articole' }),
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    excerpt: z.string(),
    publishedAt: z.string().or(z.date()).transform(v => new Date(v)),
    updatedAt: z.string().or(z.date()).optional().transform(v => v ? new Date(v) : undefined),
    animal: z.enum(['caini', 'pisici', 'pasari', 'rozatoare', 'exotice']),
    subcategorie: z.enum(['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj']),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articole };
