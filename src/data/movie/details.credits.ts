import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieCredits } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const movieCreditsFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await movieCredits({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const movieCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieCreditsFn({ data: id }),
    queryKey: ["movie", "details", id, "credits"],
  });
};
