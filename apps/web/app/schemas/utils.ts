import * as v from "valibot";

const EmptyString = v.pipe(
  v.literal(""),
  v.transform(() => undefined),
);

export const Filter = v.optional(v.union([EmptyString, v.string()]));
