import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const tvCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/credits", {
      params: { path: { series_id: context.data } },
    });
    return data;
  });

export const tvCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvCreditsFn({ data: id });
    },
    queryKey: ["tv", "details", id, "credits"],
  });
};
