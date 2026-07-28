import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { companyDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const companyFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await companyDetails({
      client: tmdbClient,
      path: { company_id: context.data },
      throwOnError: true,
    });

    return { name: data.name };
  });

export const companyOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return companyFn({ data: id });
    },
    queryKey: ["company", "details", id],
  });
};
