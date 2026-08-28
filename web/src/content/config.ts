import { defineCollection, z } from 'astro:content';

// Timing counters for one phase of the pipeline, as reported by Ollama and
// written into the chapter's frontmatter by write_chapter.py. Every field is
// optional: older Ollama builds leave some counters out, and a cold start
// reports load_seconds while a warm one does not.
const phase = z
  .object({
    calls: z.number(),
    seconds: z.number(),
    load_seconds: z.number(),
    prompt_tokens: z.number(),
    tokens: z.number(),
    tokens_per_second: z.number(),
  })
  .partial();

// Chapters live in the repo-root `chapters/` folder. A symlink (see README)
// exposes them to Astro at src/content/kapitler so the Pi and the site share
// exactly the same markdown.
const kapitler = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    date: z.string(),
    // Absent on chapters 1-4, which were written before the pipeline recorded
    // anything about itself.
    model: z.string().optional(),
    generation: z
      .object({
        finished_at: z.string(),
        host: z.string(),
        beat: z.string(),
        pipeline: z.string(),
        translate_model: z.string(),
        seconds: z.number(),
        write: phase,
        translate: phase,
      })
      // .partial() because the set of fields has grown chapter by chapter
      // (translate_model only appears from chapter 8), and .passthrough() so a
      // field the Pi starts emitting tomorrow is carried through rather than
      // silently stripped. The Pi pushes straight to main and this build is the
      // only thing between it and the published site, so the schema must never
      // be the reason a chapter fails to appear.
      .partial()
      .passthrough()
      .optional(),
  }),
});

export const collections = { kapitler };
