import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/shared/list-pagination";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { tvOnTheAirOptions } from "@/data/tv/on-the-air.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/tv-shows/on-the-air")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(tvOnTheAirOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        description: site.pages.onTheAir.tvShows.description,
        title: `${site.pages.onTheAir.tvShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tvShows } = useSuspenseQuery(tvOnTheAirOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.onTheAir.tvShows.description}
        title={site.pages.onTheAir.tvShows.title}
        tvShows={orEmpty(tvShows.results).filter(hasId)}
      />
      {tvShows.page && tvShows.total_pages ? (
        <ListPagination page={tvShows.page} totalPages={tvShows.total_pages} />
      ) : null}
    </div>
  );
}
