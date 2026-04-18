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
  loaderDeps: ({ search: { page, with_genres } }) => ({ page, with_genres }),
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
