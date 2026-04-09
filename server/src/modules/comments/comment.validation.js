import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    refType: z.enum(["ISSUE", "WIKI"]),
    refId: z.string().min(1, "refId is required"),
    content: z.string().min(1, "content is required"),
    parentComment: z.string().min(1).nullable().optional()
  })
});

export const listCommentQuerySchema = z.object({
  query: z.object({
    refType: z.enum(["ISSUE", "WIKI"]),
    refId: z.string().min(1, "refId is required"),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional()
  })
});
