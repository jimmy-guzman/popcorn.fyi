import { openai } from "@popcorn.fyi/api-clients/openai";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";

import type { Id } from "@/schemas/id";
import type { Summaries } from "@/schemas/summaries";

import cache from "@/lib/cache";
import { IdSchema } from "@/schemas/id";
import { SummariesSchema } from "@/schemas/summaries";

import { movieDetailsFn } from "./details";
import { composePrompt, getExpiry, normalizeMetadata } from "./utils";

interface MovieMetadata {
  genres?: { id: number; name?: string }[];
  overview?: string;
  release_date?: string;
  title?: string;
}

const generateAISummaries = async (metadata: MovieMetadata) => {
  const { description, genres, id, releaseDate, title } =
    normalizeMetadata(metadata);

  const cacheKey = `openai:summary:${id}`;

  const expiry = getExpiry(metadata.release_date);

  const cachedEntry = await cache.get<Summaries>(cacheKey);

  if (cachedEntry) {
    return cachedEntry;
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

  await cache.set(cacheKey, summaries, { ex: expiry });

  return summaries;
};

const moviePlot = createServerFn({ method: "GET" })
  .validator((data: unknown) => v.parse(IdSchema, data))
  .handler(async (context) => {
    const data = await movieDetailsFn(context);

    return generateAISummaries(data);
  });

export const moviePlotOptions = (id: Id) => {
  return queryOptions({
    queryFn: () => moviePlot({ data: id }),
    queryKey: ["movie", "details", id, "plot"],
  });
};
