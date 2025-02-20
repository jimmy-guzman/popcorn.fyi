import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

const trendingPeopleFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/trending/person/{time_window}", {
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
