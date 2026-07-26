import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesWatchProviders } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvSeriesProvidersFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesWatchProviders({
      client: tmdbClient,
      path: { series_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const tvSeriesProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvSeriesProvidersFn({ data: id });
    },
    queryKey: ["tv", "details", id, "providers"],
  });
};
