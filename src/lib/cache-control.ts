const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const CACHE_TIERS = {
  detail: { maxAge: HOUR, staleWhileRevalidate: DAY },
  list: { maxAge: 5 * MINUTE, staleWhileRevalidate: HOUR },
  reference: { maxAge: DAY, staleWhileRevalidate: 7 * DAY },
  search: { maxAge: MINUTE, staleWhileRevalidate: 5 * MINUTE },
} satisfies Record<string, { maxAge: number; staleWhileRevalidate: number }>;

export type CacheTier = keyof typeof CACHE_TIERS;

/**
 * The value written when a response must never be cached.
 */
export const NO_STORE = "no-store";

const sharedMaxAge = (existing: string) => {
  const [, seconds] = /s-maxage=(\d+)/.exec(existing) ?? [];

  return seconds === undefined ? undefined : Number(seconds);
};

const cacheControlHeader = (tier: CacheTier) => {
  const { maxAge, staleWhileRevalidate } = CACHE_TIERS[tier];

  return `public, max-age=0, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
};

/**
 * Decides what `Cache-Control` a tier should write, given whatever is already
 * on the response.
 *
 * During SSR every server function runs in-process against the one document
 * response, so several tiers and failures collide there. `no-store` is
 * permanent, so a function that fails cannot have its response made cacheable
 * by a sibling that succeeds, in either completion order. Otherwise the
 * shortest tier wins, because a page is only as cacheable as its most volatile
 * data.
 *
 * `max-age=0` keeps browsers revalidating while `s-maxage` lets shared caches
 * serve the response without invoking a function, and `stale-while-revalidate`
 * serves a stale hit instantly while one background request refreshes it.
 *
 * @param existing the `Cache-Control` already on the response, if any
 *
 * @param tier how volatile this function's data is
 *
 * @returns The value to write, or `undefined` to leave the response alone.
 */
export const nextCacheControl = (
  existing: string | undefined,
  tier: CacheTier,
) => {
  if (existing === NO_STORE) {
    return undefined;
  }

  const current = existing === undefined ? undefined : sharedMaxAge(existing);

  if (current !== undefined && current <= CACHE_TIERS[tier].maxAge) {
    return undefined;
  }

  return cacheControlHeader(tier);
};
