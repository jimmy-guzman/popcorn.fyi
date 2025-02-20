import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { PaginationSchema } from "@/schemas/pagination";

const popularPeopleFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/person/popular", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const peoplePopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => popularPeopleFn({ data: query }),
    queryKey: ["people", "list", "popular", query],
  });
};
