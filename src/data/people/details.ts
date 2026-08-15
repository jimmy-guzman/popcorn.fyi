import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { personDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { cached } from "@/lib/cached";
import { IdSchema } from "@/schemas/id";

const personDetailsFn = createServerFn({ method: "GET" })
  .middleware([cached("detail")])
  .validator(IdSchema)
  .handler(async (context) => {
    const {
      data: { deathday, homepage, ...rest },
    } = await personDetails({
      client: tmdbClient,
      path: { person_id: context.data },
      throwOnError: true,
    });

    return rest;
  });

export const personDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return personDetailsFn({ data: id });
    },
    queryKey: ["person", "details", id],
  });
};
