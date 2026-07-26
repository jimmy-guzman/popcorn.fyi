import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesCredits } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvCreditsFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesCredits({
      client: tmdbClient,
      path: { series_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const tvCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvCreditsFn({ data: id });
    },
    queryKey: ["tv", "details", id, "credits"],
  });
};
