import * as v from "valibot";

export const PaginationSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
});

export type Pagination = v.InferInput<typeof PaginationSchema>;
