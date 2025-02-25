import { db, eq, sql } from "@popcorn.fyi/db";
import { Watchlist, WatchlistInsertSchema } from "@popcorn.fyi/db/watchlist";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { WatchlistId } from "@/schemas/id";

import { IdSchema, UserIdSchema, WatchlistIdSchema } from "@/schemas/id";

import { client } from "../lib/tmdb";

export const watchlistMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const watchlist = await db.query.Watchlist.findMany({
      where: (watchlist, { and, eq, isNull }) => {
        return and(
          eq(watchlist.userId, data),
          eq(watchlist.mediaType, "movie"),
          isNull(watchlist.deletedAt),
        );
      },
    });

    return Promise.all(
      watchlist.map(async (item) => {
        const { data } = await client.GET("/3/movie/{movie_id}", {
          params: { path: { movie_id: item.tmdbId } },
        });

        return {
          id: item.tmdbId,
          media_type: "movie" as const,
          poster_path: data.poster_path,
          release_date: data.release_date,
          title: data.title,
          vote_average: data.vote_average,
        };
      }),
    );
  });

export const watchlistTvShowsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const watchlist = await db.query.Watchlist.findMany({
      where: (watchlist, { and, eq, isNull }) => {
        return and(
          eq(watchlist.userId, data),
          eq(watchlist.mediaType, "tv"),
          isNull(watchlist.deletedAt),
        );
      },
    });

    return Promise.all(
      watchlist.map(async (item) => {
        const { data } = await client.GET("/3/tv/{series_id}", {
          params: { path: { series_id: item.tmdbId } },
        });

        return {
          first_air_date: data.first_air_date,
          id: item.tmdbId,
          media_type: "tv" as const,
          name: data.name,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
        };
      }),
    );
  });

export const addToWatchlistFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => v.parse(WatchlistInsertSchema, data))
  .handler(async ({ data }) => {
    const existingWatchlistItem = await db.query.Watchlist.findFirst({
      where: (watchlist, { and, eq }) => {
        return and(
          eq(watchlist.userId, data.userId),
          eq(watchlist.mediaType, data.mediaType),
          eq(watchlist.tmdbId, data.tmdbId),
        );
      },
    });

    return existingWatchlistItem
      ? await db
          .update(Watchlist)
          .set({ deletedAt: null })
          .where(eq(Watchlist.id, existingWatchlistItem.id))
          .returning()
          .then((res) => res[0])
      : await db
          .insert(Watchlist)
          .values(data)
          .returning()
          .then((res) => res[0]);
  });

export const removeFromWatchlistFn = createServerFn({ method: "POST" })
  .validator((data: WatchlistId) => v.parse(WatchlistIdSchema, data))
  .handler(async ({ data }) => {
    const result = await db
      .update(Watchlist)
      .set({ deletedAt: sql`now()` })
      .where(eq(Watchlist.id, data))
      .returning();

    if (result.length === 0) {
      throw new Error("Watchlist item not found or already removed.");
    }
  });

const FindWatchlistSchema = v.object({
  tmdbId: IdSchema,
  userId: UserIdSchema,
});

export const findWatchlistFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(FindWatchlistSchema, data))
  .handler(async ({ data }) => {
    const watchlistItem = await db.query.Watchlist.findFirst({
      where: (watchlist, { and, eq, isNull }) => {
        return and(
          eq(watchlist.userId, data.userId),
          eq(watchlist.tmdbId, data.tmdbId),
          isNull(watchlist.deletedAt),
        );
      },
    });

    return watchlistItem ?? null;
  });
