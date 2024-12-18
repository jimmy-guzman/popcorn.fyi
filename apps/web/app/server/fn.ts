import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

export const trendingMovieFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/trending/movie/{time_window}", {
      params: { path: { time_window: "day" } },
    });

    return data;
  },
);

export const popularMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/movie/popular");

    return data;
  },
);

export const topRatedMoviesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/movie/top_rated");

    return data;
  },
);

export const movieDetailsFn = createServerFn({ method: "GET" })
  .validator((data: number) => {
    return data;
  })
  .handler(async (context) => {
    const {
      data: {
        // @ts-expect-error something is wrong
        belongs_to_collection,
        ...rest
      },
    } = await client.GET("/3/movie/{movie_id}", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return rest;
  });

export const trendingTvFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/trending/tv/{time_window}", {
      params: { path: { time_window: "day" } },
    });

    return data;
  },
);

export const popularTvFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/tv/popular");

    return data;
  },
);

export const topRatedTvFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/tv/top_rated");

    return data;
  },
);

export const tvDetailsFn = createServerFn({ method: "GET" })
  .validator((data: number) => {
    return data;
  })
  .handler(async (context) => {
    const {
      data: {
        // @ts-expect-error something is wrong
        next_episode_to_air,
        ...rest
      },
    } = await client.GET("/3/tv/{series_id}", {
      params: {
        path: { series_id: context.data },
      },
    });

    return rest;
  });

export const popularPeopleFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/person/popular");

    return data;
  },
);
