import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { PaginationSchema } from "@/schemas/pagination";

const topRatedMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/top_rated", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const moviesTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => topRatedMoviesFn({ data: query }),
    queryKey: ["movie", "list", "top-rated", query],
  });
};
