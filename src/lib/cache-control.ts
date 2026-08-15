const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * How long a shared cache may serve each kind of TMDB data, keyed by how
 * volatile that data is.
 */
export const CACHE_TIERS = {
  detail: { maxAge: HOUR, staleWhileRevalidate: DAY },
  list: { maxAge: 5 * MINUTE, staleWhileRevalidate: HOUR },
  reference: { maxAge: DAY, staleWhileRevalidate: 7 * DAY },
  search: { maxAge: MINUTE, staleWhileRevalidate: 5 * MINUTE },
} satisfies Record<string, { maxAge: number; staleWhileRevalidate: number }>;

export type CacheTier = keyof typeof CACHE_TIERS;

/**
 * Builds a `Cache-Control` value for a caching tier.
 *
 * `max-age=0` keeps browsers revalidating while `s-maxage` lets shared caches
 * serve the response without invoking a function, and `stale-while-revalidate`
 * serves a stale hit instantly while a single background request refreshes it.
 *
 * @param tier how volatile the underlying data is
 *
 * @returns A `Cache-Control` header value.
 */
export const cacheControlHeader = (tier: CacheTier) => {
  const { maxAge, staleWhileRevalidate } = CACHE_TIERS[tier];

  return `public, max-age=0, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
};
