import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { movieUpcomingList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const upcomingMoviesFn = createServerFn({ method: "GET" })
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await movieUpcomingList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const moviesUpcomingOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return upcomingMoviesFn({ data: query });
    },
    queryKey: ["movie", "list", "upcoming", query],
  });
};
