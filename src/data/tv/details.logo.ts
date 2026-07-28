import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import type { Id } from "@/schemas/id";

import tmdbClient from "@/integrations/tmdb/client";
import { tvSeriesImages } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { IdSchema } from "@/schemas/id";

interface Logo {
  file_path?: string;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  width?: number;
}

const preferEnglish = (logos: Logo[]) => {
  const english = logos.filter((logo) => {
    return logo.iso_639_1 === "en";
  });

  return english.length > 0 ? english : logos;
};

const highestRated = (logos: Logo[]) => {
  return logos.toSorted((a, b) => {
    return (b.vote_average ?? 0) - (a.vote_average ?? 0);
  })[0];
};

const tvLogoFn = createServerFn({ method: "GET" })
  .validator(IdSchema)
  .handler(async (context) => {
    const { data } = await tvSeriesImages({
      client: tmdbClient,
      path: { series_id: context.data },
      query: { include_image_language: "en,null" },
      throwOnError: true,
    });

    const logo = highestRated(preferEnglish(orEmpty(data.logos)));

    return {
      logo: logo?.file_path
        ? {
            filePath: logo.file_path,
            height: logo.height,
            width: logo.width,
          }
        : undefined,
    };
  });

export const tvLogoOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvLogoFn({ data: id });
    },
    queryKey: ["tv", "details", id, "logo"],
  });
};
