import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import { wikiDataClient } from "@/lib/wikidata";

const IdSchema = v.string();

type Id = v.InferInput<typeof IdSchema>;

export const wikipediaFn = createServerFn({ method: "GET" })
  .validator((data: Id) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await wikiDataClient.GET("/", {
      params: {
        query: {
          action: "wbgetentities",
          format: "json",
          ids: context.data,
        },
      },
    });

    const sitelinks = data.entities?.[context.data]?.sitelinks;

    if (sitelinks?.enwiki?.title) {
      return `https://en.wikipedia.org/wiki/${sitelinks.enwiki.title.replaceAll(" ", "_")}`;
    }
  });
