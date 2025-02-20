import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

import { wikipediaFn } from "../wikipedia";

const tvExternalFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/external_ids", {
      params: {
        path: { series_id: context.data },
      },
    });

    return {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : undefined,
      wikidata_id: data.wikidata_id,
      wikipedia_url: data.wikidata_id
        ? await wikipediaFn({ data: data.wikidata_id })
        : undefined,
    };
  });

export const tvExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvExternalFn({ data: id }),
    queryKey: ["tv", "details", id, "external"],
  });
};
