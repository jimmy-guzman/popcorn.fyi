import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { PaginationSchema } from "@/schemas/pagination";

import tmdbClient from "../clients/tmdb";

const tvTopRatedFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/tv/top_rated", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const tvTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => tvTopRatedFn({ data: query }),
    queryKey: ["tv", "list", "top-rated", query],
  });
};
