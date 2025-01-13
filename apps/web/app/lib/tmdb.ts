import { setupClient } from "@popcorn.fyi/tmdb";

import { environment } from "../../environment";

export const client = setupClient(environment.TMDB_API_TOKEN);
