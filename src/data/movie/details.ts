import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const movieDetailsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { belongs_to_collection, ...rest },
    } = await movieDetails({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return rest;
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieDetailsFn({ data: id }),
    queryKey: ["movie", "details", id],
  });
};
