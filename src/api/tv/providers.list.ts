import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "../clients/tmdb";

const getTvProviders = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await tmdbClient.GET("/3/watch/providers/tv");

  return data.results ?? [];
});

export const tvProvidersOptions = () => {
  return queryOptions({
    queryFn: () => getTvProviders(),
    queryKey: ["tv", "providers", "list"],
  });
};
