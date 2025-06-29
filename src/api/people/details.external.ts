import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";
import { wikipediaFn } from "../wikipedia";

const personExternalFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET(
      "/3/person/{person_id}/external_ids",
      {
        params: {
          path: { person_id: context.data },
        },
      },
    );

    return {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id
        ? `https://www.imdb.com/name/${data.imdb_id}`
        : undefined,
      wikidata_id: data.wikidata_id,
      wikipedia_url: data.wikidata_id
        ? await wikipediaFn({ data: data.wikidata_id })
        : undefined,
    };
  });

export const personExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => personExternalFn({ data: id }),
    queryKey: ["person", "details", id, "external"],
  });
};
