import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { searchOptions } from "@/api/search.list";
import { SearchList } from "@/components/search/search-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { SearchSchema } from "@/schemas/search";

export const Route = createFileRoute("/_layout/search")({
  component: RouteComponent,
  validateSearch: SearchSchema,
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
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
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(searchOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <SearchList query={search.q} results={data.results ?? []} />
      <ListPagination page={data.page} totalPages={data.total_pages} />
    </div>
  );
}
