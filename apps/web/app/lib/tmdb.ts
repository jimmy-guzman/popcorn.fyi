import { setupClient } from "@popcorn.fyi/api-clients/tmdb-v3";

import { environment } from "../../environment";

export const client = setupClient(environment.TMDB_API_TOKEN);
