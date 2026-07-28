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

/**
 * Optional TMDB metadata. TMDB sends an explicit `null` rather than omitting
 * absent fields, which `v.optional` rejects, so accept it and normalize to
 * `undefined` at the boundary to keep consumers on `string | undefined`.
 */
export const NullableString = v.pipe(
  v.nullish(v.string()),
  v.transform((value) => {
    return value ?? undefined;
  }),
);

/** Numeric counterpart to {@link NullableString}. */
export const NullableNumber = v.pipe(
  v.nullish(v.number()),
  v.transform((value) => {
    return value ?? undefined;
  }),
);
