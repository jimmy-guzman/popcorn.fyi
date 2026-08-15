import { createMiddleware } from "@tanstack/react-start";
import {
  getResponseHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";

import type { CacheTier } from "./cache-control";

import { nextCacheControl, NO_STORE } from "./cache-control";

/**
 * Server function middleware that lets shared caches serve the response.
 *
 * A failed handler marks the response `no-store` before rethrowing, so an
 * error is never served from cache even when a sibling function on the same
 * SSR document succeeded.
 *
 * @param tier how volatile the underlying data is
 *
 * @returns Middleware for `createServerFn().middleware([...])`.
 */
export const cached = (tier: CacheTier) => {
  return createMiddleware({ type: "function" }).server(async ({ next }) => {
    try {
      const result = await next();
      const header = nextCacheControl(getResponseHeader("cache-control"), tier);

      if (header) {
        setResponseHeader("cache-control", header);
      }

      return result;
    } catch (error) {
      setResponseHeader("cache-control", NO_STORE);

      throw error;
    }
  });
};
