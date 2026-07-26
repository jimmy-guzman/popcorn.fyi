import * as v from "valibot";

const EmptyString = v.pipe(
  v.literal(""),
  v.transform(() => {
    return undefined;
  }),
);

/**
 * Discover filter value. The router JSON-parses search params, so numeric TMDB
 * ids like `?with_genres=28` arrive as numbers — coerce them back to strings.
 * Anything else falls back to "no filter" rather than failing `validateSearch`.
 */
export const Filter = v.optional(
  v.fallback(
    v.union([EmptyString, v.pipe(v.number(), v.transform(String)), v.string()]),
    undefined,
  ),
);
