import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const movieDetailsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { belongs_to_collection, ...rest },
    } = await tmdbClient.GET("/3/movie/{movie_id}", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return rest;
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieDetailsFn({ data: id }),
    queryKey: ["movie", "details", id],
  });
};
