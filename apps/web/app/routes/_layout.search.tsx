import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { ListPagination } from "@/components/list-pagination";
import { SearchList } from "@/components/search-list";
import { site } from "@/config/site";
import { searchOptions } from "@/lib/search";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/lists";

const searchSchema = v.intersect([
  PaginationSchema,
  v.object({ q: v.optional(v.fallback(v.string(), ""), "") }),
]);

export const Route = createFileRoute("/_layout/search")({
  component: RouteComponent,
  loaderDeps: ({ search: { page, q } }) => {
    return { page, q };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(searchOptions(deps));
  },
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
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(searchOptions(search));

  return (
    <div className="flex flex-col gap-4 p-8">
      <SearchList query={search.q} results={data?.results ?? []} />
      {data ? (
        <ListPagination page={data.page} totalPages={data.total_pages} />
      ) : null}
    </div>
  );
}
