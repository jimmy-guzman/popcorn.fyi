import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const movieCreditsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/movie/{movie_id}/credits", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieCreditsFn({ data: id }),
    queryKey: ["movie", "details", id, "credits"],
  });
};
