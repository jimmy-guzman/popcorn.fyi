import { db, eq } from "@popcorn.fyi/db";
import {
  UserFavorites,
  UserFavoritesInsertSchema,
} from "@popcorn.fyi/db/user-favorites";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";

import { IdSchema, UserIdSchema } from "@/schemas/id";

import { client } from "../lib/tmdb";

export const favoritePeopleFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(UserIdSchema, data);
  })
  .handler(async ({ data }) => {
    const favorites = await db.query.UserFavorites.findMany({
      where: (favorites, { and, eq }) => {
        return and(
          eq(favorites.userId, data),
          eq(favorites.mediaType, "person"),
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
  .validator((data: unknown) => {
    return v.parse(UserIdSchema, data);
  })
  .handler(async ({ data }) => {
    const favorites = await db.query.UserFavorites.findMany({
      where: (favorites, { and, eq }) => {
        return and(
          eq(favorites.userId, data),
          eq(favorites.mediaType, "movie"),
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
  .validator((data: unknown) => {
    return v.parse(UserIdSchema, data);
  })
  .handler(async ({ data }) => {
    const favorites = await db.query.UserFavorites.findMany({
      where: (favorites, { and, eq }) => {
        return and(eq(favorites.userId, data), eq(favorites.mediaType, "tv"));
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

export const addToFavoritesFn = createServerFn({ method: "GET" })
  .validator((data: v.InferInput<typeof UserFavoritesInsertSchema>) => {
    return v.parse(UserFavoritesInsertSchema, data);
  })
  .handler(async ({ data }) => {
    await db.insert(UserFavorites).values(data);
  });

export const removeFromFavoritesFn = createServerFn({ method: "GET" })
  .validator((data: Id) => {
    return v.parse(IdSchema, data);
  })
  .handler(async ({ data }) => {
    await db.delete(UserFavorites).where(eq(UserFavorites.tmdbId, data));
  });

export const findFavoriteFn = createServerFn({ method: "GET" })
  .validator((data: Id) => {
    return v.parse(IdSchema, data);
  })
  .handler(async ({ data }) => {
    return db.query.UserFavorites.findFirst({
      where: (favorites, { eq }) => {
        return eq(favorites.tmdbId, data);
      },
    });
  });
