import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { movieNowPlayingList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const nowPlayingMoviesFn = createServerFn({ method: "GET" })
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await movieNowPlayingList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const moviesNowPlayingOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return nowPlayingMoviesFn({ data: query });
    },
    queryKey: ["movie", "list", "now-playing", query],
  });
};
