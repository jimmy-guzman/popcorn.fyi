import createClient from "openapi-fetch";

import type { paths } from "./wikidata.gen";

const wikiDataClient = createClient<paths>({
  baseUrl: "https://www.wikidata.org/w/rest.php/wikibase",
  headers: {
    "Accept-Encoding": "gzip,deflate",
    "User-Agent": "popcorn.fyi",
  },
});

wikiDataClient.use({
  onResponse: ({ response }) => {
    if (!response.ok) {
      throw new Error(`${response.url}: ${response.statusText}`);
    }
  },
});

export default wikiDataClient;
