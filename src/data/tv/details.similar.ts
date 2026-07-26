import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesSimilar } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvSimilarFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesSimilar({
      client: tmdbClient,
      path: { series_id: context.data.toString() },
      throwOnError: true,
    });

    return data;
  });

export const tvSimilarOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvSimilarFn({ data: id });
    },
    queryKey: ["tv", "details", id, "similar"],
  });
};
