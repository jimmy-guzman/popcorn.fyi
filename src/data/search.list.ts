import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Search } from "@/schemas/search";

import tmdbClient from "@/integrations/tmdb/client";
import { searchMulti } from "@/integrations/tmdb/gen/sdk.gen";
import { SearchSchema } from "@/schemas/search";

const searchFn = createServerFn({ method: "GET" })
  .validator(SearchSchema)
  .handler(async (context) => {
    const { data } = await searchMulti({
      client: tmdbClient,
      query: {
        page: context.data.page,
        query: context.data.q,
      },
      throwOnError: true,
    });

    return data;
  });

export const searchOptions = (search: Search) => {
  return queryOptions({
    queryFn: () => {
      return searchFn({ data: search });
    },
    queryKey: ["search", "list", search],
  });
};
