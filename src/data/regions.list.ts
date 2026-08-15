import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { watchProvidersAvailableRegions } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { cached } from "@/lib/cached";

const regionsFn = createServerFn({ method: "GET" })
  .middleware([cached("reference")])
  .handler(async (context) => {
    const { data } = await watchProvidersAvailableRegions({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return orEmpty(data.results);
  });

export const regionsOptions = () => {
  return queryOptions({
    queryFn: () => {
      return regionsFn();
    },
    queryKey: ["regions", "list"],
  });
};
