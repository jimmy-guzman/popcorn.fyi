import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

const popularPeopleFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/person/popular");

  return data;
});

export const peoplePopularOptions = () => {
  return queryOptions({
    queryFn: () => {
      return popularPeopleFn();
    },
    queryKey: ["people", "popular"],
  });
};
