import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { trendingTv } from "@/integrations/tmdb/gen/sdk.gen";

const trendingTvFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await trendingTv({
    client: tmdbClient,
    path: { time_window: "day" },
    throwOnError: true,
  });

  return data;
});

export const trendingTVOptions = () => {
  return queryOptions({
    queryFn: () => trendingTvFn(),
    queryKey: ["trending", "tv"],
  });
};
