import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const movieSimilar = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/similar", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieSimilarOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieSimilar({ data: id }),
    queryKey: ["movie", "details", id, "similar"],
  });
};
