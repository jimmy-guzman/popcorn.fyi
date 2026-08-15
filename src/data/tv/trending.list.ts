import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { trendingTv } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";

const trendingTvFn = createServerFn({ method: "GET" })
  .middleware([cached("list")])
  .handler(async () => {
    const { data } = await trendingTv({
      client: tmdbClient,
      path: { time_window: "day" },
      throwOnError: true,
    });

    return data;
  });

export const trendingTVOptions = () => {
  return queryOptions({
    queryFn: () => {
      return trendingTvFn();
    },
    queryKey: ["trending", "tv"],
  });
};
