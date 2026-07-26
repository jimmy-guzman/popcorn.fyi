import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { moviePopularList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const popularMoviesFn = createServerFn({ method: "GET" })
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await moviePopularList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const moviesPopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return popularMoviesFn({ data: query });
    },
    queryKey: ["movie", "list", "popular", query],
  });
};
