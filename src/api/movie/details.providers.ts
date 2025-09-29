import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const movieProvidersFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET(
      "/3/movie/{movie_id}/watch/providers",
      {
        params: {
          path: { movie_id: context.data },
        },
      },
    );

    return data;
  });

export const movieProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieProvidersFn({ data: id }),
    queryKey: ["movie", "details", id, "providers"],
  });
};
