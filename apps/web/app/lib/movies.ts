import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";
import { PaginationSchema } from "@/schemas/pagination";

import { findFavoriteFn } from "../api/favorites";

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
    queryKey: ["movie", "list", "popular", query],
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
    queryKey: ["movie", "list", "top-rated", query],
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

    const favorite = await findFavoriteFn(context);

    return { ...rest, favorite: Boolean(favorite) };
  });

export const movieDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieDetailsFn({ data: id });
    },
    queryKey: ["movie", "details", id],
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
    queryKey: ["movie", "details", id, "credits"],
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
    queryKey: ["movie", "details", id, "watch"],
  });
};

const movieVideosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/movie/{movie_id}/videos", {
      params: {
        path: { movie_id: context.data },
      },
    });

    return data;
  });

export const movieVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return movieVideosFn({ data: id });
    },
    queryKey: ["movie", "details", id, "videos"],
  });
};

const EmptyString = v.pipe(
  v.literal(""),
  v.transform(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined -- TODO
    return undefined;
  }),
);

const SortSchema = v.optional(
  v.fallback(
    v.union([
      v.literal("original_title.asc"),
      v.literal("original_title.desc"),
      v.literal("popularity.asc"),
      v.literal("popularity.desc"),
      v.literal("revenue.asc"),
      v.literal("revenue.desc"),
      v.literal("primary_release_date.asc"),
      v.literal("primary_release_date.desc"),
      v.literal("title.asc"),
      v.literal("title.desc"),
      v.literal("vote_average.asc"),
      v.literal("vote_average.desc"),
      v.literal("vote_count.asc"),
      v.literal("vote_count.desc"),
    ]),
    "popularity.desc",
  ),
  "popularity.desc",
);

const Filter = v.optional(v.union([EmptyString, v.string()]));

export const DiscoverSchema = v.intersect([
  PaginationSchema,
  v.object({
    primary_release_date_gte: Filter,
    primary_release_date_lte: Filter,
    sort_by: SortSchema,
    watch_region: v.optional(v.fallback(v.string(), "US"), "US"),
    with_genres: Filter,
    with_watch_providers: Filter,
  }),
]);

const discoverMoviesFn = createServerFn({ method: "GET" })
  .validator((data: v.InferInput<typeof DiscoverSchema>) => {
    return v.parse(DiscoverSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/discover/movie", {
      params: {
        query: {
          ...context.data,
          "primary_release_date.gte": context.data.primary_release_date_gte,
          "primary_release_date.lte": context.data.primary_release_date_lte,
        },
      },
    });

    return data;
  });

export const discoverMoviesOptions = (
  query: v.InferInput<typeof DiscoverSchema>,
) => {
  return queryOptions({
    queryFn: () => {
      return discoverMoviesFn({ data: query });
    },
    queryKey: ["movie", "list", "discover", query],
  });
};
