import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieRecommendations } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";
import { NullableNumber, NullableString } from "@/schemas/utils";

/**
 * TMDB's OpenAPI spec types this response as an untyped index signature, so the
 * generated types are unusable. Validate the fields the cards need instead.
 */
const RecommendationsSchema = v.object({
  results: v.optional(
    v.array(
      v.object({
        id: v.number(),
        media_type: NullableString,
        original_title: NullableString,
        poster_path: NullableString,
        release_date: NullableString,
        title: NullableString,
        vote_average: NullableNumber,
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
