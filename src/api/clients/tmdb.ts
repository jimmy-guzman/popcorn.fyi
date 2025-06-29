import createClient from "openapi-fetch";

import { env } from "@/env";

import type { paths } from "./tmdb.gen";

import cache from "./cache";

const CACHE_CONTROL_FALLBACK = 3600;
const CACHE_PREFIX = "tmdb:";

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

const tmdbClient = createClient<paths>({
  baseUrl: "https://api.themoviedb.org/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
  },
});

tmdbClient.use({
  async onRequest({ request }) {
    const cacheKey = `${CACHE_PREFIX}${request.url}`;

    try {
      const cached = await cache.get(cacheKey);

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

    const cacheKey = `${CACHE_PREFIX}${request.url}`;
    const cacheControl = response.headers.get("cache-control");
    const ttl = parseCacheControl(cacheControl);

    if (ttl > 0) {
      try {
        const responseClone = response.clone();

        const data = await responseClone.json();

        await cache.set(cacheKey, JSON.stringify(data), { ex: ttl });
      } catch (error) {
        // eslint-disable-next-line no-console -- This is ok.
        console.error("Redis error:", error);
      }
    }
  },
});

export default tmdbClient;
