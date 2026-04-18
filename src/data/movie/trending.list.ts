import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { trendingMovies } from "@/integrations/tmdb/gen/sdk.gen";

const trendingMovieFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await trendingMovies({
    client: tmdbClient,
    path: { time_window: "day" },
    throwOnError: true,
  });

  return data;
});

export const trendingMoviesOptions = () => {
  return queryOptions({
    queryFn: () => trendingMovieFn(),
    queryKey: ["trending", "movies"],
  });
};
