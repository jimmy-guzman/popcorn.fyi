import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesOnTheAirList } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";
import { PaginationSchema } from "@/schemas/pagination";

const tvOnTheAirFn = createServerFn({ method: "GET" })
  .middleware([cached("list")])
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesOnTheAirList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const tvOnTheAirOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return tvOnTheAirFn({ data: query });
    },
    queryKey: ["tv", "list", "on-the-air", query],
  });
};
