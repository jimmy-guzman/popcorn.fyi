import * as v from "valibot";

export const IdSchema = v.number();

export type Id = v.InferInput<typeof IdSchema>;

export const UserIdSchema = v.string();
