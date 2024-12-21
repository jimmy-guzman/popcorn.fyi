import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import { client } from "@/lib/tmdb";

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

const tvPopularFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/tv/popular");

  return data;
});

export const tvPopularOptions = () => {
  return queryOptions({
    queryFn: () => {
      return tvPopularFn();
    },
    queryKey: ["tv", "popular"],
  });
};

const tvTopRatedFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await client.GET("/3/tv/top_rated");

  return data;
});

export const tvTopRatedOptions = () => {
  return queryOptions({
    queryFn: () => {
      return tvTopRatedFn();
    },
    queryKey: ["tv", "top-rated"],
  });
};
