import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvTopRatedOptions } from "@/api/tv/top-rated";
import { ListPagination } from "@/components/list-pagination";
import { TVShowList } from "@/components/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/tv-shows/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.topRatedTVShows.title} | ${site.title}`,
      }),
    };
  },
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(tvTopRatedOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tvShows } = useSuspenseQuery(tvTopRatedOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.topRatedTVShows.description}
        title={site.pages.topRatedTVShows.title}
        tvShows={tvShows.results ?? []}
      />
      <ListPagination page={tvShows.page} totalPages={tvShows.total_pages} />
    </div>
  );
}
