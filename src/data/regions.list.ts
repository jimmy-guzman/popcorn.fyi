import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { watchProvidersAvailableRegions } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";

const regionsFn = createServerFn({ method: "GET" }).handler(async (context) => {
  const { data } = await watchProvidersAvailableRegions({
    client: tmdbClient,
    query: context.data,
    throwOnError: true,
  });

  return orEmpty(data.results);
});

export const regionsOptions = () => {
  return queryOptions({
    queryFn: () => regionsFn(),
    queryKey: ["regions", "list"],
  });
};
