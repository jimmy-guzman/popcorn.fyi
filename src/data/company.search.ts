import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import tmdbClient from "@/integrations/tmdb/client";
import { searchCompany } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";

const searchCompaniesFn = createServerFn({ method: "GET" })
  .validator(v.string())
  .handler(async (context) => {
    const { data } = await searchCompany({
      client: tmdbClient,
      query: { query: context.data },
      throwOnError: true,
    });

    return orEmpty(data.results)
      .filter(hasId)
      .map((company) => {
        return { id: company.id, name: company.name };
      });
  });

export const searchCompaniesOptions = (query: string) => {
  return queryOptions({
    enabled: query.trim() !== "",
    queryFn: () => {
      return searchCompaniesFn({ data: query });
    },
    queryKey: ["company", "search", query],
  });
};
