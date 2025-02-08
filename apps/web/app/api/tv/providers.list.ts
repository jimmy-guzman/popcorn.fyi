import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

const getTvProviders = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/watch/providers/tv");

  return data.results ?? [];
});

export const tvProvidersOptions = () => {
  return queryOptions({
    queryFn: () => {
      return getTvProviders();
    },
    queryKey: ["tv", "providers", "list"],
  });
};
