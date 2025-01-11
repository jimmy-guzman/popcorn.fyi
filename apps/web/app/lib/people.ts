import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Pagination } from "@/schemas/pagination";

import { client } from "@/lib/tmdb";
import { IdSchema } from "@/schemas/id";
import { PaginationSchema } from "@/schemas/pagination";

import { findFavoriteFn } from "./favorites";

const popularPeopleFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(PaginationSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET("/3/person/popular", {
      params: {
        query: context.data,
      },
    });

    return data;
  });

export const peoplePopularOptions = (query: Pagination) => {
  return queryOptions({
    queryFn: () => {
      return popularPeopleFn({ data: query });
    },
    queryKey: ["people", "list", "popular", query],
  });
};

const personDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const {
      data: { deathday, homepage, ...rest },
    } = await client.GET("/3/person/{person_id}", {
      params: {
        path: { person_id: context.data },
      },
    });

    const favorite = await findFavoriteFn(context);

    return { ...rest, favorite: Boolean(favorite) };
  });

export const personDetailsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return personDetailsFn({ data: id });
    },
    queryKey: ["person", "details", id],
  });
};

const personCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET(
      "/3/person/{person_id}/combined_credits",
      {
        params: {
          path: { person_id: context.data.toString() },
        },
      },
    );

    return data;
  });

export const personCreditsOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => {
      return personCreditsFn({ data: id });
    },
    queryKey: ["people", "details", id, "credits"],
  });
};
