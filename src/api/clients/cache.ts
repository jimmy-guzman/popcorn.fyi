import { Redis } from "@upstash/redis";
import envConfig from "env.config";

const cache = new Redis({
  token: envConfig.KV_REST_API_TOKEN,
  url: envConfig.KV_REST_API_URL,
});

export default cache;
