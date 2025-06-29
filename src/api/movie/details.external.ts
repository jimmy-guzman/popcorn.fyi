import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema } from "@/schemas/id";

import tmdbClient from "../clients/tmdb";
import { wikipediaFn } from "../wikipedia";

const movieExternalFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await tmdbClient.GET("/3/movie/{movie_id}/external_ids", {
      params: {
        path: { movie_id: context.data },
      },
    });

    const wikiDataId = data.wikidata_id as string | undefined;

    return {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : undefined,
      wikidata_id: wikiDataId,
      wikipedia_url: wikiDataId
        ? await wikipediaFn({ data: wikiDataId })
        : undefined,
    };
  });

export const movieExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieExternalFn({ data: id }),
    queryKey: ["movie", "details", id, "external"],
  });
};
