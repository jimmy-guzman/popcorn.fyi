import { openai } from "@popcorn.fyi/api-clients/openai";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { lru } from "tiny-lru";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Summaries } from "@/schemas/summaries";

import { IdSchema } from "@/schemas/id";
import { SummariesSchema } from "@/schemas/summaries";

import { movieDetailsFn } from "./details";
import { composePrompt, getTTL, normalizeMetadata } from "./utils";

interface MovieMetadata {
  genres?: { id: number; name?: string }[];
  overview?: string;
  release_date?: string;
  title?: string;
}

const cache = lru<{ data: Summaries; expiresAt: number }>(500);

const generateAISummaries = async (metadata: MovieMetadata) => {
  const { description, genres, releaseDate, title } =
    normalizeMetadata(metadata);

  const cacheKey = `summary:${title}:${releaseDate}`;

  const ttl = getTTL(metadata.release_date);

  const now = Date.now();

  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && now < cachedEntry.expiresAt) {
    return cachedEntry.data;
  }

  const prompt = composePrompt({ description, genres, releaseDate, title });

  const response = await openai.chat.completions.create({
    messages: [{ content: prompt, role: "system" }],
    model: "gpt-4o-mini-2024-07-18",
    response_format: { type: "json_object" },
  });

  const rawContent = response.choices[0]?.message.content;

  if (!rawContent) {
    return {
      long: [{ spoiler: "", text: "No expanded plot available at this time." }],
    };
  }

  const summaries = v.parse(SummariesSchema, JSON.parse(rawContent));

  cache.set(cacheKey, { data: summaries, expiresAt: now + ttl });

  return summaries;
};

const movieSummaries = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const data = await movieDetailsFn(context);

    return generateAISummaries(data);
  });

export const movieSummariesOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => movieSummaries({ data: id }),
    queryKey: ["movie", "details", id, "plot"],
  });
};
