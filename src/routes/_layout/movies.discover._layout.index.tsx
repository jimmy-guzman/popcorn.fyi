import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieDiscoverList } from "@/components/movie/movie-discover-list";
import {
  discoverMoviesOptions,
  DiscoverSchema,
} from "@/data/movie/discover.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/movies/discover/_layout/")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loaderDeps: ({ search }) => {
    return {
      page: search.page,
      primary_release_date_gte: search.primary_release_date_gte,
      primary_release_date_lte: search.primary_release_date_lte,
      sort_by: search.sort_by,
      watch_region: search.watch_region,
      with_companies: search.with_companies,
      with_genres: search.with_genres,
      with_original_language: search.with_original_language,
      with_watch_providers: search.with_watch_providers,
    };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(discoverMoviesOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(discoverMoviesOptions(search));

  return (
    <MovieDiscoverList
      movies={orEmpty(movies.results).filter(hasId)}
      page={movies.page}
      totalPages={movies.total_pages}
    />
  );
}
