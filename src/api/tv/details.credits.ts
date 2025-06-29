import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const tvCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/tv/{series_id}/credits", {
      params: { path: { series_id: context.data } },
    });

    return data;
  });

export const tvCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvCreditsFn({ data: id }),
    queryKey: ["tv", "details", id, "credits"],
  });
};
