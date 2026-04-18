import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import tmdbClient from "@/integrations/tmdb/client";
import { personPopularList } from "@/integrations/tmdb/gen/sdk.gen";
import { PaginationSchema } from "@/schemas/pagination";

const popularPeopleFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(PaginationSchema, data))
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
    queryFn: () => popularPeopleFn({ data: query }),
    queryKey: ["people", "list", "popular", query],
  });
};
