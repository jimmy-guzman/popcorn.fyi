import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "../clients/tmdb";

const trendingMovieFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await tmdbClient.GET("/3/trending/movie/{time_window}", {
    params: { path: { time_window: "day" } },
  });

  return data;
});

export const trendingMoviesOptions = () => {
  return queryOptions({
    queryFn: () => trendingMovieFn(),
    queryKey: ["trending", "movies"],
  });
};
