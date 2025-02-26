import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const movieProvidersFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/watch/providers", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieProvidersFn({ data: id }),
    queryKey: ["movie", "details", id, "providers"],
  });
};
