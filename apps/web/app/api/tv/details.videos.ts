import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";

const tvVideosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/videos", {
      params: {
        path: { series_id: context.data },
      },
    });

    return data;
  });

export const tvVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => tvVideosFn({ data: id }),
    queryKey: ["tv", "details", id, "videos"],
  });
};
