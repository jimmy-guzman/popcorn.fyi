import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/list-pagination";
import { TVShowList } from "@/components/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvPopularOptions } from "@/lib/tv-shows";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/tv-shows/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularTVShows.title} | ${site.title}`,
      }),
    };
  },
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(tvPopularOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tvShows } = useSuspenseQuery(tvPopularOptions(search));

  return (
    <div className="flex flex-col gap-4 p-8">
      <TVShowList
        description={site.pages.popularTVShows.description}
        title={site.pages.popularTVShows.title}
        tvShows={tvShows.results ?? []}
      />
      <ListPagination page={tvShows.page} totalPages={tvShows.total_pages} />
    </div>
  );
}
