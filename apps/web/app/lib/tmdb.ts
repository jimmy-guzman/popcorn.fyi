import { setupClient } from "@popcorn.fyi/tmdb";

import env from "../../environment";

export const client = setupClient(env.TMDB_API_TOKEN);
