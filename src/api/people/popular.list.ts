import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { PaginationSchema } from "@/schemas/pagination";

import tmdbClient from "../clients/tmdb";

const popularPeopleFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/person/popular", {
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
