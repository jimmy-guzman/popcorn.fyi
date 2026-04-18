import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { trendingAll } from "@/integrations/tmdb/gen/sdk.gen";
import { limit, shuffle } from "@/lib/array";

const TRENDING_FETCH_LIMIT = 15;
const TRENDING_PREVIEW_LIMIT = 5;

const trendingAllFn = createServerFn({ method: "GET" }).handler(async () => {
  const {
    data: { results = [] },
  } = await trendingAll({
    client: tmdbClient,
    path: { time_window: "day" },
    throwOnError: true,
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
