import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const movieCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/credits", {
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
