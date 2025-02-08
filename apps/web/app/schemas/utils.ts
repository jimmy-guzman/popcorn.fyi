import * as v from "valibot";

const EmptyString = v.pipe(
  v.literal(""),
  v.transform(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined -- TODO
    return undefined;
  }),
);

export const Filter = v.optional(v.union([EmptyString, v.string()]));
