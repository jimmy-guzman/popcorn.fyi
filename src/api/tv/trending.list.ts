import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { client } from "@/lib/tmdb";

const trendingTvFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/trending/tv/{time_window}", {
    params: { path: { time_window: "day" } },
  });

  return data;
});

export const trendingTVOptions = () => {
  return queryOptions({
    queryFn: () => trendingTvFn(),
    queryKey: ["trending", "tv"],
  });
};
