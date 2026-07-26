import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieRecommendations } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

/**
 * TMDB's OpenAPI spec types this response as an untyped index signature, so the
 * generated types are unusable. Validate the fields the cards need instead.
 */
const RecommendationsSchema = v.object({
  results: v.optional(
    v.array(
      v.object({
        id: v.number(),
        media_type: v.optional(v.string()),
        original_title: v.optional(v.string()),
        poster_path: v.optional(v.string()),
        release_date: v.optional(v.string()),
        title: v.optional(v.string()),
        vote_average: v.optional(v.number()),
      }),
    ),
  ),
});

const movieRecommendationsFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await movieRecommendations({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return v.parse(RecommendationsSchema, data);
  });

export const movieRecommendationsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieRecommendationsFn({ data: id });
    },
    queryKey: ["movie", "details", id, "recommendations"],
  });
};
