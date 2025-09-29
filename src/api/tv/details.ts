import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const tvDetailsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { next_episode_to_air, ...rest },
    } = await tmdbClient.GET("/3/tv/{series_id}", {
      params: { path: { series_id: context.data } },
    });

    return rest;
  });

export const tvDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvDetailsFn({ data: id }),
    queryKey: ["tv", "details", id],
  });
};
