import { createClient, createConfig } from "@/integrations/wikidata/gen/client";

const wikiDataClient = createClient(
  createConfig({
    baseUrl: "https://www.wikidata.org/w/rest.php/wikibase",
    headers: {
      "Accept-Encoding": "gzip,deflate",
      "User-Agent": "popcorn.fyi",
    },
  }),
);

export default wikiDataClient;
