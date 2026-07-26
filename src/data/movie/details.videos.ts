import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieVideos } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const movieVideosFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await movieVideos({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const movieVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieVideosFn({ data: id });
    },
    queryKey: ["movie", "details", id, "videos"],
  });
};
