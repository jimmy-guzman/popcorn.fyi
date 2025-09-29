import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { urls } from "@/config/urls";
import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";
import { wikipediaFn } from "../wikipedia";

const personExternalFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET(
      "/3/person/{person_id}/external_ids",
      {
        params: {
          path: { person_id: context.data },
        },
      },
    );

    const base = {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id ? `${urls.imdb}/name/${data.imdb_id}` : undefined,
      wikidata_id: data.wikidata_id,
      wikipedia_url: null,
    };

    try {
      return {
        ...base,
        wikipedia_url: await wikipediaFn({ data: base.wikidata_id }),
      };
    } catch {
      return base;
    }
  });

export const personExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => personExternalFn({ data: id }),
    queryKey: ["person", "details", id, "external"],
  });
};
