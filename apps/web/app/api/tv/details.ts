import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { findFavoriteFn } from "@/api/favorites";
import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const tvDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const {
      data: { next_episode_to_air, ...rest },
    } = await client.GET("/3/tv/{series_id}", {
      params: { path: { series_id: context.data } },
    });

    const favorite = await findFavoriteFn(context);

    return { ...rest, favorite: Boolean(favorite) };
  });

export const tvDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvDetailsFn({ data: id });
    },
    queryKey: ["tv", "details", id],
  });
};
