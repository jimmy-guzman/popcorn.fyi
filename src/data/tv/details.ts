import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvDetailsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { next_episode_to_air, ...rest },
    } = await tvSeriesDetails({
      client: tmdbClient,
      path: { series_id: context.data },
      throwOnError: true,
    });

    return rest;
  });

export const tvDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvDetailsFn({ data: id }),
    queryKey: ["tv", "details", id],
  });
};
