import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/list-pagination";
import { SearchList } from "@/components/search-list";
import { site } from "@/config/site";
import { searchOptions } from "@/lib/search";
import { seo } from "@/lib/seo";
import { SearchSchema } from "@/schemas/search";

export const Route = createFileRoute("/_layout/search")({
  component: RouteComponent,
  validateSearch: SearchSchema,
  loaderDeps: ({ search: { page, q } }) => {
    return { page, q };
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
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(searchOptions(deps));
  },
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
