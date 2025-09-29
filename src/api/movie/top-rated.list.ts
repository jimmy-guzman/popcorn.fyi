import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/pagination";

import { PaginationSchema } from "@/schemas/pagination";

import tmdbClient from "../clients/tmdb";

const topRatedMoviesFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(PaginationSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/movie/top_rated", {
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
