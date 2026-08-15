import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";
import { IdSchema } from "@/schemas/id";

const movieDetailsFn = createServerFn({ method: "GET" })
  .middleware([cached("detail")])
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await movieDetails({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieDetailsFn({ data: id });
    },
    queryKey: ["movie", "details", id],
  });
};
