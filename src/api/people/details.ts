import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";

const personDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { deathday, homepage, ...rest },
    } = await tmdbClient.GET("/3/person/{person_id}", {
      params: {
        path: { person_id: context.data },
      },
    });

    return rest;
  });

export const personDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => personDetailsFn({ data: id }),
    queryKey: ["person", "details", id],
  });
};
