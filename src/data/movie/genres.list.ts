import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { genreMovieList } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { cached } from "@/lib/cached";

const movieGenresFn = createServerFn({ method: "GET" })
  .middleware([cached("reference")])
  .handler(async (context) => {
    const { data } = await genreMovieList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return orEmpty(data.genres);
  });

export const movieGenresOptions = () => {
  return queryOptions({
    queryFn: () => {
      return movieGenresFn();
    },
    queryKey: ["movie", "genres", "list"],
  });
};
