import { setupClient } from "@popcorn.fyi/api-clients/tmdb-v3";

import env from "../../env.config";

export const client = setupClient(env.TMDB_API_TOKEN);
