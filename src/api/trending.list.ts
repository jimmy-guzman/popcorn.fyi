import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { limit, shuffle } from "@/lib/array";

import tmdbClient from "./clients/tmdb";

const TRENDING_FETCH_LIMIT = 15;
const TRENDING_PREVIEW_LIMIT = 5;

const trendingAllFn = createServerFn({ method: "GET" }).handler(async () => {
  const {
    data: { results = [] },
  } = await tmdbClient.GET("/3/trending/all/{time_window}", {
    params: { path: { time_window: "day" } },
  });

  const topTrending = limit(results, TRENDING_FETCH_LIMIT);

  return limit(shuffle(topTrending), TRENDING_PREVIEW_LIMIT);
});

export const trendingAllOptions = () => {
  return queryOptions({
    queryFn: () => trendingAllFn(),
    queryKey: ["trending", "list"],
  });
};
