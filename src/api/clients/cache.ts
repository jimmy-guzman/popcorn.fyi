import { Redis } from "@upstash/redis";

import { env } from "@/env";

const cache = new Redis({
  token: env.KV_REST_API_TOKEN,
  url: env.KV_REST_API_URL,
});

export default cache;
