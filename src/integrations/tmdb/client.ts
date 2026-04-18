import { env } from "@/env";
import { createClient, createConfig } from "@/integrations/tmdb/gen/client";

const tmdbClient = createClient(
  createConfig({
    baseUrl: "https://api.themoviedb.org",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
    },
  }),
);

export default tmdbClient;
