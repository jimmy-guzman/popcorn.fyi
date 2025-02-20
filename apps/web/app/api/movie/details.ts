import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

import { findFavoriteFn } from "../favorites";

const movieDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const {
      data: { belongs_to_collection, ...rest },
    } = await client.GET("/3/movie/{movie_id}", {
      params: {
        path: { movie_id: context.data },
      },
    });

    const favorite = await findFavoriteFn(context);

    return { ...rest, favorite: Boolean(favorite) };
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieDetailsFn({ data: id }),
    queryKey: ["movie", "details", id],
  });
};
