import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";
import { PaginationSchema } from "@/schemas/pagination";

import { findFavoriteFn } from "./favorites";

const tvDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const {
      data: { next_episode_to_air, ...rest },
    } = await client.GET("/3/tv/{series_id}", {
      params: {
        path: { series_id: context.data },
      },
    });

    const favorite = await findFavoriteFn(context);

    return { ...rest, favorite: Boolean(favorite) };
  });

export const tvDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvDetailsFn({ data: id });
    },
    queryKey: ["tv", "details", id],
  });
};

const tvCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/credits", {
      params: {
        path: { series_id: context.data },
      },
    });

    return data;
  });

export const tvCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvCreditsFn({ data: id });
    },
    queryKey: ["tv", "details", id, "credits"],
  });
};

const tvWatchProvidersFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/watch/providers", {
      params: {
        path: { series_id: context.data },
      },
    });

    return data;
  });

export const tvWatchProvidersOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvWatchProvidersFn({ data: id });
    },
    queryKey: ["tv", "details", id, "watch"],
  });
};

const tvVideosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/{series_id}/videos", {
      params: {
        path: { series_id: context.data },
      },
    });

    return data;
  });

export const tvVideosOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return tvVideosFn({ data: id });
    },
    queryKey: ["tv", "details", id, "videos"],
  });
};

const tvPopularFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(PaginationSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/popular", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const tvPopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return tvPopularFn({ data: query });
    },
    queryKey: ["tv", "list", "popular", query],
  });
};

const tvTopRatedFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(PaginationSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/tv/top_rated", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const tvTopRatedOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return tvTopRatedFn({ data: query });
    },
    queryKey: ["tv", "list", "top-rated", query],
  });
};
