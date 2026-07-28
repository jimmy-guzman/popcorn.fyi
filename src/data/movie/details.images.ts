import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { movieImages } from "@/integrations/tmdb/gen/sdk.gen";
import { IdSchema } from "@/schemas/id";

const toImage = (image: {
  file_path?: string;
  height?: number;
  width?: number;
}) => {
  return {
    filePath: image.file_path,
    height: image.height,
    width: image.width,
  };
};

const movieImagesFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await movieImages({
      client: tmdbClient,
      path: { movie_id: context.data },
      throwOnError: true,
    });

    return {
      backdrops: data.backdrops?.map(toImage),
      posters: data.posters?.map(toImage),
    };
  });

export const movieImagesOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieImagesFn({ data: id });
    },
    queryKey: ["movie", "details", id, "images"],
  });
};
