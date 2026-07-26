import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesAiringTodayList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const tvAiringTodayFn = createServerFn({ method: "GET" })
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesAiringTodayList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const tvAiringTodayOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return tvAiringTodayFn({ data: query });
    },
    queryKey: ["tv", "list", "airing-today", query],
  });
};
