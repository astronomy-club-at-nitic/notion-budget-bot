import { z } from 'zod';
import { MemberSchema } from './member.js';
import { ProjectSchema } from './project.js';

export const SubjectSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  amount: z.number(),
  paymentDate: z.date().optional(),
  paymentStatus: z.enum(['draft', 'scheduled', 'paid']),
  reportStatus: z.enum(['notyet', 'working', 'done']),
  project: z.array(ProjectSchema),
  payer: z.array(MemberSchema),
});

export type Subject = z.infer<typeof SubjectSchema>;
