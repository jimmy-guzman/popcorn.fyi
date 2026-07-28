import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TvDiscoverList } from "@/components/tv/discover-list";
import { DiscoverSchema, discoverTvOptions } from "@/data/tv/discover.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/tv-shows/discover/_layout/")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loaderDeps: ({ search }) => {
    return {
      first_air_date_gte: search.first_air_date_gte,
      first_air_date_lte: search.first_air_date_lte,
      page: search.page,
      sort_by: search.sort_by,
      watch_region: search.watch_region,
      with_companies: search.with_companies,
      with_genres: search.with_genres,
      with_original_language: search.with_original_language,
      with_watch_providers: search.with_watch_providers,
    };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(discoverTvOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tv } = useSuspenseQuery(discoverTvOptions(search));

  return (
    <TvDiscoverList
      page={tv.page}
      totalPages={tv.total_pages}
      tv={orEmpty(tv.results).filter(hasId)}
    />
  );
}
