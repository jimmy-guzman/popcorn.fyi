import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "../clients/tmdb";

const trendingPeopleFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await tmdbClient.GET("/3/trending/person/{time_window}", {
    params: { path: { time_window: "day" } },
  });

  return data;
});

export const trendingPeopleOptions = () => {
  return queryOptions({
    queryFn: () => trendingPeopleFn(),
    queryKey: ["trending", "people"],
  });
};
