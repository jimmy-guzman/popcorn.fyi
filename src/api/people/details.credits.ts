import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import type { operations } from "../clients/tmdb.gen";

import tmdbClient from "../clients/tmdb";

type OriginalCombinedCredits =
  operations["person-combined-credits"]["responses"]["200"]["content"]["application/json"];

export type PersonCredits = OriginalCombinedCredits;

const personCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET(
      "/3/person/{person_id}/combined_credits",
      {
        params: {
          path: { person_id: context.data.toString() },
        },
      },
    );

    return data;
  });

export const personCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => personCreditsFn({ data: id }),
    queryKey: ["people", "details", id, "credits"],
  });
};
