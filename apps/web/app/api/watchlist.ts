import { and, db, eq, isNull, sql } from "@popcorn.fyi/db";
import { Media } from "@popcorn.fyi/db/media";
import { MediaList } from "@popcorn.fyi/db/media-list";
import { year } from "@popcorn.fyi/utils";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { WatchlistId } from "@/schemas/id";

import { IdSchema, UserIdSchema, WatchlistIdSchema } from "@/schemas/id";
import { MediaTypeSchema } from "@/schemas/media-type";

import { client } from "../lib/tmdb";

export const watchlistMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const watchlist = await db
      .select({ tmdbId: Media.tmdbId })
      .from(MediaList)
      .innerJoin(Media, eq(MediaList.mediaId, Media.id))
      .where(
        and(
          eq(MediaList.userId, data),
          eq(MediaList.listType, "watchlist"),
          eq(Media.mediaType, "movie"),
          isNull(MediaList.deletedAt),
        ),
      );

    if (watchlist.length === 0) return [];

    const movies = await Promise.allSettled(
      watchlist.map(async ({ tmdbId }) => {
        const { data } = await client.GET("/3/movie/{movie_id}", {
          params: { path: { movie_id: tmdbId } },
        });

        return {
          id: tmdbId,
          media_type: "movie" as const,
          poster_path: data.poster_path,
          release_date: data.release_date,
          title: data.title,
          vote_average: data.vote_average,
        };
      }),
    );

    return movies
      .filter((movie) => movie.status === "fulfilled")
      .map((movie) => movie.value);
  });

export const watchlistTvShowsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const watchlist = await db
      .select({ tmdbId: Media.tmdbId })
      .from(MediaList)
      .innerJoin(Media, eq(MediaList.mediaId, Media.id))
      .where(
        and(
          eq(MediaList.userId, data),
          eq(MediaList.listType, "watchlist"),
          eq(Media.mediaType, "tv"),
          isNull(MediaList.deletedAt),
        ),
      );

    if (watchlist.length === 0) return [];

    const tvShows = await Promise.allSettled(
      watchlist.map(async ({ tmdbId }) => {
        const { data } = await client.GET("/3/tv/{series_id}", {
          params: { path: { series_id: tmdbId } },
        });

        return {
          first_air_date: data.first_air_date,
          id: tmdbId,
          media_type: "tv" as const,
          name: data.name,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
        };
      }),
    );

    return tvShows
      .filter((tvShow) => tvShow.status === "fulfilled")
      .map((tvShow) => tvShow.value);
  });

const normalizeTMDBData = (
  data:
    | {
        first_air_date?: string;
        genres?: { name?: string }[];
        name?: string;
        original_language?: string;
        overview?: string;
      }
    | {
        genres?: { name?: string }[];
        original_language?: string;
        overview?: string;
        release_date?: string;
        title?: string;
      },
  mediaType: "movie" | "tv",
  tmdbId: number,
) => {
  const base = {
    description: data.overview ?? "No description available.",
    genres:
      data.genres?.flatMap((genre) => (genre.name ? [genre.name] : [])) ?? [],
    language: data.original_language ?? "en",
    mediaType,
    tmdbId,
  };

  return "title" in data
    ? {
        ...base,
        releaseYear: data.release_date ? year(data.release_date) : null,
        title: data.title ?? "",
      }
    : "name" in data
      ? {
          ...base,
          releaseYear: data.first_air_date ? year(data.first_air_date) : null,
          title: data.name ?? "",
        }
      : { ...base, releaseYear: null, title: "" };
};

const insertMedia = async (mediaType: "movie" | "tv", tmdbId: number) => {
  const endpoint =
    mediaType === "movie" ? "/3/movie/{movie_id}" : "/3/tv/{series_id}";

  const { data } = await client.GET(endpoint, {
    params: { path: { movie_id: tmdbId, series_id: tmdbId } },
  });

  const media = await db
    .insert(Media)
    .values(normalizeTMDBData(data, mediaType, tmdbId))
    .returning({ id: Media.id });

  const mediaId = media[0]?.id;

  if (!mediaId) {
    throw new Error("Failed to insert media.");
  }

  return mediaId;
};

export const addToWatchlistFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return v.parse(
      v.object({
        mediaType: MediaTypeSchema,
        tmdbId: IdSchema,
        userId: UserIdSchema,
      }),
      data,
    );
  })
  .handler(async ({ data }) => {
    const existingMedia = await db
      .select({ id: Media.id })
      .from(Media)
      .where(
        and(eq(Media.tmdbId, data.tmdbId), eq(Media.mediaType, data.mediaType)),
      )
      .limit(1)
      .then((res) => res[0]?.id);

    const mediaId =
      existingMedia ?? (await insertMedia(data.mediaType, data.tmdbId));

    return db
      .insert(MediaList)
      .values({
        listType: "watchlist",
        mediaId,
        userId: data.userId,
      })
      .onConflictDoUpdate({
        set: { deletedAt: sql`NULL` },
        target: [MediaList.userId, MediaList.mediaId, MediaList.listType],
      })
      .returning()
      .then((res) => res[0]);
  });

export const removeFromWatchlistFn = createServerFn({ method: "POST" })
  .validator((data: WatchlistId) => v.parse(WatchlistIdSchema, data))
  .handler(async ({ data }) => {
    const result = await db
      .update(MediaList)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(MediaList.id, data), isNull(MediaList.deletedAt)))
      .returning();

    return { deleted: result.length > 0 };
  });

const FindWatchlistSchema = v.object({
  tmdbId: IdSchema,
  userId: UserIdSchema,
});

export const findWatchlistFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(FindWatchlistSchema, data))
  .handler(async ({ data }) => {
    const watchlistItem = await db
      .select({
        deletedAt: MediaList.deletedAt,
        mediaId: MediaList.mediaId,
        userId: MediaList.userId,
        watchlistId: MediaList.id,
      })
      .from(MediaList)
      .innerJoin(Media, eq(MediaList.mediaId, Media.id))
      .where(
        and(
          eq(MediaList.userId, data.userId),
          eq(MediaList.listType, "watchlist"),
          eq(Media.tmdbId, data.tmdbId),
          isNull(MediaList.deletedAt),
        ),
      )
      .limit(1);

    return watchlistItem[0] ?? null;
  });
