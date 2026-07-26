import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesRecommendations } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

/**
 * TMDB's OpenAPI spec types this response as an untyped index signature, so the
 * generated types are unusable. Validate the fields the cards need instead.
 */
const RecommendationsSchema = v.object({
  results: v.optional(
    v.array(
      v.object({
        first_air_date: v.optional(v.string()),
        id: v.number(),
        media_type: v.optional(v.string()),
        name: v.optional(v.string()),
        poster_path: v.optional(v.string()),
        vote_average: v.optional(v.number()),
      }),
    ),
  ),
});

const tvRecommendationsFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesRecommendations({
      client: tmdbClient,
      path: { series_id: context.data },
      throwOnError: true,
    });

    return v.parse(RecommendationsSchema, data);
  });

export const tvRecommendationsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvRecommendationsFn({ data: id });
    },
    queryKey: ["tv", "details", id, "recommendations"],
  });
};
