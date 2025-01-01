import * as v from "valibot";

import { PaginationSchema } from "./pagination";

export const SearchSchema = v.intersect([
  PaginationSchema,
  v.object({ q: v.optional(v.fallback(v.string(), ""), "") }),
]);

export type Search = v.InferInput<typeof SearchSchema>;
