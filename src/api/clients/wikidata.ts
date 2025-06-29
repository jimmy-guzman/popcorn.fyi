import createClient from "openapi-fetch";

import type { paths } from "./wikidata.gen";

import cache from "./cache";

const STATIC_TTL = 604_800; // 7 days in seconds
const CACHE_PREFIX = "wikidata:";

const wikiDataClient = createClient<paths>({
  baseUrl: "https://www.wikidata.org/w/rest.php/wikibase",
  headers: {
    "Accept-Encoding": "gzip,deflate",
    "User-Agent": "popcorn.fyi",
  },
});

wikiDataClient.use({
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

    try {
      const responseClone = response.clone();

      const data = await responseClone.json();

      await cache.set(cacheKey, JSON.stringify(data), { ex: STATIC_TTL });
    } catch (error) {
      // eslint-disable-next-line no-console -- This is ok.
      console.error("Redis error:", error);
    }
  },
});

export default wikiDataClient;
