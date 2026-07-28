import type * as v from "valibot";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeasonDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { SeasonPathParamsSchema } from "@/schemas/path-params";

const tvSeasonFn = createServerFn({ method: "GET" })
  .validator(SeasonPathParamsSchema)
  .handler(async (context) => {
    const { data } = await tvSeasonDetails({
      client: tmdbClient,
      path: {
        season_number: context.data.season,
        series_id: context.data.id,
      },
      throwOnError: true,
    });

    return data;
  });

export const tvSeasonOptions = (
  params: v.InferInput<typeof SeasonPathParamsSchema>,
) => {
  return queryOptions({
    queryFn: () => {
      return tvSeasonFn({ data: params });
    },
    queryKey: ["tv", "details", params.id, "season", params.season],
  });
};
