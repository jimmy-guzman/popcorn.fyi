import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { collectionDetails } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";
import { NullableNumber, NullableString } from "@/schemas/utils";

/**
 * TMDB's OpenAPI spec declares collection parts with `name`/`original_name`,
 * but the API returns `title`/`original_title`. Validate the real shape.
 */
const CollectionSchema = v.object({
  backdrop_path: NullableString,
  id: NullableNumber,
  name: NullableString,
  overview: NullableString,
  parts: v.optional(
    v.array(
      v.object({
        id: v.number(),
        media_type: NullableString,
        original_title: NullableString,
        poster_path: NullableString,
        release_date: NullableString,
        title: NullableString,
        vote_average: NullableNumber,
      }),
    ),
  ),
  poster_path: NullableString,
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
