import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Search } from "@/schemas/search";

import { SearchSchema } from "@/schemas/search";

import { client } from "../lib/tmdb";

const searchFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(SearchSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/search/multi", {
      params: {
        query: {
          page: context.data.page,
          query: context.data.q,
        },
      },
    });

    return data;
  });

export const searchOptions = (search: Search) => {
  return queryOptions({
    queryFn: () => searchFn({ data: search }),
    queryKey: ["search", "list", search],
  });
};
