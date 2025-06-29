import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const movieVideosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/movie/{movie_id}/videos", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieVideosFn({ data: id }),
    queryKey: ["movie", "details", id, "videos"],
  });
};
