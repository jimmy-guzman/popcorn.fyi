import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const personCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET(
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
    queryFn: () => {
      return personCreditsFn({ data: id });
    },
    queryKey: ["people", "details", id, "credits"],
  });
};
