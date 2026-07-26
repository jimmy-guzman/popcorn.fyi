import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { personPopularList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const popularPeopleFn = createServerFn({ method: "GET" })
  .validator(PaginationSchema)
  .handler(async (context) => {
    const { data } = await personPopularList({
      client: tmdbClient,
      query: context.data,
      throwOnError: true,
    });

    return data;
  });

export const peoplePopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return popularPeopleFn({ data: query });
    },
    queryKey: ["people", "list", "popular", query],
  });
};
