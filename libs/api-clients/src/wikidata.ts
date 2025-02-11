import createClient from "openapi-fetch";

import type { paths } from "./wikidata.gen";

interface ClientOptions {
  appVersion?: string;
}

export const setupClient = ({ appVersion = "0.0.0" }: ClientOptions = {}) => {
  const client = createClient<paths>({
    baseUrl: "https://www.wikidata.org/w/api.php/",
    headers: {
      "Accept-Encoding": "gzip,deflate",
      "User-Agent": `popcorn.fyi/${appVersion}`,
    },
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
