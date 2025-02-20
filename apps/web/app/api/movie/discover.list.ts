import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import { client } from "@/lib/tmdb";
import { PaginationSchema } from "@/schemas/pagination";
import { Filter } from "@/schemas/utils";

const SortSchema = v.optional(
  v.fallback(
    v.union([
      v.literal("original_title.asc"),
      v.literal("original_title.desc"),
      v.literal("popularity.asc"),
      v.literal("popularity.desc"),
      v.literal("revenue.asc"),
      v.literal("revenue.desc"),
      v.literal("primary_release_date.asc"),
      v.literal("primary_release_date.desc"),
      v.literal("title.asc"),
      v.literal("title.desc"),
      v.literal("vote_average.asc"),
      v.literal("vote_average.desc"),
      v.literal("vote_count.asc"),
      v.literal("vote_count.desc"),
    ]),
    "popularity.desc",
  ),
  "popularity.desc",
);

export const DiscoverSchema = v.intersect([
  PaginationSchema,
  v.object({
    primary_release_date_gte: Filter,
    primary_release_date_lte: Filter,
    sort_by: SortSchema,
    watch_region: v.optional(v.fallback(v.string(), "US"), "US"),
    with_genres: Filter,
    with_watch_providers: Filter,
  }),
]);

const discoverMoviesFn = createServerFn({ method: "GET" })
  .validator((data: v.InferInput<typeof DiscoverSchema>) =>
    v.parse(DiscoverSchema, data),
  )
  .handler(async (context) => {
    const { data } = await client.GET("/3/discover/movie", {
      params: {
        query: {
          ...context.data,
          "primary_release_date.gte": context.data.primary_release_date_gte,
          "primary_release_date.lte": context.data.primary_release_date_lte,
        },
      },
    });

    return data;
  });

export const discoverMoviesOptions = (
  query: v.InferInput<typeof DiscoverSchema>,
) => {
  return queryOptions({
    queryFn: () => discoverMoviesFn({ data: query }),
    queryKey: ["movie", "list", "discover", query],
  });
};
