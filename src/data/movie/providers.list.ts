import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { watchProvidersMovieList } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";

const movieProvidersFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await watchProvidersMovieList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return orEmpty(data.results);
  },
);

export const movieProvidersOptions = () => {
  return queryOptions({
    queryFn: () => movieProvidersFn(),
    queryKey: ["movie", "providers", "list"],
  });
};
