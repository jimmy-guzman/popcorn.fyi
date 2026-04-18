import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { PersonCombinedCreditsResponse } from "@/integrations/tmdb/gen/types.gen";
import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { personCombinedCredits } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

export type PersonCredits = PersonCombinedCreditsResponse;

const personCreditsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await personCombinedCredits({
      client: tmdbClient,
      path: { person_id: context.data.toString() },
      throwOnError: true,
    });

    return data;
  });

export const personCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => personCreditsFn({ data: id }),
    queryKey: ["people", "details", id, "credits"],
  });
};
