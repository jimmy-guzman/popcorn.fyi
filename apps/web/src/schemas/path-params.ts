import * as v from "valibot";

import { IdSchema } from "./id";

export const PathParamsSchema = v.object({ id: IdSchema });
