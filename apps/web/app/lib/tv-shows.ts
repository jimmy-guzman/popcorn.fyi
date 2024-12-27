import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/lists";

import { client } from "@/lib/tmdb";
import { PaginationSchema } from "@/schemas/lists";

const IdSchema = v.number();

const tvDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
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

export const tvDetailsOptions = (id: number) => {
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

export const tvCreditsOptions = (id: number) => {
  return queryOptions({
    queryFn: () => {
      return tvCreditsFn({ data: id });
    },
    queryKey: ["tv", "details", id, "credits"],
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
    queryKey: ["tv", "popular", query],
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
    queryKey: ["tv", "top-rated", query],
  });
};
