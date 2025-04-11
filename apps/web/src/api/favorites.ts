import { db, eq, sql } from "@popcorn.fyi/db";
import { Favorites, FavoritesInsertSchema } from "@popcorn.fyi/db/favorites";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { FavoriteId } from "@/schemas/id";

import { FavoriteIdSchema, IdSchema, UserIdSchema } from "@/schemas/id";

import { client } from "../lib/tmdb";

export const favoritePeopleFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const favorites = await db.query.Favorites.findMany({
      where: (favorites, { and, eq, isNull }) => {
        return and(
          eq(favorites.userId, data),
          eq(favorites.mediaType, "person"),
          isNull(favorites.deletedAt),
        );
      },
    });

    return Promise.all(
      favorites.map(async (favorite) => {
        const { data } = await client.GET("/3/person/{person_id}", {
          params: { path: { person_id: favorite.tmdbId } },
        });

        return {
          id: favorite.tmdbId,
          known_for_department: data.known_for_department,
          media_type: "person" as const,
          profile_path: data.profile_path,
          title: data.name,
        };
      }),
    );
  });
export const favoriteMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const favorites = await db.query.Favorites.findMany({
      where: (favorites, { and, eq, isNull }) => {
        return and(
          eq(favorites.userId, data),
          eq(favorites.mediaType, "movie"),
          isNull(favorites.deletedAt),
        );
      },
    });

    return Promise.all(
      favorites.map(async (favorite) => {
        const { data } = await client.GET("/3/movie/{movie_id}", {
          params: { path: { movie_id: favorite.tmdbId } },
        });

        return {
          id: favorite.tmdbId,
          media_type: "movie" as const,
          poster_path: data.poster_path,
          release_date: data.release_date,
          title: data.title,
          vote_average: data.vote_average,
        };
      }),
    );
  });

export const favoriteTvShowsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(UserIdSchema, data))
  .handler(async ({ data }) => {
    const favorites = await db.query.Favorites.findMany({
      where: (favorites, { and, eq, isNull }) => {
        return and(
          eq(favorites.userId, data),
          eq(favorites.mediaType, "tv"),
          isNull(favorites.deletedAt),
        );
      },
    });

    return Promise.all(
      favorites.map(async (favorite) => {
        const { data } = await client.GET("/3/tv/{series_id}", {
          params: { path: { series_id: favorite.tmdbId } },
        });

        return {
          first_air_date: data.first_air_date,
          id: favorite.tmdbId,
          media_type: "tv" as const,
          name: data.name,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
        };
      }),
    );
  });

export const addToFavoritesFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => v.parse(FavoritesInsertSchema, data))
  .handler(async ({ data }) => {
    const existingFavorite = await db.query.Favorites.findFirst({
      where: (favorites, { and, eq }) => {
        return and(
          eq(favorites.userId, data.userId),
          eq(favorites.mediaType, data.mediaType),
          eq(favorites.tmdbId, data.tmdbId),
        );
      },
    });

    return existingFavorite
      ? await db
          .update(Favorites)
          .set({ deletedAt: null })
          .where(eq(Favorites.id, existingFavorite.id))
          .returning()
          .then((res) => res[0])
      : await db
          .insert(Favorites)
          .values(data)
          .returning()
          .then((res) => res[0]);
  });

export const removeFromFavoritesFn = createServerFn({ method: "POST" })
  .validator((data: FavoriteId) => v.parse(FavoriteIdSchema, data))
  .handler(async ({ data }) => {
    const result = await db
      .update(Favorites)
      .set({ deletedAt: sql`now()` })
      .where(eq(Favorites.id, data))
      .returning();

    if (result.length === 0) {
      throw new Error("Favorite does not exist or has already been removed.");
    }
  });

const FindFavoriteSchema = v.object({ tmdbId: IdSchema, userId: UserIdSchema });

export const findFavoriteFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(FindFavoriteSchema, data))
  .handler(async ({ data }) => {
    const favorite = await db.query.Favorites.findFirst({
      where: (favorites, { and, eq, isNull }) => {
        return and(
          eq(favorites.userId, data.userId),
          eq(favorites.tmdbId, data.tmdbId),
          isNull(favorites.deletedAt),
        );
      },
    });

    return favorite ?? null;
  });
