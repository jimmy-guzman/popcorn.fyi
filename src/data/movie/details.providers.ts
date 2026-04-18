import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieWatchProviders } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const movieProvidersFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await movieWatchProviders({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const movieProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieProvidersFn({ data: id }),
    queryKey: ["movie", "details", id, "providers"],
  });
};
