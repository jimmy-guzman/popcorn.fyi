import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { watchProviderTvList } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { cached } from "@/lib/cached";

const getTvProviders = createServerFn({ method: "GET" })
  .middleware([cached("reference")])
  .handler(async () => {
    const { data } = await watchProviderTvList({
      client: tmdbClient,
      throwOnError: true,
    });

    return orEmpty(data.results);
  });

export const tvProvidersOptions = () => {
  return queryOptions({
    queryFn: () => {
      return getTvProviders();
    },
    queryKey: ["tv", "providers", "list"],
  });
};
