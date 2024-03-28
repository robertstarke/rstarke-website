import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    frameworks: z.array(z.string()),
    cover: z.string(),
    order: z.number().nonnegative().finite(),
  }),
});

export const collections = {
  projects: projectCollection,
};
