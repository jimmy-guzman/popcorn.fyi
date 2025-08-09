import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

export const env = createEnv({
  client: {},
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    KV_REST_API_TOKEN: v.string(),
    KV_REST_API_URL: v.string(),
    TMDB_API_TOKEN: v.string(),
  },
  skipValidation: import.meta.env.MODE === "test",
});
