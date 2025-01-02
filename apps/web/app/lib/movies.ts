import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";
import { PaginationSchema } from "@/schemas/pagination";

const popularMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(PaginationSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/popular", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const moviesPopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return popularMoviesFn({ data: query });
    },
    queryKey: ["movies", "popular", query],
  });
};

const topRatedMoviesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(PaginationSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/top_rated", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const moviesTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return topRatedMoviesFn({ data: query });
    },
    queryKey: ["movies", "top-rated", query],
  });
};

const movieDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const {
      data: { belongs_to_collection, ...rest },
    } = await client.GET("/3/movie/{movie_id}", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return rest;
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieDetailsFn({ data: id });
    },
    queryKey: ["movies", "details", id],
  });
};

const movieCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/credits", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieCreditsFn({ data: id });
    },
    queryKey: ["movies", "details", id, "credits"],
  });
};

const movieWatchFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/watch/providers", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieWatchOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieWatchFn({ data: id });
    },
    queryKey: ["movies", "details", id, "watch"],
  });
};
