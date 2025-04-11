import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const tvSeriesProvidersFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/watch/providers", {
      params: {
        path: { series_id: context.data },
      },
    });

    return data;
  });

export const tvSeriesProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvSeriesProvidersFn({ data: id }),
    queryKey: ["tv", "details", id, "providers"],
  });
};
