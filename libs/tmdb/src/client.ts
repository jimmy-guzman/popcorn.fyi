import createClient from "openapi-fetch";

import type { paths } from "./schema.gen";

export const setupClient = (token: string) => {
  const client = createClient<paths>({
    baseUrl: "https://api.themoviedb.org/",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
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
