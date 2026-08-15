import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesTopRatedList } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";
import { PaginationSchema } from "@/schemas/pagination";

const tvTopRatedFn = createServerFn({ method: "GET" })
  .middleware([cached("list")])
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesTopRatedList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const tvTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return tvTopRatedFn({ data: query });
    },
    queryKey: ["tv", "list", "top-rated", query],
  });
};
