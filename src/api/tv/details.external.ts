import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { urls } from "@/config/urls";
import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";
import { wikipediaFn } from "../wikipedia";

const tvExternalFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/tv/{series_id}/external_ids", {
      params: {
        path: { series_id: context.data },
      },
    });

    const base = {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id ? `${urls.imdb}/title/${data.imdb_id}` : undefined,
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

export const tvExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvExternalFn({ data: id }),
    queryKey: ["tv", "details", id, "external"],
  });
};
