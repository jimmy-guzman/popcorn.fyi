import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { client } from "@/lib/tmdb";

const TRENDING_PREVIEW_LIMIT = 5;

const trendingAllFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/trending/all/{time_window}", {
    params: { path: { time_window: "day" } },
  });

  return (data.results ?? []).slice(0, TRENDING_PREVIEW_LIMIT);
});

export const trendingAllOptions = () => {
  return queryOptions({
    queryFn: () => trendingAllFn(),
    queryKey: ["trending", "list"],
  });
};
