import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import * as v from "valibot";

import type { Pagination } from "@/schemas/lists";

import { client } from "@/lib/tmdb";
import { PaginationSchema } from "@/schemas/lists";

const IdSchema = v.number();

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
    queryKey: ["people", "popular", query],
  });
};

const personDetailsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(IdSchema, data);
  })
  .handler(async (context) => {
    const {
      data: {
        // @ts-expect-error something is wrong
        deathday,
        // @ts-expect-error something is wrong
        homepage,
        ...rest
      },
    } = await client.GET("/3/person/{person_id}", {
      params: {
        path: { person_id: context.data },
      },
    });

    return rest;
  });

export const personDetailsOptions = (id: number) => {
  return queryOptions({
    queryFn: () => {
      return personDetailsFn({ data: id });
    },
    queryKey: ["people", "details", id],
  });
};

const CreditIdSchema = v.string();

const personCreditsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return v.parse(CreditIdSchema, data);
  })
  .handler(async (context) => {
    const { data } = await client.GET(
      "/3/person/{person_id}/combined_credits",
      {
        params: {
          path: { person_id: context.data },
        },
      },
    );

    return data;
  });

export const personCreditsOptions = (id: string) => {
  return queryOptions({
    queryFn: () => {
      return personCreditsFn({ data: id });
    },
    queryKey: ["people", "details", id, "credits"],
  });
};
