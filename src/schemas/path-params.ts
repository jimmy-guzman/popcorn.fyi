import * as v from "valibot";

import { IdSchema } from "./id";

export const PathParamsSchema = v.object({ id: IdSchema });

export const SeasonPathParamsSchema = v.object({
  id: IdSchema,
  season: IdSchema,
});

export const EpisodePathParamsSchema = v.object({
  episode: IdSchema,
  id: IdSchema,
  season: IdSchema,
});
