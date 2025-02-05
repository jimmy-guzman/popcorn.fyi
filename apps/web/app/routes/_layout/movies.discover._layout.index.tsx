import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieDiscoverList } from "@/components/movie-discover-list";
import { discoverMoviesOptions, DiscoverSchema } from "@/lib/movies";

export const Route = createFileRoute("/_layout/movies/discover/_layout/")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loaderDeps: ({ search: { page, with_genres } }) => {
    return { page, with_genres };
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
      movies={movies.results ?? []}
      page={movies.page}
      totalPages={movies.total_pages}
    />
  );
}
