import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import { PaginationSchema } from "@/schemas/pagination";
import { Filter } from "@/schemas/utils";

import tmdbClient from "../clients/tmdb";

export const DiscoverSchema = v.intersect([
  PaginationSchema,
  v.object({
    first_air_date_gte: Filter,
    first_air_date_lte: Filter,
    sort_by: v.optional(
      v.fallback(
        v.union([
          v.literal("first_air_date.asc"),
          v.literal("first_air_date.desc"),
          v.literal("name.asc"),
          v.literal("name.desc"),
          v.literal("original_name.asc"),
          v.literal("original_name.desc"),
          v.literal("popularity.asc"),
          v.literal("popularity.desc"),
          v.literal("vote_average.asc"),
          v.literal("vote_average.desc"),
          v.literal("vote_count.asc"),
          v.literal("vote_count.desc"),
        ]),
        "popularity.desc",
      ),
      "popularity.desc",
    ),
    watch_region: v.optional(v.fallback(v.string(), "US"), "US"),
    with_genres: Filter,
    with_watch_providers: Filter,
  }),
]);

const discoverTvFn = createServerFn({ method: "GET" })
  .validator((data: v.InferInput<typeof DiscoverSchema>) =>
    v.parse(DiscoverSchema, data),
  )
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/discover/tv", {
      params: {
        query: {
          ...context.data,
          "first_air_date.gte": context.data.first_air_date_gte,
          "first_air_date.lte": context.data.first_air_date_lte,
        },
      },
    });

    return data;
  });

export const discoverTvOptions = (
  query: v.InferInput<typeof DiscoverSchema>,
) => {
  return queryOptions({
    queryFn: () => discoverTvFn({ data: query }),
    queryKey: ["tv", "list", "discover", query],
  });
};
