import * as v from "valibot";

const SummaryType = v.object({
  spoiler: v.optional(v.string()),
  text: v.string(),
});

export const SummariesSchema = v.object({
  long: v.array(SummaryType),
});

export type Summaries = v.InferInput<typeof SummariesSchema>;
