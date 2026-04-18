import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import wikiDataClient from "@/integrations/wikidata/client";
import { getSitelink } from "@/integrations/wikidata/gen/sdk.gen";

const IdSchema = v.string();

export const wikipediaFn = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const { data } = await getSitelink({
      client: wikiDataClient,
      path: { item_id: context.data, site_id: "enwiki" },
      throwOnError: true,
    });

    return data.url;
  });
