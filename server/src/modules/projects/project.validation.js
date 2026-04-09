import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, "title must be at least 3 characters"),
    description: z.string().min(5, "description must be at least 5 characters"),
    relatedIssue: z.string().min(1, "relatedIssue is required")
  })
});

export const projectListQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional()
  })
});

export const updateProgressSchema = z.object({
  body: z.object({
    progress: z.number().min(0).max(100)
  }),
  params: z.object({
    id: z.string().min(1)
  })
});
