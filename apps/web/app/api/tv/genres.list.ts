import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { client } from "@/lib/tmdb";

const tvGenresFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await client.GET("/3/genre/tv/list", {
      params: {
        query: context.data,
      },
    });

    return data.genres ?? [];
  },
);

export const tvGenresOptions = () => {
  return queryOptions({
    queryFn: () => tvGenresFn(),
    queryKey: ["tv", "genres", "list"],
  });
};
