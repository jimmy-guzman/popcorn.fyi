import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

export const trendingMovieFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/trending/movie/{time_window}", {
      params: { path: { time_window: "day" } },
    });

    return data;
  },
);

export const trendingTvFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/trending/tv/{time_window}", {
      params: { path: { time_window: "day" } },
    });

    return data;
  },
);
