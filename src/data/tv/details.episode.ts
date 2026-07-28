import type * as v from "valibot";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { tvEpisodeDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { EpisodePathParamsSchema } from "@/schemas/path-params";

const tvEpisodeFn = createServerFn({ method: "GET" })
  .validator(EpisodePathParamsSchema)
  .handler(async (context) => {
    const { data } = await tvEpisodeDetails({
      client: tmdbClient,
      path: {
        episode_number: context.data.episode,
        season_number: context.data.season,
        series_id: context.data.id,
      },
      throwOnError: true,
    });

    return data;
  });

export const tvEpisodeOptions = (
  params: v.InferInput<typeof EpisodePathParamsSchema>,
) => {
  return queryOptions({
    queryFn: () => {
      return tvEpisodeFn({ data: params });
    },
    queryKey: [
      "tv",
      "details",
      params.id,
      "season",
      params.season,
      "episode",
      params.episode,
    ],
  });
};
