import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { PaginationSchema } from "@/schemas/pagination";

import tmdbClient from "../clients/tmdb";

const tvPopularFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/tv/popular", {
      params: { query: context.data },
    });

    return data;
  });

export const tvPopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => tvPopularFn({ data: query }),
    queryKey: ["tv", "list", "popular", query],
  });
};
