import * as v from "valibot";

export const IdSchema = v.pipe(
  v.union([v.string(), v.number()]),
  v.transform(Number),
);

export type Id = v.InferInput<typeof IdSchema>;

export const UserIdSchema = v.string();

export const FavoriteIdSchema = v.string();

export type FavoriteId = v.InferInput<typeof FavoriteIdSchema>;
