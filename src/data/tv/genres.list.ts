import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { genreTvList } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";

const tvGenresFn = createServerFn({ method: "GET" }).handler(
  async (context) => {
    const { data } = await genreTvList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return orEmpty(data.genres);
  },
);

export const tvGenresOptions = () => {
  return queryOptions({
    queryFn: () => tvGenresFn(),
    queryKey: ["tv", "genres", "list"],
  });
};
