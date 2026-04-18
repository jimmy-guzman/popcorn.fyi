import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieSimilar } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const movieSimilarFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await movieSimilar({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const movieSimilarOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieSimilarFn({ data: id }),
    queryKey: ["movie", "details", id, "similar"],
  });
};
