import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesSimilar } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvSimilarFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
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
    queryFn: () => tvSimilarFn({ data: id }),
    queryKey: ["tv", "details", id, "similar"],
  });
};
