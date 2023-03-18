import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  emoji: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
