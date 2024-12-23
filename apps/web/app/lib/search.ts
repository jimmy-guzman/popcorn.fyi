import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import { client } from "./tmdb";

const SearchQuerySchema = v.object({
  page: v.number(),
  q: v.string(),
});

const searchFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(SearchQuerySchema, data);
  })
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

export const searchOptions = (
  search: v.InferInput<typeof SearchQuerySchema>,
) => {
  return queryOptions({
    queryFn: () => {
      return searchFn({ data: search });
    },
    queryKey: ["search", search],
  });
};
