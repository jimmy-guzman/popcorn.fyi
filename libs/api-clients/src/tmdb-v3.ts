import { Redis } from "@upstash/redis";
import createClient from "openapi-fetch";

import type { paths } from "./tmdb-v3.gen";

const CACHE_CONTROL_FALLBACK = 3600;

function parseCacheControl(cacheControl: null | string): number {
  if (!cacheControl) {
    return CACHE_CONTROL_FALLBACK;
  }

  const maxAgeMatch = /max-age=(\d+)/.exec(cacheControl);

  const maxAge = maxAgeMatch?.[1];

  if (maxAge) {
    return Number.parseInt(maxAge, 10);
  }

  return CACHE_CONTROL_FALLBACK;
}

function getCacheKey(url: string) {
  return `tmdb:${url}`;
}

export const setupClient = (
  token: string,
  cache: { token: string; url: string },
) => {
  const redis = new Redis(cache);

  const client = createClient<paths>({
    baseUrl: "https://api.themoviedb.org/",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  client.use({
    async onRequest({ request }) {
      const cacheKey = getCacheKey(request.url);

      try {
        const cached = await redis.get(cacheKey);

        if (cached) {
          return new Response(JSON.stringify(cached), {
            headers: {
              "content-type": "application/json",
            },
            status: 200,
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console -- This is ok.
        console.error("Redis error:", error);
      }

      return request;
    },
    onResponse: async ({ request, response }) => {
      if (!response.ok) {
        throw new Error(`${response.url}: ${response.statusText}`);
      }

      const cacheKey = getCacheKey(request.url);
      const cacheControl = response.headers.get("cache-control");
      const ttl = parseCacheControl(cacheControl);

      if (ttl > 0) {
        try {
          const responseClone = response.clone();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- This is ok.
          const data = await responseClone.json();

          await redis.set(cacheKey, JSON.stringify(data), { ex: ttl });
        } catch (error) {
          // eslint-disable-next-line no-console -- This is ok.
          console.error("Redis error:", error);
        }
      }
    },
  });

  return client;
};
