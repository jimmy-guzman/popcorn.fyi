import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { movieTopRatedList } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";
import { PaginationSchema } from "@/schemas/pagination";

const topRatedMoviesFn = createServerFn({ method: "GET" })
  .middleware([cached("list")])
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await movieTopRatedList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const moviesTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return topRatedMoviesFn({ data: query });
    },
    queryKey: ["movie", "list", "top-rated", query],
  });
};
