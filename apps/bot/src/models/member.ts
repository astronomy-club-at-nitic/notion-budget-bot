import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  emoji: z.string().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
