import env from "../../env.config";
import { setupClient } from "./api-clients/tmdb-v3";

export const client = setupClient(env.TMDB_API_TOKEN, {
  token: env.KV_REST_API_TOKEN,
  url: env.KV_REST_API_URL,
});
