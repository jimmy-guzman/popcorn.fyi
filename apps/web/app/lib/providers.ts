import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "./tmdb";

const providerRegionsFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await client.GET("/3/watch/providers/regions", {
      params: {
        query: context.data,
      },
    });

    return data.results ?? [];
  },
);

export const providerRegionsOptions = () => {
  return queryOptions({
    queryFn: () => {
      return providerRegionsFn();
    },
    queryKey: ["provider", "regions", "list"],
  });
};
