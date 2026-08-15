import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import tmdbClient from "@/integrations/tmdb/client";
import { configurationLanguages } from "@/integrations/tmdb/gen/sdk.gen";
import { orEmpty } from "@/lib/array";
import { cached } from "@/lib/cached";

const languagesFn = createServerFn({ method: "GET" })
  .middleware([cached("reference")])
  .handler(async () => {
    const { data } = await configurationLanguages({
      client: tmdbClient,
      throwOnError: true,
    });

    return orEmpty(data).toSorted((a, b) => {
      return (a.english_name ?? "").localeCompare(b.english_name ?? "");
    });
  });

export const languagesOptions = () => {
  return queryOptions({
    queryFn: () => {
      return languagesFn();
    },
    queryKey: ["languages", "list"],
  });
};
