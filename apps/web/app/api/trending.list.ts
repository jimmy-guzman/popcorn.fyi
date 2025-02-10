import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

export const trendingAllFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/trending/all/{time_window}", {
      params: { path: { time_window: "day" } },
    });

    return data;
  },
);
