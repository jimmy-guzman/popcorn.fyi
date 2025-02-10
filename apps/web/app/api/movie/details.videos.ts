import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const movieVideosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/videos", {
      params: {
        path: { movie_id: context.data },
      },
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
