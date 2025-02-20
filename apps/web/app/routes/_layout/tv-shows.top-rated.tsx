import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvTopRatedOptions } from "@/api/tv/top-rated.list";
import { ListPagination } from "@/components/shared/list-pagination";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/tv-shows/top-rated")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(tvTopRatedOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.topRated.tvShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tvShows } = useSuspenseQuery(tvTopRatedOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.topRated.tvShows.description}
        title={site.pages.topRated.tvShows.title}
        tvShows={tvShows.results ?? []}
      />
      <ListPagination page={tvShows.page} totalPages={tvShows.total_pages} />
    </div>
  );
}
