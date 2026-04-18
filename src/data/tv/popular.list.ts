import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesPopularList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const tvPopularFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await tvSeriesPopularList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const tvPopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => tvPopularFn({ data: query }),
    queryKey: ["tv", "list", "popular", query],
  });
};
