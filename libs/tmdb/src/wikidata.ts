import createClient from "openapi-fetch";

import type { paths } from "./wikidata.gen";

export const setupClient = () => {
  const client = createClient<paths>({
    baseUrl: "https://www.wikidata.org/w/api.php/",
  });

  client.use({
    onResponse: ({ response }) => {
      if (!response.ok) {
        throw new Error(`${response.url}: ${response.statusText}`);
      }
    },
  });

  return client;
};
