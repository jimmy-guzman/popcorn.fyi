import { createMiddleware } from "@tanstack/react-start";
import {
  getResponseHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";

import type { CacheTier } from "./cache-control";

import { CACHE_TIERS, cacheControlHeader } from "./cache-control";

const sharedMaxAge = () => {
  const existing = getResponseHeader("cache-control");

  if (!existing) {
    return undefined;
  }

  const [, seconds] = /s-maxage=(\d+)/.exec(existing) ?? [];

  return seconds === undefined ? undefined : Number(seconds);
};

/**
 * Server function middleware that lets shared caches serve the response.
 *
 * During SSR a server function runs in-process against the document's response,
 * so several tiers can land on one document. The shortest tier always wins: a
 * page is only as cacheable as its most volatile data.
 *
 * The header is written after the handler resolves, so a thrown error leaves
 * the response uncached.
 *
 * @param tier how volatile the underlying data is
 *
 * @returns Middleware for `createServerFn().middleware([...])`.
 */
export const cached = (tier: CacheTier) => {
  return createMiddleware({ type: "function" }).server(async ({ next }) => {
    const result = await next();
    const current = sharedMaxAge();

    if (current === undefined || CACHE_TIERS[tier].maxAge < current) {
      setResponseHeader("cache-control", cacheControlHeader(tier));
    }

    return result;
  });
};
