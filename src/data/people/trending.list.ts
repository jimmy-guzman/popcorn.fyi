import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { trendingPeople } from "@/integrations/tmdb/gen/sdk.gen";

const trendingPeopleFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await trendingPeople({
    client: tmdbClient,
    path: { time_window: "day" },
    throwOnError: true,
  });

  return data;
});

export const trendingPeopleOptions = () => {
  return queryOptions({
    queryFn: () => trendingPeopleFn(),
    queryKey: ["trending", "people"],
  });
};
