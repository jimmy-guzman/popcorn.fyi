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

export const popularPeopleFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await client.GET("/3/person/popular");

    return data;
  },
);
