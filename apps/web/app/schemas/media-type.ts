import * as v from "valibot";

export const MediaTypeSchema = v.union([v.literal("movie"), v.literal("tv")]);

export type MediaType = v.InferInput<typeof MediaTypeSchema>;
