import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { collectionDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

/**
 * TMDB's OpenAPI spec declares collection parts with `name`/`original_name`,
 * but the API returns `title`/`original_title`. Validate the real shape.
 */
const CollectionSchema = v.object({
  backdrop_path: v.optional(v.string()),
  id: v.optional(v.number()),
  name: v.optional(v.string()),
  overview: v.optional(v.string()),
  parts: v.optional(
    v.array(
      v.object({
        id: v.number(),
        media_type: v.optional(v.string()),
        original_title: v.optional(v.string()),
        poster_path: v.optional(v.string()),
        release_date: v.optional(v.string()),
        title: v.optional(v.string()),
        vote_average: v.optional(v.number()),
      }),
    ),
  ),
  poster_path: v.optional(v.string()),
});

const collectionFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await collectionDetails({
      client: tmdbClient,
      path: { collection_id: context.data },
      throwOnError: true,
    });

    return v.parse(CollectionSchema, data);
  });

export const collectionOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return collectionFn({ data: id });
    },
    queryKey: ["collection", id],
  });
};
