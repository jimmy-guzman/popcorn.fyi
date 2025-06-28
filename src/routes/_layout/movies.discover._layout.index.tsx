import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  discoverMoviesOptions,
  DiscoverSchema,
} from "@/api/movie/discover.list";
import { MovieDiscoverList } from "@/components/movie/movie-discover-list";

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
      movies={movies.results ?? []}
      page={movies.page}
      totalPages={movies.total_pages}
    />
  );
}
