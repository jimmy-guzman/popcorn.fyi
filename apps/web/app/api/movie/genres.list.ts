import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { client } from "@/lib/tmdb";

const movieGenresFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await client.GET("/3/genre/movie/list", {
      params: {
        query: context.data,
      },
    });

    return data.genres ?? [];
  },
);

export const movieGenresOptions = () => {
  return queryOptions({
    queryFn: () => movieGenresFn(),
    queryKey: ["movie", "genres", "list"],
  });
};
