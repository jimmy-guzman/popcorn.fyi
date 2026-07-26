import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import { urls } from "@/config/urls";
import tmdbClient from "@/integrations/tmdb/client";
import { movieExternalIds } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

import { wikipediaFn } from "../wikipedia";

const movieExternalFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await movieExternalIds({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    const base = {
      imdb_id: data.imdb_id,
      imdb_url: data.imdb_id ? `${urls.imdb}/title/${data.imdb_id}` : undefined,
      wikidata_id: data.wikidata_id as string | undefined,
      wikipedia_url: null,
    };

    if (!base.wikidata_id) {
      return base;
    }

    try {
      return {
        ...base,
        wikipedia_url: await wikipediaFn({ data: base.wikidata_id }),
      };
    } catch {
      return base;
    }
  });

export const movieExternalOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieExternalFn({ data: id });
    },
    queryKey: ["movie", "details", id, "external"],
  });
};
