import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import wikiDataClient from "./clients/wikidata";

const IdSchema = v.string();

export const wikipediaFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await wikiDataClient.GET(
      "/v1/entities/items/{item_id}/sitelinks/{site_id}",
      {
        params: {
          path: { item_id: context.data, site_id: "enwiki" },
        },
      },
    );

    return data.url;
  });
