import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesVideos } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const tvVideosFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesVideos({
      client: tmdbClient,
      path: { series_id: context.data },
      throwOnError: true,
    });

    return data;
  });

export const tvVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvVideosFn({ data: id });
    },
    queryKey: ["tv", "details", id, "videos"],
  });
};
