import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { SearchList } from "@/components/search-list";
import { site } from "@/config/site";
import { searchOptions } from "@/lib/search";
import { seo } from "@/lib/seo";

const searchSchema = v.object({
  q: v.optional(v.fallback(v.string(), ""), ""),
});

export const Route = createFileRoute("/_layout/search")({
  component: RouteComponent,
  loaderDeps: ({ search: { q } }) => {
    return { q };
  },
  // eslint-disable-next-line perfectionist/sort-objects -- deps is not inferred correctly when below loader.
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(searchOptions(deps.q));
  },
  // eslint-disable-next-line perfectionist/sort-objects -- head is not inferred correctly when above loader.
  head: ({ match }) => {
    return {
      meta: seo({
        title: match.search.q
          ? `Search results for "${match.search.q}" | ${site.title}`
          : `Search | ${site.title}`,
      }),
    };
  },
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { q } = Route.useSearch();
  const { data } = useSuspenseQuery(searchOptions(q));

  return (
    <div className="p-8">
      <SearchList query={q} results={data?.results ?? []} />
    </div>
  );
}
