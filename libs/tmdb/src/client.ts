import createClient from "openapi-fetch";

import type { paths } from "./schema.gen";

export const setupClient = (token: string) => {
  return createClient<paths>({
    baseUrl: "https://api.themoviedb.org/",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
