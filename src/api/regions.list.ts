import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "./clients/tmdb";

const regionsFn = createServerFn({ method: "GET" }).handler(async (context) => {
  const { data } = await tmdbClient.GET("/3/watch/providers/regions", {
    params: {
      query: context.data,
    },
  });

  return data.results ?? [];
});

export const regionsOptions = () => {
  return queryOptions({
    queryFn: () => regionsFn(),
    queryKey: ["regions", "list"],
  });
};
