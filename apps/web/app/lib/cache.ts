import { Redis } from "@upstash/redis";

const cache = new Redis({
  token: process.env.KV_REST_API_TOKEN,
  url: process.env.KV_REST_API_URL,
});

export default cache;
