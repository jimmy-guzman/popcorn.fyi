import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";

import { client } from "@/lib/tmdb";

const popularMoviesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/movie/popular");

  return data;
});

export const moviesPopularOptions = () => {
  return queryOptions({
    queryFn: () => {
      return popularMoviesFn();
    },
    queryKey: ["movies", "popular"],
  });
};

const topRatedMoviesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/movie/top_rated");

  return data;
});

export const moviesTopRatedOptions = () => {
  return queryOptions({
    queryFn: () => {
      return topRatedMoviesFn();
    },
    queryKey: ["movies", "top-rated"],
  });
};

const movieDetailsFn = createServerFn({ method: "GET" })
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

export const movieDetailsOptions = (id: number) => {
  return queryOptions({
    queryFn: () => {
      return movieDetailsFn({ data: id });
    },
    queryKey: ["movies", "details", id],
  });
};
