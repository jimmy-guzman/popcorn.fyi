import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "../../lib/tmdb";

const movieProvidersFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await client.GET("/3/watch/providers/movie", {
      params: {
        query: context.data,
      },
    });

    return data.results ?? [];
  },
);

export const movieProvidersOptions = () => {
  return queryOptions({
    queryFn: () => {
      return movieProvidersFn();
    },
    queryKey: ["movie", "providers", "list"],
  });
};
