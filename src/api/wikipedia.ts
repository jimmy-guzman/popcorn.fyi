import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import wikiDataClient from "./clients/wikidata";

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

    return null;
  });
