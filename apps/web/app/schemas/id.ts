import * as v from "valibot";

export const IdSchema = v.pipe(
  v.union([v.string(), v.number()]),
  v.transform(Number),
);

export type Id = v.InferInput<typeof IdSchema>;

export const UserIdSchema = v.string();
